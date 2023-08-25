import React from "react";
import { Link } from "react-router-dom";
import { Boton } from "../Genericos/Boton";
import { useEffect, useState } from "react";


const BotonInicio = () => {


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

  return (

    <div>
 
    <Link to={"/formingreso/"}>
      <Boton texto={textoBoton} />
    </Link>
  </div>


  );
};

export default BotonInicio;
