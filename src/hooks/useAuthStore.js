import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogaut, onLogin } from '../store';

/**
 * Hook de autenticación para la aplicación de calendario
 */
export const useAuthStore = () => {

    // -------------------- State & helpers --------------------
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // -------------------- Login --------------------

    const startLogin = async({ email, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth', { email, password });

            localStorage.setItem('token', data.token); // corregir 'tocken' a 'token'
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogaut('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    // -------------------- Register --------------------

    const startRegister = async({ name, email, password }) => {
        dispatch(onChecking());

        

        try {
            const { data } = await calendarApi.post('/auth/new', {
                name: name,
                email: email,
                password: password
            });

            localStorage.setItem('token', data.token); // corregir 'tocken' a 'token'
            localStorage.setItem('token_init_date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            let errorMsg = 'Error desconocido';

            if (error.response?.data?.msg) {
                errorMsg = error.response.data.msg;
            } else if (error.response?.data?.errors) {
                const validationErrors = error.response.data.errors;
                const firstKey = Object.keys(validationErrors)[0];
                errorMsg = validationErrors[firstKey].msg;
            }

            dispatch(onLogaut(errorMsg));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    // -------------------- Return --------------------

    return {
        errorMessage,
        status,
        user,
        startLogin,
        startRegister,
    };
};
