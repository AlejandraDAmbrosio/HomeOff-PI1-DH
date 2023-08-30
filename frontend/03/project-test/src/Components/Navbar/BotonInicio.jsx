import React from "react";
import { Link } from "react-router-dom";
import { Boton } from "../Genericos/Boton";
import { useEffect, useState, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import FormIngreso from "../../Routes/FormIngreso";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const BotonInicio = () => {
  const { usuarioLogueado, iniciarSesion, cerrarSesion } =
    useContext(ContextGlobal);
  const [open, setOpen] = useState(false);
  const textoBoton = "Iniciar sesion";

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  ////////// Segmento modal   //////////

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //////////////////////

  return (
    <div>
      <Button onClick={handleOpen}>Iniciar Cuenta</Button>

      <Modal open={open} onClose={handleClose}>
        {/* Contenido del modal */}
        <div>
          <FormIngreso />
        </div>
      </Modal>
    </div>
  );
};

export default BotonInicio;
