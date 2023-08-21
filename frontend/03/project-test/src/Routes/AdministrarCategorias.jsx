import React from "react";
import TablaCategorias from "../Components/AdministradorProductos/Categorias/TablaCategorias";
import PanelAdminUser from "../Components/AdministradorProductos/PanelAdminUser";
import "../Components/AdministrarCategorias.css";

const AdministrarCategorias = () => {


  return (
    <div className="administracion-cat">
      <div className="administracion-cat-titulo">AdministrarCategorias</div>
      <div className="paneles-cate">
        <PanelAdminUser />
        <TablaCategorias/>
      </div>
    </div>
  );
};

export default AdministrarCategorias;
