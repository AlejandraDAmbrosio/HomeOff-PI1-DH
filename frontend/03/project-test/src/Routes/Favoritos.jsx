import { Container, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import { useParams } from "react-router-dom";

const Favoritos = () => {
  const { id } = useParams();
  const {
    favoritosXID,
    setFavoritosXID, 
    getFavoritosXID,

  } = useContext(ContextGlobal);


  useEffect(() => {
    getFavoritosXID(id);
  }, [id]);

  console.log(favoritosXID)


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

      <Stack> {favoritosXID.lenght? (favoritosXID.map((favorito)=>{

return (
  <CardProducto
    className=".item-grid-listado"
    key={producto.idRecurso}
    title={producto.nombre}
    descripcion={producto.descripción}
    url={producto.imagenURL}
    precio={producto.precioUnitario}
    estrellas={producto.idRecurso}
    sede={buscadorSedeXIDSede(producto.idSede)}
    id={producto.idRecurso}
    categoria={obtenerNombreCategoriaPorId(
      producto.categoria_id,
      productosBKLista,
      categoriasLista
    )}
  />
);


      }) ) : (
        <div>No encontramos favoritos </div>
      )}  
      </Stack>
    </Stack>
    // </Container>
  );
};

export default Favoritos;
