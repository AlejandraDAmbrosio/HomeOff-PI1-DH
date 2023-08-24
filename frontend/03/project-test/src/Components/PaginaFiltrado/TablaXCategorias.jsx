import React, { useState, useEffect, useContext } from "react";
import PanelFiltrado from "./PanelFiltrado";
import { Container } from "@mui/material";
import { ContextGlobal } from "../utils/global.context";
import { Link } from "react-router-dom";
import "../ListadoDeProductos/CardProducto.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CardProducto from "../ListadoDeProductos/CardProducto";

function obtenerNombreCategoriaPorId(idCategoria, data, listaCategorias) {
  const categoriaEncontrada = listaCategorias.find(
    (item) => item.categoria_id === idCategoria
  );

  if (categoriaEncontrada) {
    return categoriaEncontrada.name;
  } else {
    return "Categoría no encontrada";
  }
}

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
  console.log(
    " ---------------------------------- productos Lista recibida por parametros ya filtrada"
  );
  console.log(productos);

  return (
    <div>
      <Container>
        <div className="container-listado-home">
          
        {productos.map((producto) => (
        <CardProducto
              className=".item-grid-listado"
              key={producto.idRecurso}
              title={producto.nombre}
              descripcion={producto.descripción}
              url={producto.imagenURL} // Aquí usamos la URL de la foto
              precio={producto.precioUnitario}
              categoria={obtenerNombreCategoriaPorId(
                producto.categoria_id,
                productosBKLista,
                categoriasLista
              )}
              id={producto.idRecurso}
            />))}

        </div>
        {/* -------------------------------------------------- */}
     
        
      </Container>
    </div>
  );
};

export default TablaXCategorias;
