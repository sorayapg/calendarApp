
import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './loginPage.css';
import Swal from 'sweetalert2';

// creamos dos objetos para los campos del formulario de logfin y registro
const loginFormFields = {
    loginEmail :    '',
    loginPassword : '',
}

const registerFormFields = {
    registerName:       '',
    registerEmail :     '',
    registerPassword :  '',
    registerPassword2 : '',
}

export const LoginPage = () => {
    // usamos el hook useAuthStore para manejar el estado de la autenticación y el error si lo hay
    const { starLogin, errorMessage, startRegister } = useAuthStore();


    // usamos el hook useForm para manejar los campos del formulario tanto de login 
    const {loginEmail, loginPassword, onInputChange:onLoginInputChange, } = useForm( loginFormFields );
    
    // usamos el hook useForm para manejar los campos del formulario de registro
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange} = useForm( registerFormFields)

    const loginSubmit = ( event ) => {
        event.preventDefault();

        // Aquí manejamos el envío del formulario de login
       starLogin({email: loginEmail, password: loginPassword });
        
    }

    const registerSubmit = ( event ) => {
        event.preventDefault();

        // Aqui puedes manejar el envío del formulario de registro
        // Si las contraseñas no coinciden, mostramos con sweetalert2 un mensaje de error
        if ( registerPassword !== registerPassword2 ){
            Swal.fire('Error en el registro', 'Las contraseñas no coinciden', 'error' );
            return;
        }
        startRegister( { name: registerName, email: registerEmail, password: registerPassword})
    }

    useEffect(() => {
      // si hay un error , mostraremos el mensaje con sweetalert2, solo si hay un mensaje de error
      if ( errorMessage !== undefined) {
        Swal.fire(' Error en la autenticación ', errorMessage, 'error');
      }
    
    }, [errorMessage])
    


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={ registerPassword}
                                onChange={ onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={ registerPassword2}
                                onChange={ onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}