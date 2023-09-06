import React from "react";
import buscadorSedeXIDSede from "../utils/buscadorSedeXIDSede";
import { useState, useEffect, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import { useNavigate } from "react-router-dom";

import CardProducto from "./CardProducto";
import "../ListadoDeProductos/CardProducto.css";
import "./ListadoProductos.css";
import obtenerNombreCategoriaPorId from "../utils/obtenerNombreCategoriaPorId";


const ListadoProductos = ({ CantidadCards }) => {
  const navigate = useNavigate();
  const pasaPaginaSiguiente = ">";
  const irAPaginaAnterior = "<";
  const { productosBKLista, categoriasLista, prodFiltrados, puntosPromedioXIDRecurso, getPuntosPromedioXIDRecurso } =
    useContext(ContextGlobal);

  const shouldUseFilteredProducts = prodFiltrados.length > 0;
  // console.log("prodFiltrados en LIstaProd:", prodFiltrados);

  const productsToRender = shouldUseFilteredProducts
    ? prodFiltrados
    : productosBKLista;

  useEffect(() => {
    const paginatedArray = chunk(productsToRender, CantidadCards);
    setPaginatedProducts(paginatedArray);
  }, [CantidadCards, productsToRender]);

  const chunk = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const randomProducts = [...productosBKLista].sort(
      () => Math.random() - 0.5
    );

    const paginatedArray = chunk(randomProducts, CantidadCards);
    setPaginatedProducts(paginatedArray);
  }, [CantidadCards, productosBKLista]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="segmento-listado-productos">
      <div className="grid-container-listado-home">
      {paginatedProducts.length ? (
  paginatedProducts[currentPage].map((producto, idRecurso) => {
    // Obtener el valor de getPuntosPromedioXIDRecurso
    const puntos = getPuntosPromedioXIDRecurso(producto.idRecurso);
    
    // Ajustar el valor para que esté entre 1 y 5 o sea 0 en otro caso
    const estrellas = puntos >= 1 && puntos <= 5 ? puntos : 0;

    return (
      <CardProducto
      className=".item-grid-listado"
      key={producto.idRecurso}
      title={producto.nombre}
      descripcion={producto.descripción}
      url={producto.imagenURL}
      precio={producto.precioUnitario}
      estrellas={estrellas} // Pasar el valor ajustado como prop
      sede={buscadorSedeXIDSede(producto.idSede)}
      categoria={obtenerNombreCategoriaPorId(
        producto.categoria_id,
        productosBKLista,
        categoriasLista
      )}
    />
  );
})
) : (
<>
  <h3> No encontramos productos para recomendar </h3>
  <h3>Los datos del carga son {productosBKLista.ListadoProductos}</h3>
</>
)}
      </div>

      <div className="paginacion">
        {currentPage > 0 ? (
          <button className="boton-paginacion" onClick={handlePreviousPage}>
            {irAPaginaAnterior}
          </button>
        ) : (
          <button className="boton-no-paginacion">{irAPaginaAnterior}</button>
        )}
        {currentPage < paginatedProducts.length - 1 ? (
          <button className="boton-paginacion" onClick={handleNextPage}>
            {pasaPaginaSiguiente}
          </button>
        ) : (
          <button className="boton-no-paginacion">{pasaPaginaSiguiente}</button>
        )}
      </div>
    </div>
  );
};

export default ListadoProductos;
