import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css';

// Aplicar tema guardado antes del primer render para evitar destello
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-bs-theme', savedTheme);
import { CalendarApp } from './CalendarApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalendarApp />
  </StrictMode>,
)
