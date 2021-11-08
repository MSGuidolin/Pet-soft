import React, { useEffect, useState } from 'react';
import './Pets.scss';
import Form from './FormImage/FormImage';
import axios from 'axios';
import PetCard from './PetCard/PetCard';

function Pets() {
    const [userId, setUserId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [pets, setPets] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem("loggedSpatifyApp")) {
            const userData = JSON.parse(
                window.localStorage.getItem("loggedSpatifyApp")
            );
            if (userData.userFound.roles[0].name === "user") {
                setUserId(userData.userFound._id);
            }
        }
    }, []);

    useEffect(async () => {
        if (userId !== '') {
            const res = await axios.get(`http://localhost:3002/pets/${userId}`)
            setPets(res.data.items);
        }
    }, [userId, change])

    useEffect(() => {
        console.log(pets)
    }, [pets])

    function toBase64(arr) {
        arr = new Uint8Array(arr)
        return btoa(
            arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }

    return (
        <div className='container-main'>
            <div className='container'>
                <div className='user-profile-container'>
                    <div className='title01'>
                        <h1>MIS MASCOTAS</h1>
                        <button className='newpet' onClick={() => setShowModal(true)}>NUEVA MASCOTA</button>
                    </div>
                    <Form change={() => setChange(!change)} showModal={showModal} setShowModal={setShowModal}></Form>
                </div>
                <div className='pet-container'>
                    {
                        pets.length ? pets.map((pet) => (
                            <PetCard
                                userID={userId}
                                image={`data:image/png;base64,${toBase64(pet.image.data.data)}`}
                                name={pet.name}
                                age={pet.age}
                                race={pet.race}
                                animal={pet.animal}
                            />
                        )) : null
                    }
                </div>
            </div>
        </div>
    );
}

export default Pets;
