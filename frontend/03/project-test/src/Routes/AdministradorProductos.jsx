import React, { useEffect } from "react";
import "../Components/AdministradorProductos/AdminProductos/AdministradorProductos.css";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import TablaProductos from "../Components/AdministradorProductos/AdminProductos/TablaProductos";

const AdministradorProductos = () => {
  useEffect(() => {
    function detectMobileDevice() {
      if (window.innerWidth <= 1024) {
        alert(
          "Lo siento, esta página no es accesible desde dispositivos móviles."
        );
      }
    }

    detectMobileDevice(); // Ejecuta la detección inicial

    window.addEventListener("resize", detectMobileDevice); // Agrega el event listener
    return () => {
      window.removeEventListener("resize", detectMobileDevice); // Limpia el event listener al desmontar
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
