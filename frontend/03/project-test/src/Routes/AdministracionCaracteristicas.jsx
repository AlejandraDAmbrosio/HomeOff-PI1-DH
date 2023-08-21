import React from "react";
import TablaCategorias from "../Components/AdministradorProductos/Categorias/TablaCategorias";

import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import "../Components/AdministrarCaracteristicas.css";

const AdministracionCaracteristicas = () => {
  return (
    <div className="administracion-car">
      <div className="administracion-car-titulo">
        Administracion Características
      </div>
      <div className="paneles-car">
        <PanelAdminUser />
        <TablaCategorias />
      </div>
    </div>
  );
};

export default AdministracionCaracteristicas;
