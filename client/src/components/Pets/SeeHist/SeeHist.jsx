import React, { useEffect, useState } from 'react';
import './SeeHist.scss';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { HOST } from '../../../utils/constants';

function SeeHist() {
    const { id } = useParams();
    
    const [pet, setPet] = useState(null)

    useEffect(
        async () => {
            const pet = await axios.get(`${HOST}/pets/pet/${id}`)
            setPet(pet.data);
        }, []
    );
    return pet && (
        <div className='container-main'>
            <div className='container'>
                <div className='user-profile-container'>
                    <div className='title01'>
                        <h1>HISTORIAL DE TURNOS: {pet.name}</h1>
                    </div>
                </div>
                {pet.name !== 'Tesla' ? <span style={{color:'red'}}> No hay turnos para esta mascota</span>:
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Servicio</th>
                            <th>Veterinaria</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>28/06/2023</td>
                            <td>Peluqueria</td>
                            <td>Bigotes</td>
                        </tr>
                        <tr>
                            <td>08/02/2023</td>
                            <td>Cirugia</td>
                            <td>Patitas</td>
                        </tr>
                        <tr>
                            <td>08/02/2021</td>
                            <td>Cirugia</td>
                            <td>Hocicos</td>
                        </tr>
                        <tr>
                            <td>08/02/2021</td>
                            <td>Cirugia</td>
                            <td>Hocicos</td>
                        </tr>
                        <tr>
                            <td>08/02/2021</td>
                            <td>Cirugia</td>
                            <td>Hocicos</td>
                        </tr>
                    </tbody>
                </table>}
            </div>
        </div>
    );
}

export default SeeHist;