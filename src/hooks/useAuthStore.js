import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogaut, onLogin } from '../store';


export const useAuthStore = () => {

    const { status, user, errorMessage, } = useSelector( state => state.auth ); // desectructuramos lo que nos interesa del estado de auth
    const dispatch = useDispatch()

    const starLogin = async({ email, password }) => {
        // actualizamos el estado a 'checking' antes de hacer la petición
        dispatch( onChecking() );
        try {
            // nos conectamos a la API para autenticar al usuario
            const { data } = await calendarApi.post('/auth',{ email, password });
            // si la petición es exitosa, actualizamos el estado con los datos del usuario
            localStorage.setItem('tocken', data.tocken );
            localStorage.setItem('tocken-init-date', new Date().getTime() );
            // actualizamos el estado a 'authenticated' con los datos del usuario
            dispatch( onLogin( { name: data.name, uid: data.uid }));

        } catch (error) {
            // si ocurre un error, lo capturamos y le mostramos el mensaje de error 
            dispatch( onLogaut('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10); // con esto limpiamos el mensaje de error después de 10ms
        }
    }




    return {
        //* Properties
        errorMessage,
        status, 
        user, 

        //* Methods 
        starLogin,
    }
}