import React, { useState, useEffect } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import { useContext } from "react";
import TablaXCategorias from "../Components/PaginaFiltrado/TablaXCategorias";
import PanelFiltrado from "../Components/PaginaFiltrado/PanelFiltrado";
import "../Components/PaginaFiltrado.css"
import { useParams } from "react-router-dom";
import buscadorXIDCategoria from "../Components/utils/BuscarXIDCategoria";



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
  console.log(" ---------------------------------- Impresion por pantalla de productosBKLista que trae el contexto a PaginaFiltrado");
  console.log(productosBKLista);
  console.log("/*-----------------------------  ID Categorias a buscar ----------------------");
console.log( id);

 



  useEffect(() => {
    setListaFiltrada(
      productosBKLista.filter(producto => producto.categoria_id === parseInt(id))
    );
  }, [id, productosBKLista]);

  console.log(" ---------------------------------- listaFiltrada -----------------------------------------------");
  console.log(listaFiltrada);
  return (
    <div className="administracion-fil">
      <div className="administracion-fil-titulo">PaginaFiltrado</div>
      <div className="paneles-fil">
         <PanelFiltrado></PanelFiltrado> 
        <TablaXCategorias productos={listaFiltrada} />
      
      </div>
    </div>
  );
};

export default PaginaFiltrado;
