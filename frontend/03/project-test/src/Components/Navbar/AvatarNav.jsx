import React from "react";
import { useState, useEffect, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import obtenerIniciales from "../utils/iniciales";
import { BsPersonCircle } from "react-icons/bs";
import Avatar from "@mui/joy/Avatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AvatarNav = () => {
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
        >
          {obtenerIniciales(usuarioLogueado.nombreCompleto)}
        </Avatar>
      ) : (
        <Avatar
          variant="solid"
          size="lg"
          style={{
            backgroundColor: "#9dd6b3",
            color: "black",
          }}
        >
          <AccountCircleIcon/>
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