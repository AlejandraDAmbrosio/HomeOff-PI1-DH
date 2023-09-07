import React from "react";
import { useState, useEffect, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import obtenerIniciales from "../utils/iniciales";
import { BsPersonCircle } from "react-icons/bs";
import Avatar from "@mui/joy/Avatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const AvatarNav = ({Iniciales}) => {
  const { usuarioLogueado, iniciarSesion, cerrarSesion } =
    useContext(ContextGlobal);


  return (
    <div>
      {usuarioLogueado ? (
        <Avatar
          variant="solid"
          size="lg"
          style={{
            backgroundColor: "#9dd6b3",
            color: "black",
          }}
        > {Iniciales ? (obtenerIniciales(Iniciales)) :(obtenerIniciales(usuarioLogueado.nombreCompleto)) }
          
        </Avatar>
      ) : (
        <Avatar
          variant="solid"
          size="lg"
          style={{
            backgroundColor: "white",
            color: "#9dd6b3",
            
          }}
        >
          <AccountCircleOutlinedIcon style={{
            width:"50px",
            height:"50px",
            
          }}/>
        </Avatar>
      )}
    </div>
  );
};

export default AvatarNav;




// import React from "react";
// import { useState, useEffect, useContext } from "react";
// import { ContextGlobal } from "../utils/global.context";
// import obtenerIniciales from "../utils/iniciales";
// import { BsPersonCircle } from "react-icons/bs";
// import Avatar from "@mui/joy/Avatar";

// const AvatarNav = () => {
//   const { usuarioLogueado, iniciarSesion, cerrarSesion } =
//     useContext(ContextGlobal);

//   return (
//     <div>
//       {usuarioLogueado ? (
//         <Avatar
//           variant="solid"
//           size="lg"
//           style={{
//             backgroundColor: "#9dd6b3",
//             color: "black",
//           }}
//         >
//           {obtenerIniciales(usuarioLogueado.nombreCompleto)}
//         </Avatar>
//       ) : (
//         <BsPersonCircle className="icono-persona" />
//       )}
//     </div>
//   );
// };

// export default AvatarNav;