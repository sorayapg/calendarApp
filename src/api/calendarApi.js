
import axios from 'axios'; // Importamos axios para hacer peticiones HTTP;
import { getEnvVariables } from '../helpers'; // Importamos la función para obtener las variables de entorno

const { VITE_API_URL  } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL, // Usamos la URL de la API desde las variables de entorno
});

// TODO: configurar interceptores

export default calendarApi;