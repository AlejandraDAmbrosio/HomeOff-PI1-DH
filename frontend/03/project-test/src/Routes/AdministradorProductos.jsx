import React from "react";

import "../Components/AdministradorProductos/AdminProductos/AdministradorProductos.css";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import TablaProductos from "../Components/AdministradorProductos/AdminProductos/TablaProductos";

const AdministradorProductos = () => {
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