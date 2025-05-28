import { useAuthStore } from '../../hooks'


export const Navbar = () => {
  
  const { startLogout, user } =  useAuthStore(); // Extraemos el estado de autenticación y las funciones necesarias del store de autenticación
  
  
  
  
  
  // Este componente regresa la barra de navegacion de la aplicación, que incluye el nombre de la aplicación y un boton de salir



  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.name }
        </span>

        <button 
          className="btn btn-outline-danger"
          onClick={ startLogout } // Al hacer click en el botón, se ejecuta la función del logout
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>

        </button>

    </div>
  )
}
