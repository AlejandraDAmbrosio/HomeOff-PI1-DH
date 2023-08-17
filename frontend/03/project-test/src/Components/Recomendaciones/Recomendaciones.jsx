import React from "react";
// import CardProducto from "../CardProducto";
// import { useState, useEffect } from "react";
import "./Recomendaciones.css";
import CardRecomendaciones from "./CardRecomendaciones";
import "./CardRecomendaciones.css";
import listadoProductosData from "../ListadoProductos.json";

const Recomendaciones = ({ CantidadCards }) => {
  const productos = listadoProductosData;
  

  const getRandomProducts = () => {
    const randomProducts = [...productos]
      .sort(() => Math.random() - 0.35)
      .slice(0, CantidadCards);
    return randomProducts;
  };

  const productosAleatorios = getRandomProducts();

  return (
    <div className="segmento-recomendaciones-productos">
      <div className="listado-productos-reco">
        {productosAleatorios.length ? (
          productosAleatorios.map((producto, index) => (
            <CardRecomendaciones
            key={producto.id}
            title={producto.nombreProducto}
            descripcion={producto.descripcion}
            url={producto.fotos.foto1} // Aquí usamos la URL de la foto
            precio={producto.precio}
            tipoRecurso={producto.tipoRecurso}
            />
          ))
        ) : (
          <h3> No encontramos productos para recomendar </h3>
        )}
      </div>
    </div>
  );
};

export default Recomendaciones;
