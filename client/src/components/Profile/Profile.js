import React from 'react';
import './Profile.css';

export default function Profile() {
    return (
        <div class="d-flex p-2 bd-highlight">
            <div class="card">
                <img class="card-img-top mh-100" src="https://i.pinimg.com/originals/d5/ea/15/d5ea158ce889d218e3cd3e5583f8a896.jpg" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">Mascota 1 - Simba</h5>
                    <p class="card-text">Descripción</p>
                    <p class="card-text">Tabla</p>
                    <p class="card-text">Turnos</p>
                    <a href="#" class="btn btn-primary">Ver Información</a>
                </div>
            </div>
            <div class="card">
                <img class="card-img-top mh-100" src="https://i2.wp.com/hipertextual.com/wp-content/uploads/2021/04/siames-scaled.jpg?fit=1200%2C800&ssl=1" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">Mascota 2 - Miki</h5>
                    <p class="card-text">Descripción</p>
                    <p class="card-text">Tabla</p>
                    <p class="card-text">Turnos</p>
                    <a href="#" class="btn btn-primary">Ver Información</a>
                </div>
            </div>
            <div class="card">
                <img class="card-img-top mh-100" src="https://lh3.googleusercontent.com/proxy/V0aexE_cuiJQeTNufddOUdax3_piw7Uqu7jbvN7Bj98Zey27d0LGDVdnxtStLCSDp7pbFRIIWV-7OO6OTX5nlG2Rdq7z9ORC0FiXBSvIGAIQdks4hY4210SS3n1qiyAUvYLXHX7VyseJfekp-Pj_3d3riK0v7TkIhYOPQdPs" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">Mascota 3 - Peri</h5>
                    <p class="card-text">Descripción</p>
                    <p class="card-text">Tabla</p>
                    <p class="card-text">Turnos</p>
                    <a href="#" class="btn btn-primary">Ver Información</a>
                </div>
            </div>
        </div>
    )
}
