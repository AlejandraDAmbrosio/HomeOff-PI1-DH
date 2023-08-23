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
  console.log(" ---------------------------------- Impresion por pantalla de productosBKLista que trae el contexto a PaginaFiltrado");
  console.log(productosBKLista);

  // useEffect(() => {
  //   const productosFiltrados = productosBKLista.filter(
  //     producto => producto.categoria_id == id);
  //   setListaFiltrada(productosFiltrados);
  // }, [id, productosBKLista]);

  useEffect(() => {
    setListaFiltrada(
      productosBKLista.filter(categoria => categoria.id === id)
    );
  }, [id]);


  console.log(" ---------------------------------- listaFiltrada -----------------------------------------------");
  console.log(listaFiltrada);
  return (
    <div className="administracion-fil">
      <div className="administracion-fil-titulo">PaginaFiltrado</div>
      <div className="paneles-fil">
        {/* <PanelFiltrado></PanelFiltrado> */}
        <TablaXCategorias productos={listaFiltrada} />
        {listaFiltrada.map(producto => (
            <li key={producto.id}>{producto.nombre}</li>
          ))}
      </div>
    </div>
  );
};

export default PaginaFiltrado;
