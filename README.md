<h1 align="center">🗓️ CalendarApp (Frontend)</h1>

<p align="center">
  <b>Interfaz React para la gestión de eventos en calendario</b><br>
  Vite • React 18 • Redux Toolkit • React Big Calendar • Axios • Date-fns
</p>

---

# Calendar APP

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh  
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh  

---

## 🧩 Development steps

1️⃣ Renombrar el archivo `.env.template` por `.env`  
2️⃣ Hacer los cambios respectivos en las variables de entorno  

```bash
EJEMPLO:

VITE_API_URL=http://localhost:4000/api

```


# 🚀 1. Descripción

Frontend de CalendarApp, desarrollado con React + Vite.
Permite autenticación de usuario, visualización del calendario (mes/semana/día/agenda) y CRUD de eventos consumiendo el backend desplegado en Railway.


# 🧠 2. Tecnologías y librerías
| Paquete                                | Uso principal                             |
| -------------------------------------- | ----------------------------------------- |
| **react / react-dom**                  | UI con React 18                           |
| **react-router-dom (v7)**              | Ruteo SPA (login, calendario, etc.)       |
| **@reduxjs/toolkit** + **react-redux** | Estado global (auth, eventos, UI)         |
| **axios**                              | Cliente HTTP para consumir la API         |
| **react-big-calendar**                 | Calendario (vistas mes/semana/día/agenda) |
| **date-fns**                           | Fechas (parseo, formateo, comparaciones)  |
| **react-datepicker**                   | Selector de fecha/hora en formularios     |
| **react-modal**                        | Modales accesibles (crear/editar evento)  |
| **sweetalert2**                        | Diálogos bonitos (confirmaciones/errores) |

 Dev / Calidad / Tests
| Paquete                                          | Uso                              |
| ------------------------------------------------ | -------------------------------- |
| **vite** + **@vitejs/plugin-react**              | Dev server y build rápidos       |
| **eslint** + plugins                             | Linting (estándar React + hooks) |
| **jest**, **jest-environment-jsdom**             | Test runner en DOM simulado      |
| **@testing-library/react, jest-dom, user-event** | Tests de componentes accesibles  |
| **redux-mock-store**                             | Mocks de store en pruebas        |
| **whatwg-fetch**                                 | Polyfill de `fetch` en tests     |


# ⚙️ 3. Requisitos

Node.js 18+

Backend accesible (local o producción) y su URL en VITE_API_URL.

🔑 4. Variables de entorno
Crea un archivo .env en la raíz del frontend:

```
# URL base del backend (termina en /api)
VITE_API_URL=http://localhost:4000/api

```

Para producción, usa .env.production o define VITE_API_URL como variable en la plataforma de despliegue:

```
VITE_API_URL=https://sorayapg.github.io/auth/login

```
# ⚙️ 4. Configuración para GitHub Pages

El proyecto utiliza la propiedad `base` de Vite:

```js
base: '/calendarApp/'

# 🧩 5. Instalación y ejecución en local

```
# 1️⃣ Instalar dependencias
npm install

# 2️⃣ Ejecutar en desarrollo
npm run dev
# abre: http://localhost:5173

# 3️⃣ Compilar para producción
npm run build

# 4️⃣ Previsualizar build
npm run preview

```

# 🔌 6. Conexión con el backend

Define VITE_API_URL apuntando al backend (local o render).

Asegúrate de que el backend permite CORS desde http://localhost:5173 (en desarrollo) y tu dominio público (en producción).


# 🗓️ 7. Funcionalidades clave (UI)

Autenticación: login/registro (formularios en la misma vista).

Calendario: vistas Mes / Semana / Día / Agenda, controles Hoy / ‹ / ›.

Creación de eventos: botón “+” o (doble) clic en la fecha/franja; modal con título, notas, inicio/fin (react-datepicker).

Edición de eventos: clic o doble clic sobre evento → modal con datos precargados.

Eliminación: botón papelera (confirmación con sweetalert2).

Validaciones: control de rangos de fecha/hora (coherentes y dentro de límites definidos).


# 🧪 8. Testing (Jest + Testing Library)

```
# (si añades "test": "jest" en package.json)
npm run test

```

Config mínima recomendada (jest.config.js):

```
export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
};

```
Ejemplo de test de componente:

```
import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza la app', () => {
  render(<App />);
  expect(screen.getByText(/CalendarApp/i)).toBeInTheDocument();
});

```
Si usas fetch en tests, whatwg-fetch ya está en devDeps (puedes importarlo en setup).

# 🧹 9. Linting

```
npm run lint

```

Reglas basadas en:

eslint, @eslint/js
eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh
globals


# ☁️ 10. Despliegue (opciones)

🔹 Netlify

1️⃣ New site from Git → Selecciona tu repo calendarApp.
2️⃣ Build command: npm run build
Publish directory: dist
3️⃣ Environment variables → añade VITE_API_URL=https://.../api.
4️⃣ Deploy.

🔹 Vercel

1️⃣ Import Project → repo calendarApp.
2️⃣ Framework: Vite (detectado).
3️⃣ Env vars → VITE_API_URL.
4️⃣ Deploy.

🔹 Firebase Hosting

```
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting  # elige "dist" como carpeta pública, SPA: yes
firebase deploy

```
# 🧰 11. Scripts disponibles

```
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}


```
# 🧩 12. Estructura sugerida (orientativa)

```
src/
  api/              # axios setup, helpers
  components/       # UI reutilizable
  hooks/            # custom hooks
  pages/            # Login, Calendar, etc.
  router/           # react-router-dom v7
  store/            # slices de RTK (auth, calendar, ui)
  styles/           # css / scss / tailwind (si aplica)
  main.jsx
  App.jsx


```

# 🌍 13. Entorno de producción

## Frontend

Aplicación desplegada en GitHub Pages:

https://sorayapg.github.io/calendarApp/

## Backend

API desplegada en Render:

https://calendarapp-backend-fes0.onrender.com/api

## Notas importantes

- La aplicación es una SPA (Single Page Application).
- GitHub Pages puede devolver error 404 si se accede directamente a rutas internas como `/auth/login`.
- La entrada correcta es siempre la raíz:

https://sorayapg.github.io/calendarApp/

- El backend en Render puede tardar unos segundos en responder si está en reposo (plan gratuito).

# 👩‍💻 14. Autora

Soraya Povedano Gallardo
Frontend de CalendarApp — Proyecto DAW 2025-2026

# Actualizacion 