import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <Link to="/" >
                    <img class="logo" src="https://comodibujar.club/wp-content/uploads/2019/03/dibujar-perro-kawaii-1.jpg"></img>
                </Link>
                <span class="navbar-brand">Pet-Software</span>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to="/home" class="nav-link active">
                                <span>Inicio</span>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/home/profile" class="nav-link">
                                <span>Perfil</span>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/home/map" class="nav-link">
                                <span>Mapa</span>
                            </Link>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
