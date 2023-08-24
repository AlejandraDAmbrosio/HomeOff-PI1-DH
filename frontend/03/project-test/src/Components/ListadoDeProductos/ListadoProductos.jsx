import React from "react";

import { useState, useEffect, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import { useNavigate } from "react-router-dom";

import CardProducto from "./CardProducto";
import "../ListadoDeProductos/CardProducto.css";
import "./ListadoProductos.css";

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

const ListadoProductos = ({ CantidadCards }) => {
  const navigate = useNavigate();
  const pasaPaginaSiguiente = ">";
  const irAPaginaAnterior = "<";
  const { productosBKLista, categoriasLista } = useContext(ContextGlobal);

  // console.log(" ----------Listado de Productos");
  // console.log(productosBKLista)
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
              categoria={obtenerNombreCategoriaPorId(
                producto.categoria_id,
                productosBKLista,
                categoriasLista
              )}
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
  

      <div className="paginacion">
        {currentPage > 0 ? (
          <button className="boton-paginacion" onClick={handlePreviousPage}>
            {irAPaginaAnterior}
          </button>
        ) : (
          <button className="boton-no-paginacion" >
            {irAPaginaAnterior}
          </button>
        )}
        {currentPage < paginatedProducts.length - 1 ? (
          <button className="boton-paginacion" onClick={handleNextPage}>
            {pasaPaginaSiguiente}
          </button>
        ) : ( <button className="boton-no-paginacion" >
        {pasaPaginaSiguiente}
      </button>)}

        {/* {currentPage > 0 && (
          <button className="pagination-previous" onClick={handlePreviousPage}>
            {irAPaginaAnterior}
          </button>
        )}
        {currentPage < paginatedProducts.length - 1 && (
          <button className="pagination-next" onClick={handleNextPage}>
            {pasaPaginaSiguiente}
          </button>
        )} */}
      </div>
    </div>
  );
};

export default ListadoProductos;
