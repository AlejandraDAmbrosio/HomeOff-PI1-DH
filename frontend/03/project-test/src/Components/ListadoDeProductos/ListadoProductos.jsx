import React from "react";

import { useState, useEffect, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import { useNavigate } from "react-router-dom";

import CardProducto from "./CardProducto";
import "../ListadoDeProductos/CardProducto.css";
import "./ListadoProductos.css";

const ListadoProductos = ({ CantidadCards }) => {
  const navigate = useNavigate();
  const pasaPaginaSiguiente = ">";
  const irAPaginaAnterior = "<";
  const { productosBKLista } = useContext(ContextGlobal);

  // console.log(" ----------Listado de Productos");

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
      <h3 className="txt-titulo-listado-productos"></h3>

      <div className="grid-container-listado-home">
        {paginatedProducts.length ? (
          paginatedProducts[currentPage].map((producto, idRecurso) => (
            <CardProducto
              className=".item-grid-listado"
              key={producto.idRecurso}
              title={producto.nombre}
              descripcion={producto.descripción}
              url={producto.imagenURL} // Aquí usamos la URL de la foto
              precio={producto.precioUnitario}
              tipoRecurso={producto.tipoDeRecurso}
              // servicio1={producto.servicios.servicio1}
              // servicio2={producto.servicios.servicio2}
              // servicio3={producto.servicios.servicio3}
              id={producto.idRecurso}
            />
          ))
        ) : (
          <>
            <h3> No encontramos productos para recomendar </h3>
            <h3>Los datos del carga son {productosBKLista.ListadoProductos}</h3>
          </>
        )}
      </div>

      <div className="pagination  pagination is-centered">
        {currentPage > 0 && (
          <button className="pagination-previous" onClick={handlePreviousPage}>
            {irAPaginaAnterior}
          </button>
        )}
        {currentPage < paginatedProducts.length - 1 && (
          <>
            <button className="pagination-next" onClick={handleNextPage}>
              {pasaPaginaSiguiente}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ListadoProductos;
