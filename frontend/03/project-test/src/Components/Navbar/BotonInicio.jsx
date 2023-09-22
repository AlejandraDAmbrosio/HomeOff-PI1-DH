import React from "react";
import "../Genericos/Boton.css";
import { useEffect, useState, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import FormIngreso from "../../Routes/FormIngreso";
import { Modal, Stack } from "@mui/material";
import {
  Link ,
} from "react-router-dom";

import { Button } from "@mui/material";

const BotonInicio = () => {


  const { usuarioLogueado, iniciarSesion, cerrarSesion,  openLogIn, setOpenLogIn, } =
    useContext(ContextGlobal);
  const [open, setOpen] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // const [openLogIn, setOpenLogIn] = useState(false);
  const handleOpenLogIn = () => {
    console.log("Abreee el form inicio")
    setOpenLogIn(true);
  };

  const handleCloseLogIn = () => {
    setOpenLogIn(false);
  };
  ////////// Segmento modal   //////////

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //////////////////////

  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  ///////////////////////////

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ocultarComponente = windowWidth < 1300;

  if (ocultarComponente) {
    return null;
  }

  return (
    <Stack>
       <Link to="/formingreso" style={{ textDecoration: "none" }}>
      <Button
        className="boton-generico"
        // onClick={handleOpen}
    
        sx={{
          color: "#424242",
          padding: "1.2rem 0.5rem",
          width: "400px",
          borderRadius: "20px",
        }}
      >
        Iniciar Cuenta
      </Button>
      </Link>
    

    
    </Stack>
  );
};

export default BotonInicio;
