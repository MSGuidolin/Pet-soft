import React from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';

export default function SignIn() {
    return (
        <div class="text-center body">
            <main class="form-signin">
                <form>
                    <img class="mb-2 logo2" src="https://es.calcuworld.com/wp-content/uploads/sites/2/2015/06/comida-perro.png" alt="" />
                    <h1 class="h3 mb-3 fw-normal">Bienvenidos</h1>

                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Correo...</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Contraseña...</label>
                    </div>

                    <div class="checkbox mb-2">
                        <input class="align-middle" type="checkbox" value="remember-me" />
                        <label class="p-1">Mantener sesión iniciada</label>
                    </div>
                    <Link to='/home'>
                        <button class="w-100 btn btn-lg btn-primary" type="submit">Iniciar Sesión</button>
                    </Link>
                    <p>¿No tienes cuenta? <a href="">Regístrate</a></p>
                    <p class="mt-5 mb-3 text-muted">&copy; Pet-Software</p>
                </form>
            </main>
        </div>
    )
}
