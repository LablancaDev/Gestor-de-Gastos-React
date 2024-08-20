import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    // Definición de los estados userName y password con sus funciones de actualización y email en caso de no estar registrado
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // Define navigate utilizando useNavigate para permitir la navegación
    const navigate = useNavigate();

    // useState que almacena true o false si el usuario está registrado 
    const [isLogin, setIsLogin] = useState(false);

    // Función que se ejecuta cada vez que cambia el valor del input de usuario
    const handleUsernameChange = (e) => {
        // Actualiza el estado userName con el valor del input
        setUserName(e.target.value)
        // Muestra el valor actual de userName en la consola
        console.log(userName)
    }

    // Función que se ejecuta cada vez que cambia el valor del input de contraseña
    const handlePasswordChange = (e) => {
        // Actualiza el estado password con el valor del input
        setPassword(e.target.value)
        // Muestra el valor actual de password en la consola
        console.log(password)
    }
    // Función que se ejecuta cada vez que cambia el valor del input de email
    const handleEmailChange = (e) => {
        // Actualiza el estado del email con el valor del input
        setEmail(e.target.value)
        // Muestra el valor actual de email en la consola
        console.log(email)
    }

    // Función que se ejecuta cuando se hace clic en el botón "Iniciar Sesión" manejará toda la Logica
    const handleAuth = () => {
        // Muestra los valores actuales de userName y password en la consola
        console.log(`Nombre: ${userName}, password: ${password}, email: ${email}`)

        // Si el modo el Login:
        if (isLogin) { // si isLogin en True

            const storedUser = JSON.parse(localStorage.getItem('user'));
            // Obtiene el usuario almacenado en localStorage y lo convierte de JSON a un objeto.

            // Si el usuario y la contraseña coinciden, navega a la página de inicio
            if (storedUser && storedUser.userName === userName && storedUser.password === password) {
                navigate("/");
            } else {
                alert("Usuario o contraseña incorrectos")
            }
        } else {
            // Si el modo es registro:
            const user = { userName, email, password };
            // Crea un objeto usuario con el nombre de usuario, correo electrónico y contraseña.

            localStorage.setItem('user', JSON.stringify(user));
            // Almacena el usuario en localStorage, convirtiéndolo a una cadena JSON.

            console.log('Registro exitoso');

            setIsLogin(true);
            // Cambia al modo de inicio de sesión después de registrarse.
        }

    }

    // Función para alternar entre los modos de login y registro.
    const handleRegisterOrLogin = () => {
        setIsLogin(true)
    }

    // Función para eliminar los datos almacenados en localStorage
    const removeUser = () => {
        localStorage.removeItem('user')// Eliminar los datos del usuario
        alert('Datos eliminados del almacenamiento local');
    }


    // Renderizado del formulario de inicio de sesión
    return (
        <div className='container-fluid container-login'>
            <div className='container-form d-flex flex-column justify-content-center align-items-center'>
                {!isLogin ? <h4>Registrarse</h4> : <h4>Logearse</h4>} {/*si el user esta logeado se mostrará un título u otro*/}
                <div className='mb-3'>
                    {/* Etiqueta y campo de entrada para el nombre de usuario */}
                    <label htmlFor="usuario">Usuario: </label>
                    <input
                        type="text"
                        id='usuario'
                        className='form-control'
                        placeholder='Introduce tu nombre'
                        // Evento que se ejecuta cuando el valor del input cambia
                        onChange={handleUsernameChange}
                        // Valor actual del input, sincronizado con el estado userName
                        value={userName}
                        required
                    />
                </div>
                <div className='mb-3'>
                    {/* Etiqueta y campo de entrada para la contraseña */}
                    <label htmlFor="contraseña">Contraseña: </label>
                    <input
                        type="password" // Cambiado a type="password" para ocultar el texto de la contraseña
                        id='contraseña'
                        className='form-control'
                        placeholder='Introduce tu contraseña'
                        // Evento que se ejecuta cuando el valor del input cambia
                        onChange={handlePasswordChange}
                        // Valor actual del input, sincronizado con el estado password
                        value={password}
                        required
                    />
                </div>
                {!isLogin && (
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="text"
                            id='email'
                            className='form-control'
                            placeholder='Introduce tu e-mail'
                            onChange={handleEmailChange}
                            value={email}
                            required
                        />

                    </div>
                )}
                {/* Botón para iniciar sesión */}
                <button
                    onClick={handleAuth}
                    className='btn btn-primary mt-3'
                >
                    {isLogin ? "Iniciar Sesión" : "Regístrate"}
                </button>

                {/* Enlace para registrarse */}
                <button
                    className='btn btn-link'
                    type='button'
                    onClick={handleRegisterOrLogin}
                >
                    {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
            
                </button>

                {/*Eliminar usuario del localStorage*/}
                <div className='w-100 container_removeButton'>
                    <div className='d-flex justify-content-end mt-2'>
                        <button
                            className='btn btn-danger removeButton'
                            type='button'
                            onClick={removeUser}
                        >Eliminar Usuario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
