import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PET_URL } from '../../utils/constants';
import './CreatePet.css';
import { Validate } from '../../controllers'
import { NavLink } from 'react-router-dom'

export default function CreatePet() {
    const [data, setData] = useState({
        name: null,
        specie: null,
        race: null,
        dateBirth: null,
        weight: null,
    })
    const [Errors, setErrors] = useState({});
    const [Alert, setAlert] = useState({ errors: false, create: false });

    useEffect(() => {
        setErrors(Validate(data));
    }, [data]);

    useEffect(() => {
        if (!Object.keys(Errors).length) {
            setAlert({ ...Alert, errors: false });
        }
    }, [Errors]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(Errors).length) {
            setAlert({ ...Alert, errors: true });
        } else {
            try {
                await axios.post(PET_URL, data);
                setAlert({ ...Alert, create: true });
            } catch (err) {
                console.log(err);
            }
        }
    }


    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                {Alert.errors ? (
                    <div className='div_errors'>
                        <ul>
                            {Object.values(Errors).map((el) => (
                                <li key={el} className='li_text'>
                                    {el}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
                <div>
                    <span>Nombre</span>
                    <input
                        name='name'
                        value={data.name}
                        onChange={e => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <span>Especie</span>
                    <input
                        name='specie'
                        value={data.specie}
                        onChange={e => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <span>Raza</span>
                    <input
                        name='race'
                        value={data.race}
                        onChange={e => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <span>Fecha de nacimiento</span>
                    <input
                        name='dateBirth'
                        value={data.dateBirth}
                        onChange={e => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <span>Peso</span>
                    <input
                        name='weight'
                        value={data.weight}
                        onChange={e => handleChange(e)}
                    ></input>
                </div>
                <button type='submit'>CREAR MASCOTA</button>
                {Alert.create ? (
                    <div className='div_create_confirm'>
                        <h3 className='message_create'>
                            La mascota fue creada correctamente
                        </h3>
                        <NavLink className='back' to='/home/profile/'>
                            <button>Volver</button>
                        </NavLink>
                    </div>
                ) : null}
            </form>
        </div>
    )
}
