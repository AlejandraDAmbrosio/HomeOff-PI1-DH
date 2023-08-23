import React from "react";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import "../Components/AdministrarCategorias.css";
import TablaCategorias from "../Components/AdministradorProductos/Categorias/TablaCategorias";

const AdministrarCategorias = () => {
  return (
    <div className="administracion-cat">
      <div className="administracion-cat-titulo">Administrar Categorías</div>
      <div className="paneles-cate">
        <PanelAdminUser />
        <TablaCategorias/>
      </div>
    </div>
  );
};

export default AdministrarCategorias;
