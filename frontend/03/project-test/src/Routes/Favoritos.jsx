import { Container, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import { useParams } from "react-router-dom";
import buscadorSedeXIDSede from "../Components/utils/buscadorSedeXIDSede";
import obtenerNombreCategoriaPorId from "../Components/utils/obtenerNombreCategoriaPorId";
import CardProducto from "../Components/ListadoDeProductos/CardProducto";


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
    
  } = useContext(ContextGlobal);

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


  return (
    // <Container style={{marginTop:"16rem"}}>
    <Stack style={{ marginTop: "7rem", minHeight: "730px" }}>
      <div className="administracion-fil-titulo">
        <div className="fil-titulo">Tus espacios favoritos:</div>

        <Stack
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "30px",
          }}
        >
          <Typography variant="h6">
            Tenés xxx espacios relacionados con tu busqueda.
          </Typography>
        </Stack>
      </div>

      <Stack>
        {" "}
        {productosFavoritos.length ? (
          productosFavoritos.map((favorito) => {
            return (
              <CardProducto
                className=".item-grid-listado"
                key={favorito.idRecurso}
                title={favorito.nombre}
                descripcion={favorito.descripción}
                url={favorito.imagenURL}
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
      </Stack>
    </Stack>
    // </Container>
  );
};

export default Favoritos;
