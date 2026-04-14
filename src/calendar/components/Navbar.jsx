import { useAuthStore, useTheme } from '../../hooks'


export const Navbar = () => {
  
  const { startLogout, user } = useAuthStore();
  const { isDarkMode, toggleTheme } = useTheme();
  
  
  
  
  
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.name }
        </span>

        <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={ toggleTheme }
              title={ isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro' }
            >
                <i className={ isDarkMode ? 'fas fa-sun' : 'fas fa-moon' }></i>
            </button>

            <button 
              className="btn btn-outline-danger"
              onClick={ startLogout }
            >
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                <span>Salir</span>
            </button>
        </div>

    </div>
  )
}
