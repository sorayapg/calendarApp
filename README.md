# CalendarApp Frontend

Frontend de CalendarApp desarrollado con React y Vite, encargado de la autenticación de usuarios y la gestión visual de eventos mediante una interfaz de calendario interactiva.

Este repositorio documenta solo la parte frontend. El backend vive en un repositorio separado y aquí solo se describe la integración necesaria desde la interfaz.

---

## 1. Descripción del frontend

### 🎯 Objetivo del proyecto

Este proyecto consiste en el desarrollo del frontend de una aplicación de calendario orientada a la gestión de eventos personales, con especial foco en la experiencia de usuario, la adaptabilidad a distintos dispositivos y la consistencia visual mediante modo claro y oscuro.

La aplicación permite:

- iniciar sesión o registrarse desde una pantalla unificada  
- visualizar eventos en calendario en español  
- cambiar entre vistas de mes, semana, día y agenda  
- crear eventos desde el botón flotante o desde celdas y franjas vacías del calendario  
- editar eventos con un solo clic o tap  
- eliminar el evento seleccionado  
- alternar entre modo claro y oscuro con persistencia local  

El frontend está orientado a una experiencia responsive y mantiene comportamientos diferenciados para escritorio y dispositivos táctiles.

---

## 2. Tecnologías utilizadas

- React 18  
- Vite 5  
- React Router DOM 7  
- Redux Toolkit + React Redux  
- Axios  
- React Big Calendar  
- date-fns  
- react-datepicker  
- react-modal  
- SweetAlert2  
- lucide-react  
- Bootstrap 5.3.5 (CDN)  
- Font Awesome 6.7.2 (CDN)  

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Status](https://img.shields.io/badge/status-completed-green)

---

## 🔗 Repositorios del proyecto

- Frontend: https://github.com/sorayapg/calendarApp  
- Backend: (añadir aquí el repositorio backend)

> Para que el frontend funcione correctamente, es necesario tener el backend en ejecución.

---

## 3. Instalación

### Requisitos mínimos

- Node.js 18 o superior  
- npm  
- backend disponible mediante URL HTTP  

### Clonar el repositorio

```bash
git clone https://github.com/sorayapg/calendarApp
cd calendarApp

```
### Instalar dependencias

```bash
npm install
```
### Configurar variables de entorno

```bash
cp .env.template .env
```
### En Windows PowerShell:

```PowerShell
Copy-Item .env.template .env
```
---

## 4. Ejecución del proyecto

### Desarrollo

```bash
npm run dev
```

### Build de producción

```bash
npm run build
```

### Previsualización del build

```bash
npm run preview
```

### lint 

```bash
npm run lint
```

## 5. Variables de entorno
El frontend utiliza VITE_API_URL para conectarse con la API.

- Ejemplo de .env:
VITE_API_URL=http://localhost:4000/api

- Ejemplo de .env.production:
VITE_API_URL=https://calendarapp-backend-fes0.onrender.com/api

### Notas: 

- .env.template está en la raíz del proyecto
- src/api/calendarApi.js usa esta variable como baseURL
- el token de sesión se envía automáticamente en el header x-token

## 6. Conexión con backend
La conexión se realiza mediante Axios desde:
src/api/calendarApi.js

Endpoints utilizados:

- POST /auth → login
- POST /auth/new → registro
- GET /auth/renew → renovar sesión
- GET /events → obtener eventos
- POST /events → crear evento
- PUT /events/:id → editar evento
- DELETE /events/:id → eliminar evento

Es necesario que el backend esté en ejecución para que el frontend funcione correctamente.

## 7. Estructura principal de carpetas

src/
  api/
    calendarApi.js
  auth/
    pages/
      LoginPage.jsx
      LoginPage.css
  calendar/
    components/
      CalendarEvent.jsx
      CalendarModal.jsx
      CalendarToolbar.jsx
      CalendarTouchDayColumnWrapper.jsx
      CalendarTouchSlotWrapper.jsx
      FabAddNew.jsx
      FabDelete.jsx
      Navbar.jsx
    helpers/
      createDraftEvent.js
    hooks/
      useCalendar.js
    pages/
      CalendarPage.jsx
  helpers/
    calendarLocalizer.js
    convertEventsToDateEvents.js
    getEnvVariables.js
    getMessages.js
    theme.js
  hooks/
    useAuthStore.js
    useCalendarStore.js
    useForm.js
    useTheme.js
    useUiStore.js
  router/
    AppRouter.jsx
  store/
    auth/
    calendar/
    ui/
    store.js
  CalendarApp.jsx
  main.jsx
  styles.css

  ### 🚀 Demo

Aplicación en ejecución:
👉 https://sorayapg.github.io/calendarApp/

## 8. Mejoras implementadas en el frontend

### Autenticación y primera impresión
- pantalla unificada de login y registro
- branding visible de CalendarApp
- toggle de tema en la parte superior
- mejora de contraste y jerarquía visual
- CTA de registro optimizado

### Tema claro y oscuro
- persistencia en localStorage
- aplicación previa al render
- coherencia visual en toda la app

### Calendario e interacción
- vistas: mes, semana, día y agenda
- toolbar personalizada
- creación de eventos:
    - botón "+"
    - clic/tap en calendario
- edición con un solo clic/tap
- eliminación mediante botón flotante
- persistencia de vista
- separación clara de acciones:
    - clic/tap en espacio vacío → crear evento
    - clic/tap en evento existente → editar evento

### Modal de eventos
- botón de cierre visible
- botón cancelar separado
- validación de formulario
- mejora visual en light/dark

### Responsive y UX
- adaptación a escritorio, tablet y móvil
- diferenciación entre puntero y touch
- mejora visual de vistas
- refinamiento de interacciones

## 9. Notas técnicas
- Router con basename dinámico
- Vite base / dev y /calendarApp/ producción
- conversión de eventos a Date
- localización en español
- sin tests activos en script
- Bootstrap y FontAwesome por CDN

## 10. Posibles mejoras futuras
- tests de frontend
- mejora del modal (modo creación/edición)
- confirmación al eliminar
- mejora SEO y metadatos
- fallback para SPA en hosting estático

## 11. Documentación de uso

La guía de uso está disponible en:
GUIA_USUARIO.md

## 12. Autor

👩‍💻 Soraya P.G.
Frontend Developer & UX