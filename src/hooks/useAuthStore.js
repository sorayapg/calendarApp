import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogaut, onLogin, onLogoutCalendar } from '../store';


/**
 * Hook personalizado para manejar la autenticación del usuario en la aplicación de calendario.
 * Utiliza Redux para acceder y modificar el estado de autenticación global.
 */
export const useAuthStore = () => {

    // -------------------- State & helpers --------------------

    // Extraemos el estado de autenticación del store de Redux
    const { status, user, errorMessage } = useSelector(state => state.auth);

    // Hook para despachar acciones al store
    const dispatch = useDispatch();


    // -------------------- Login --------------------

    /**
     * Inicia sesión del usuario con email y contraseña.
     * Si es exitoso, guarda el token en localStorage y actualiza el estado.
     * Si falla, despacha un error.
     */
    const startLogin = async({ email, password }) => {
        dispatch(onChecking()); // Cambia el estado a "checking" (verificando credenciales)

        try {
            // Llamada al backend para autenticar
            const { data } = await calendarApi.post('/auth', { email, password });

            // Guardamos el token y la fecha de inicio en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // Despachamos la acción de login con los datos del usuario
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            // En caso de error, mostramos mensaje y limpiamos luego de un breve tiempo
            dispatch(onLogaut('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };


    // -------------------- Register --------------------

    /**
     * Registra un nuevo usuario.
     * Si es exitoso, guarda el token y actualiza el estado.
     * Si falla, maneja y muestra los errores del servidor.
     */
    const startRegister = async({ name, email, password }) => {
        dispatch(onChecking()); // Estado temporal mientras se registra

        try {
            // Llamada al backend para crear un nuevo usuario
            const { data } = await calendarApi.post('/auth/new', {
                name,
                email,
                password
            });

            // Guardamos el token y la fecha de inicio en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('token_init_date', new Date().getTime());

            // Autenticamos al nuevo usuario
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            // Manejo detallado del error
            let errorMsg = 'Error desconocido';

            if (error.response?.data?.msg) {
                errorMsg = error.response.data.msg;
            } else if (error.response?.data?.errors) {
                const validationErrors = error.response.data.errors;
                const firstKey = Object.keys(validationErrors)[0];
                errorMsg = validationErrors[firstKey].msg;
            }

            dispatch(onLogaut(errorMsg)); // Enviamos mensaje de error al store

            // Limpiamos el mensaje de error tras un breve tiempo
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };


    // -------------------- Renew Token (pendiente) --------------------
    // Creamos una nueva función para renovar el token automáticamente si es necesario.
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch(onLogaut()); // si no hay token, cerramos sesión

        try {
            // Incluimos el token en el header por si calendarApi no lo hace automáticamente
            const { data } = await calendarApi.get('/auth/renew', {
                headers: { 'x-token': token },
            });
            
            // Guardamos el nuevo token y la fecha de inicio en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('token_init_date', new Date().getTime());

            // Autenticamos al nuevo usuario
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            console.log({data});
        } catch (error) {
            // Si todo falla, hacemos una limpieza en el localStorage y limpiamos el estado de autenticación
            localStorage.clear();

            // Si no funciona la renovación del token volvemos a realizar el dispatch de logout
            dispatch(onLogaut());
            
        }

    }

    // -------------------- Logout --------------------
    /**
     * Cierra la sesión del usuario.
     * Limpia el token del localStorage y actualiza el estado de autenticación.
     */

    const startLogout = () => {
        localStorage.clear(); // Limpiamos el localStorage
        dispatch(onLogoutCalendar()); //Limpia el estado del calendario
        dispatch(onLogaut()); // Despachamos la acción de logout
    }


    

   
    


    // -------------------- Return --------------------

    return {
        // Propiedades del estado
        status,
        user,
        errorMessage,

        // Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,

    };
};
