import React from "react";
import { useState, useEffect, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import obtenerIniciales from "../utils/iniciales";
import { BsPersonCircle } from "react-icons/bs";
import Avatar from "@mui/joy/Avatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const AvatarNav = ({Iniciales}) => {
  const { usuarioLogueado, iniciarSesion, cerrarSesion, nombreCompleto } =
    useContext(ContextGlobal);
// Desde App se modifica el conectado como en donde se define user getitem del local storage
const user = localStorage.getItem("nombreCompleto");

  return (
    <div>
      {(Iniciales != null) || usuarioLogueado ? (
        <Avatar
          variant="solid"
          size="lg"
          style={{
            backgroundColor: "#7cc598",
            color: "white",
          }}
        > {Iniciales ? (obtenerIniciales(Iniciales)) :(obtenerIniciales(user)) }
          
        </Avatar>
      ) : (
        <Avatar
          variant="solid"
          size="lg"
          style={{
            backgroundColor: "white",
            color: "#b6b5b5",
            
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

