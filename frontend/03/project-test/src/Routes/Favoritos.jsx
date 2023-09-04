import { Container, Stack, Typography } from "@mui/material";
import React from "react";

const Favoritos = () => {
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
    </Stack>
    // </Container>
  );
};

export default Favoritos;
