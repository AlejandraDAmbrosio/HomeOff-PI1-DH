import React from "react";
import buscadorSedeXIDSede from "../utils/buscadorSedeXIDSede";
import { useState, useEffect, useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import { useNavigate } from "react-router-dom";

import CardProducto from "./CardProducto";
import "../ListadoDeProductos/CardProducto.css";
import "./ListadoProductos.css";
import obtenerNombreCategoriaPorId from "../utils/obtenerNombreCategoriaPorId";
import { Container, Stack, Typography } from "@mui/material";

const ListadoProductos = ({ CantidadCards }) => {
  const navigate = useNavigate();
  const pasaPaginaSiguiente = ">";
  const irAPaginaAnterior = "<";
  const {
    productosBKLista,
    categoriasLista,
    prodFiltrados,
    puntosPromedioXIDRecurso,
    getPuntosPromedioXIDRecurso,
    userIdLogIn,
    getListaFavXUserID,
    listaFavXUserId
  } = useContext(ContextGlobal);

  const userId = localStorage.getItem("idUsuario");
  const [listadoFavoritosHome, setListadoFavoritosHome] = useState([]);

  // useEffect(() => {
  //   getListaFavXUserID(userId);
  //   if (listaFavXUserId.length < 1 ) {
  //     setListadoFavoritosHome(listaFavXUserId);
  //   }
  // }, [listadoFavoritosHome ]);
  
  useEffect(() => {
    if (userId) {
      getListaFavXUserID(userId);
      
      if (listaFavXUserId.length < 1) {
        setListadoFavoritosHome(listaFavXUserId);
      }
    }
  }, [userId, listadoFavoritosHome]);

  
console.log("listaFavXUserId", listaFavXUserId)
  const [puntuacionesPromedio, setPuntuacionesPromedio] = useState({});

  const shouldUseFilteredProducts = prodFiltrados.length > 0;
  // console.log("prodFiltrados en LIstaProd:", prodFiltrados);

  const productsToRender = shouldUseFilteredProducts
    ? prodFiltrados
    : productosBKLista;

  useEffect(() => {
    const obtenerPuntuacionesPromedio = async () => {
      const puntuaciones = {};
      const idsRecurso = productsToRender.map((producto) => producto.idRecurso);
      const puntuacionesArray = await Promise.all(
        idsRecurso.map((idRecurso) => getPuntosPromedioXIDRecurso(idRecurso))
      );

      idsRecurso.forEach((idRecurso, index) => {
        puntuaciones[idRecurso] = puntuacionesArray[index];
      });

      setPuntuacionesPromedio(puntuaciones);
    };

    obtenerPuntuacionesPromedio();
  }, [productsToRender]);


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
            // const puntos = getPuntosPromedioXIDRecurso(idRecurso);
            // console.log("PUNTOS EN RENDERIZADO")
            // console.log(puntos)

            // const estrellas = puntos >= 1 && puntos <= 5 ? puntos : 0;

            return (
              <CardProducto
                className=".item-grid-listado"
                key={producto.idRecurso}
                title={producto.nombre}
                descripcion={producto.descripción}
                url={producto.imagenURL}
                precio={producto.precioUnitario}
                puntuacion={puntuacionesPromedio[producto.idRecurso] || 0}
                estrellas={producto.idRecurso}
                sede={buscadorSedeXIDSede(producto.idSede)}
                id={producto.idRecurso}
                categoria={obtenerNombreCategoriaPorId(
                  producto.categoria_id,
                  productosBKLista,
                  categoriasLista
                )}
                listaFavoritosXID={listaFavXUserId}
              />
            );
          })
        ) : (
          <>
            <Container sx={{placeItems:"center"}}>
              <Stack style={{margin:"auto",display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"60vw"}}>
                <Typography variant="h4">
                  {" "}
                  No encontramos productos por el momento.{" "}
                </Typography>
                <Typography  variant="h4">Por favor, intente más tarde</Typography>
                
              </Stack>
            </Container>
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
