import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';


// Componente principal de rutas de la aplicación
export const AppRouter = () => {

    // Extraemos el estado de autenticación y la función para verificar el token
    const { status, checkAuthToken } = useAuthStore();

    // useEffect se ejecuta al montar el componente, verifica si el usuario tiene un token válido
    useEffect(() => {
        checkAuthToken();
    }, []);

    // Mientras el estado esté en 'checking', mostramos un mensaje de carga
    if (status === 'checking') {
        return (
            <h1>Cargando...</h1>
        );
    }

    return (
        <Routes>
            {
                // Si el usuario NO está autenticado, redirigimos a la página de login
                (status === 'not-authenticated')
                    ? (
                        <>
                            {/* Ruta de autenticación (login/registro) */}
                            <Route path="/auth/*" element={<LoginPage />} />

                            {/* Redirección por defecto a login si se accede a otra ruta */}
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            {/* Ruta principal para el usuario autenticado */}
                            <Route path="/" element={<CalendarPage />} />

                            {/* Redirección por defecto a la página principal si se accede a otra ruta */}
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }
        </Routes>
    );
}
