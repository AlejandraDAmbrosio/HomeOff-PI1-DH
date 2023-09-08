import { Container, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import { useParams } from "react-router-dom";
import buscadorSedeXIDSede from "../Components/utils/buscadorSedeXIDSede";
import obtenerNombreCategoriaPorId from "../Components/utils/obtenerNombreCategoriaPorId";
import CardProducto from "../Components/ListadoDeProductos/CardProducto";

import "../Components/Favoritos.css";


const Favoritos = () => {
  const { id } = useParams();
  const {
    favoritosXID,
    setFavoritosXID,
    getFavoritosXID,
    getRecursoXID,
    productosBKLista,
    categoriasLista,
    setRecursoXID,
    getPuntosPromedioXIDRecurso,
    userIdLogIn,
  } = useContext(ContextGlobal);
  const [puntuacionesPromedio, setPuntuacionesPromedio] = useState({});

  const [recursosFavoritos, setRecursosFavoritos] = useState([]);



  useEffect(() => {
    getFavoritosXID(id);
   
  }, []);

  console.log("favoritosXID" , favoritosXID);

  const idRecursos = favoritosXID.map((favoritoIdRecurso) => favoritoIdRecurso.idRecurso);
  console.log("idRecursos", idRecursos);

  const productosFavoritos = productosBKLista.filter((producto) =>
    idRecursos.includes(producto.idRecurso)

  );
  console.log("productosFavoritos")

  console.log(productosFavoritos)

  // console.log("prodFiltrados en LIstaProd:", prodFiltrados);



    useEffect(() => {
      const obtenerPuntuacionesPromedio = async () => {
        const puntuaciones = {};
        const idsRecurso = productosFavoritos.map((producto) => producto.idRecurso);
        const puntuacionesArray = await Promise.all(
          idsRecurso.map((idRecurso) => getPuntosPromedioXIDRecurso(idRecurso))
        );
    
        idsRecurso.forEach((idRecurso, index) => {
          puntuaciones[idRecurso] = puntuacionesArray[index];
        });
    
        setPuntuacionesPromedio(puntuaciones);
      };
    
      obtenerPuntuacionesPromedio();
    }, [favoritosXID]);
  
  return (
    // <Container style={{marginTop:"16rem"}}>
    <Stack style={{ marginTop: "7rem", marginBottom:"2rem", minHeight: "730px", maxWidth:"1900px" }}>
      <div className="administracion-fav-titulo">
        <div className="fil-titulo">Tus espacios favoritos</div>

        {/* <Stack
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft:"2rem",
            height: "30px",

          }}
        > */}
          {/* <Typography variant="h6">
            Tenés {productosFavoritos.length } espacios relacionados con tu busqueda.
          </Typography> */}
        {/* </Stack> */}
      </div>

      <Stack>
        {" "}
        <div className="segmento-listado-productos"> 
        <div className="grid-container-listado-home">
        {productosFavoritos.length ? (
          productosFavoritos.map((favorito) => {
            return (
              <CardProducto
                className="item-grid-listado"
                key={favorito.idRecurso}
                title={favorito.nombre}
                descripcion={favorito.descripción}
                url={favorito.imagenURL}
                puntuacion={puntuacionesPromedio[favorito.idRecurso] || 0}
                precio={favorito.precioUnitario}
                estrellas={favorito.idRecurso}
                sede={buscadorSedeXIDSede(favorito.idSede)}
                id={favorito.idRecurso}
                categoria={obtenerNombreCategoriaPorId(
                  favorito.categoria_id,
                  productosBKLista,
                  categoriasLista
                )}
              />
            );
          })
        ) : (
          <div>No encontramos favoritos </div>
        )}
        </div> 
        </div>
      </Stack>
    </Stack>
    // </Container>
  );
};

export default Favoritos;
