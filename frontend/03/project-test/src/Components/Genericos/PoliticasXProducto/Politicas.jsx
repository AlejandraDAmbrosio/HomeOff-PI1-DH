import { Grid, Stack, Typography } from "@mui/material";
import { ContextGlobal } from "../../utils/global.context";
import React, { useContext, useEffect } from "react";

function nombrePoliticas(nombreBase, base) {
  return base[nombreBase] || nombreBase; // Devuelve el valor correspondiente o la clave si no se encuentra
}

const Politicas = ({ id }) => {
 
  const { politicasXID, setPoliticasXID, getPoliticasXID } =
    useContext(ContextGlobal);

  useEffect(() => {
    getPoliticasXID(id);
  }, [id]);


  const politicasNombres = {
    politica_uso_conducta: "Política de uso y conducta",
    politica_cambio_fecha: "Política por cambio de fecha",
    politica_cancelacion: "Política de cancelación",
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      style={{ width: "90%", display: "flex", marginBottom: "2rem" }}
    >
      <Typography variant="h4">Leer antes de reservar</Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        
        flexItem
        alignItems={"flex-start"}
        // divider={<Divider orientation="vertical" flexItem />}
      >
        {Object.keys(politicasXID).map((key) => {
        if (key.startsWith("politica_")) {
          return (
            <Grid container spacing={1} justifyContent={"space-between"} key={key}>
              <Grid item xs={10}>
                <Typography variant="h6"> {nombrePoliticas(key, politicasNombres)}</Typography>
                <Typography variant="body2" style={{ padding: "0 15px 0 0" }}>
                  {politicasXID[key]}
                </Typography>
              </Grid>
            </Grid>
          );
        } else {
          return null;
        }
      })}
      
        {/* <Grid
          container
          spacing={4}
          justifyContent={"space-between"}
          direction={{ xs: "column", sm: "row" }}
        >
          <Grid item xs={4}>
            <Typography variant="h6">Titulo Politica</Typography>
            <Typography variant="body2" style={{ padding: "0 15px 0 0" }}>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Titulo Politica</Typography>
            <Typography variant="body2" style={{ padding: "0 15px 0 0" }}>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Titulo Politica</Typography>
            <Typography variant="body2" style={{ padding: "0 15px 0 0" }}>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
        </Grid> */}
      </Stack>
    </Stack>
  );
};

export default Politicas;
