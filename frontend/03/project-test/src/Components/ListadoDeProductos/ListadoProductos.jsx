import React from "react";
import buscadorSedeXIDSede from "../utils/buscadorSedeXIDSede";
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
  const {
    productosBKLista,
    categoriasLista,
    idFilteredSedes,
    setIdFilteredSedes,
    filteredSedes,
    setFilteredSedes,
    filteredName,
    setfilteredName,
    idFilteredName,
    setIdFilteredName,
    prodFiltrados,
    setProdFiltrados,
  } = useContext(ContextGlobal);

  // const shouldFilterProducts = filteredSedes.length > 0;
  const shouldFilterProducts = prodFiltrados.length > 0;
console.log("prodFiltrados en LIstaProd:", prodFiltrados)
  // const filteredProducts = shouldFilterProducts
  //   ? productosBKLista.filter((producto) =>
  //       idFilteredSedes.includes(producto.idSede)
  //     )
  //   : productosBKLista;


    // const filterproductsXName = shouldFilterProducts
    // ? productosBKLista.filter((producto) =>
    // filteredName.includes(producto.idRecurso)
    // )
    // : productosBKLista;



  useEffect(() => {
    // Actualiza los productos filtrados cada vez que idFilteredSedes cambie
    const paginatedArray = chunk(/*filteredProducts*/ prodFiltrados
    , CantidadCards);
    setPaginatedProducts(paginatedArray);
  }, [CantidadCards, prodFiltrados]);

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

  // const handleSearch = () => {
  //   const searchText = e.target.value;
  //   const filteredProducts = shouldFilterProducts
  //     ? productosBKLista.filter((producto) =>
  //         idFilteredSedes.includes(producto.idSede) &&
  //         producto.nombre.toLowerCase().includes(searchText.toLowerCase())
  //       )
  //     : productosBKLista.filter((producto) =>
  //         producto.nombre.toLowerCase().includes(searchText.toLowerCase())
  //       );
  //   setPaginatedProducts(filteredProducts);
  // };

  return (
    <div className="segmento-listado-productos">
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
              sede={buscadorSedeXIDSede(producto.idSede)}
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
