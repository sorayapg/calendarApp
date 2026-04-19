import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css';
import { applyTheme, getInitialTheme } from './helpers/theme.js';

// Aplicar tema guardado antes del primer render para evitar destello
applyTheme(getInitialTheme());
import { CalendarApp } from './CalendarApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalendarApp />
  </StrictMode>,
)
