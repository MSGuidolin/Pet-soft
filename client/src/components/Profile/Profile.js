import React, { useEffect, useState } from 'react';
import './Profile.css';
import { connect } from 'react-redux';
import { getAllPets } from '../../actions';
import { NavLink } from 'react-router-dom'

export function Profile({ getAllPets, petsLoaded }) {
    const [pet, setPet] = useState()

    useEffect(() => {
        getAllPets()
    }, [getAllPets])

    useEffect(() => {
        setPet(petsLoaded)
    }, [petsLoaded])

    return (
        <div >
            <NavLink to='/home/profile/add'>
                +
            </NavLink>
            <button
                onClick={() => getAllPets()}
            >ACTUALIZAR
            </button>
            {
                pet ? pet.map(pet => (
                    <h3>{pet.name}</h3>
                )) : (<div>cargando...</div>)
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
