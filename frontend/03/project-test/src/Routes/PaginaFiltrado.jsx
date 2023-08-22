import React, { useState, useEffect } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import { useContext } from "react";
import TablaXCategorias from "../Components/PaginaFiltrado/TablaXCategorias";
import PanelFiltrado from "../Components/PaginaFiltrado/PanelFiltrado";
import "../Components/PaginaFiltrado.css"
import { useParams } from "react-router-dom";

const PaginaFiltrado = () => {
  const { id } = useParams(); 
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const {
    productosBKLista,
    setProductosBKLista,
    getDatosBKLista,
    categoriasLista,
    setCategoriasLista,
    getCategoriasLista,
  } = useContext(ContextGlobal);

  useEffect(() => {
    getDatosBKLista();
  }, []);

  const productosFiltrados = productosBKLista.filter(
    (producto) => producto.categoria_id === id
  );

  return (
    <div className="administracion-fil">
      <div className="administracion-fil-titulo">PaginaFiltrado</div>
      <div className="paneles-fil">
        {/* <PanelFiltrado></PanelFiltrado> */}
        <TablaXCategorias productos={productosFiltrados} />
      </div>
    </div>
  );
};

export default PaginaFiltrado;
