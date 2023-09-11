
import React from 'react'
import { Navigate } from 'react-router-dom';
import { ContextGlobal } from "../Components/utils/global.context";
import { useContext} from "react";

// const PrivateRoute = ({ component: Component, isAdmin, ...rest }) => {
//   return isAdmin ? (
//     <Component {...rest} />
//   ) : (
//     <Navigate to="/formingreso" replace />
//   );
// };

const PrivateRoute = ({ component: Component, adminOnly, ...rest }) => {
  const { setUsuarioLogueado, usuarioLogueado, userIdLogIn, isAdmin } =
    useContext(ContextGlobal);
    
  const token = localStorage.getItem('token');

  if (!token) {
    console.log("---------------- !!!!!!!usuarioLogueado -----------------")
    // El usuario no está autenticado, redirige al inicio de sesión
    return <Navigate to="/" />;
  } else if (adminOnly && !isAdmin) {
    console.log("---------------- adminOnly && !!!!!!isAdmin -----------------")
    // La ruta requiere permisos de administrador, pero el usuario no es un administrador
    return <Navigate to="/" />; // Puedes redirigir a la página de inicio u otro lugar adecuado
  } else {
    console.log("---------------- adminOnly &&  isAdmin -----------------")

    // El usuario está autenticado y tiene los permisos requeridos, muestra el componente
    return <Component {...rest} />;
  }
};

  export default PrivateRoute

  
