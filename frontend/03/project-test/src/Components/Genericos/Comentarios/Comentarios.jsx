import React from "react";
import { Stack, Typography, Divider, Paper, Box, Button } from "@mui/material";

import AvatarNav from "../../Navbar/AvatarNav";
import Puntuacion from "../Puntuaciones/Puntuacion";
import { alignProperty } from "@mui/material/styles/cssUtils";
import EstrellaValor from "../../Genericos/Puntuaciones/EstrellaValor";

const Comentarios = () => {
  return (
    <Stack
      style={{
        width: "95%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent:"center",
        flexWrap: "wrap",
        marginBottom: "2rem",
        
      }}
    >
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          gap:"1rem",
          padding:"15px",
          width:"250px",
          maxHeight: "320px",
        }}
      >
        <Typography variant="h4">Opiniones</Typography>

        <Puntuacion />
        <Button className="boton-generico" sx={{ color: "#47a169", padding:"1.2rem 0.5rem",  width:"150px", borderRadius:"20px"}}>Comentar</Button>
      </Paper>

      <Paper
        sx={{ /*width: "80%",*/ overflow: "hidden" }}
        style={{ margin: "0", display: "flex", maxWidth:"600px" }}
      >
        <Box
          sx={{
            maxHeight: "320px",
            overflow: "auto",
            padding: "2rem 30px 2rem 2rem",
            "&::-webkit-scrollbar": {
              width: "40px",
            },
            "&::-webkit-scrollbar-track": {
              background: "black",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "30px",
            },
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            style={{ marginBottom: "2rem" }}
          >
            <Stack
              direction="row"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={1}>
                <AvatarNav></AvatarNav>
                <Stack direction="column" spacing={0.4}>
                  <Typography variant="h6">Nombre User</Typography>
                  <Typography variant="body2">Fecha</Typography>
                </Stack>
              </Stack>
              {/* <Puntuacion></Puntuacion> */}
              <EstrellaValor puntuacion={1} />
            </Stack>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. {" "}
            </Typography>
          </Stack>
        </Box>
      </Paper>
      <Divider orientation="horizontal" flexItem spacing={2} />
    </Stack>
  );
};

export default Comentarios;
