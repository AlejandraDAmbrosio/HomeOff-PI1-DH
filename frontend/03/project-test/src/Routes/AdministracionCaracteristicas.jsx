import React from "react";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import "../Components/AdministrarCaracteristicas.css";
import TablaCaracteristicas from "../Components/AdministradorProductos/Caracteristicas/TablaCaracteristicas";

const AdministracionCaracteristicas = () => {
  return (
    <div className="administracion-car">
      <div className="administracion-car-titulo">
        Administracion Características
      </div>
      <div className="paneles-car">
        <PanelAdminUser />
        <TablaCaracteristicas />
      </div>
    </div>
  );
};

export default AdministracionCaracteristicas;
