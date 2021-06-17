import React, { useEffect, useState } from 'react';
import './ProfileContainer.css';
import { connect } from 'react-redux';
import { getAllPets } from '../../actions';
import { NavLink } from 'react-router-dom';
import Pet from './Pet';

export function ProfileContainer({ getAllPets, petsLoaded }) {
    const [pet, setPet] = useState()

    useEffect(() => {
        getAllPets()
    }, [getAllPets])

    useEffect(() => {
        setPet(petsLoaded)
    }, [petsLoaded])

    return (
        <div className='profileContainer'>
            {
                pet ? pet.map((pet, index) => (
                    <Pet
                        key={index}
                        name={pet.name}
                        specie={pet.specie}
                        race={pet.race}
                        dateBirth={pet.dateBirth}
                        weight={pet.weight}
                    />
                )) : (<div>cargando...</div>)
            }
            <NavLink className='addPet' to='/home/profile/add'>
                <button>Agregar Mascota</button>
            </NavLink>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        petsLoaded: state.petsLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPets: () => dispatch(getAllPets())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);