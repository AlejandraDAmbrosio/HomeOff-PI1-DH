import React, { useState, useEffect, useContext } from "react";
import PanelFiltrado from "./PanelFiltrado";
import { Container } from "@mui/material";
import { ContextGlobal } from "../utils/global.context";

const TablaXCategorias = ({ productos }) => {
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
  console.log(" ---------------------------------- productos Lista recibida por parametros ya filtrada");
  console.log(productos);


 
  // useEffect(() => {
  //   const productosFiltrados = productosBKLista.filter(
  //     producto => producto.categoria_id === id
  //   );
  //   setListaFiltrada(productosFiltrados);
  // }, [id, productosBKLista]);




  return (
    <div>
      <Container>
        <div>TablaXCategorias</div>
        <PanelFiltrado></PanelFiltrado>

        {/* Mostrar los productos filtrados */}
        {productos.map((producto) => (
          <div key={producto.idRecurso}>{producto.nombre}</div>
          // Puedes mostrar los detalles del producto aquí
        ))}
      </Container>
    </div>
  );
};

export default TablaXCategorias;
