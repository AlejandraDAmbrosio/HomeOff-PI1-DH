import React from "react";
import { Link } from "react-router-dom";
import { Boton } from "../Genericos/Boton";
import { useEffect, useState, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";


const BotonCrearCuenta = () => {
  const { usuarioLogueado, iniciarSesion, cerrarSesion } =
  useContext(ContextGlobal);
  const textoBoton = "Crear Cuenta";

  const [modalVisible, setModalVisible] = useState(false);

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

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const ocultarComponente = windowWidth < 1300;

  if (ocultarComponente) {
    return null;
  }

  return (
    <>
    {!usuarioLogueado ? (
    <div>
 
      <Link to={"/formaltauser/"}>
        <Boton texto={textoBoton} />
      </Link>
    </div>
    
  ) : (<></>)}
  </>
  );
};

export default BotonCrearCuenta;
