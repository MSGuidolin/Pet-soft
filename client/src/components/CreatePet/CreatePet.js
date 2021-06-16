import React, { useState } from 'react'
import axios from 'axios'
import { PET_URL } from '../../utils/constants';

export default function CreatePet() {
    const [data, setData] = useState({
        name: '',
        specie: '',
        race: '',
        dateBirth: '',
        weight: 0
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(PET_URL, data);
    }


    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
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
                    <span>Nacimiento</span>
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
                <button
                    type='submit'
                >CREAR MASCOTA</button>
            </form>
        </div>
    )
}
