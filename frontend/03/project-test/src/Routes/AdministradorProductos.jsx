import React, { useEffect } from "react";
import "../Components/AdministradorProductos.css";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import TablaProductos from "../Components/AdministradorProductos/AdminProductos/TablaProductos";
import { Stack } from "@mui/material";

const AdministradorProductos = () => {
  useEffect(() => {
    function detectMobileDevice() {
      if (window.innerWidth <= 1024) {
        alert(
          "Lo siento, esta página no es accesible desde dispositivos móviles."
        );
      }
    }

    detectMobileDevice(); // Ejecuta la detección del ancho de pantalla

    window.addEventListener("resize", detectMobileDevice); 
    return () => {
      window.removeEventListener("resize", detectMobileDevice);
    };
  }, []);
  return (
    <div className="administracion-prod">
      <div className="administracion-prod-titulo">Listar Productos</div>
      <div className="paneles-prod">
        <PanelAdminUser />
        <TablaProductos />
      </div>
    </div>
    
  );
};

export default AdministradorProductos;
