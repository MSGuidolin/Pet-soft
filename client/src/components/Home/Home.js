import React from 'react';
import './Home.css';

export default function Home() {
    return (
        <div class="nav2">
            <div class="text-center pt-3 nav2">
                <h2>Bienvenido</h2>
                <p>En este sitio podrás realizar diversos trámites para facilitar la atención de tus mascotas.</p>
            </div>
            <div class="d-flex contenedor">
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header">SOLICITAR TURNOS</div>
                    <div class="card-body">
                        <h5 class="card-title">Veterinarias</h5>
                        <p class="card-text">Haz click aquí para solicitar turnos en veterinarias de tu zona.</p>
                    </div>
                </div>
                <div class="card text-white bg-secondary mb-3">
                    <div class="card-header">HISTORIAL DE MASCOTAS</div>
                    <div class="card-body">
                        <h5 class="card-title">Mis Mascotas</h5>
                        <p class="card-text">Ver informacion acerca mis mascotas.</p>
                    </div>
                </div>
                <div class="card text-white bg-success mb-3">
                    <div class="card-header">BUSCAR PRODUCTOS</div>
                    <div class="card-body">
                        <h5 class="card-title">Catalogo de productos</h5>
                        <p class="card-text">Explora las veterinarias para buscar los productos disponibles.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
