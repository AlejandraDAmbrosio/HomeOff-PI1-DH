import React from "react";
import "../Genericos/Boton.css";
import { useEffect, useState, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import FormIngreso from "../../Routes/FormIngreso";
import Modal from "@mui/material/Modal";

import { Button } from "@mui/material";

const BotonInicio = () => {
  const { usuarioLogueado, iniciarSesion, cerrarSesion } =
    useContext(ContextGlobal);
  const [open, setOpen] = useState(false);

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

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // //////////////////////

  // const handleModalClick = (e) => {
  //   e.stopPropagation();
  // };


  const [openLogIn, setOpenLogIn] = useState(false);

  const handleOpenLogIn = () => {
    setOpenLogIn(true);
  };

  const handleCloseLogIn = () => {
    setOpenLogIn(false);
  };
  const handleModalClick = (e) => {
    e.stopPropagation();
  };


  return (
    <div>
      <Button
        className="boton-generico"
        // onClick={handleOpen}
        onClick={() => {
          handleOpenLogIn(); // Cierra el menú
        }}
        sx={{
          color: "#424242",
          padding: "1.2rem 0.5rem",
          width: "400px",
          borderRadius: "20px",
        }}
      >
        Iniciar Cuenta
      </Button>

      {/* <Modal open={open} onClose={handleClose} BackdropClick={true}>
        <div onClick={handleModalClick} onMouseDown={handleModalClick}>
          <FormIngreso />
        </div>
      </Modal> */}

      <Modal open={openLogIn} onClose={handleCloseLogIn} BackdropClick={true}>
        <div onClick={handleModalClick} onMouseDown={handleModalClick}>
          <FormIngreso />
        </div>
      </Modal>
    </div>
  );
};

export default BotonInicio;
