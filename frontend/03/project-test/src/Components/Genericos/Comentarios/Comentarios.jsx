import React, { useContext, useEffect } from "react";
import { Stack, Typography, Divider, Paper, Box, Button } from "@mui/material";
import { ContextGlobal } from "../../utils/global.context";
import AvatarNav from "../../Navbar/AvatarNav";
import Puntuacion from "../Puntuaciones/Puntuacion";
import { alignProperty } from "@mui/material/styles/cssUtils";
import EstrellaValor from "../../Genericos/Puntuaciones/EstrellaValor";
import formatearFecha from "../../utils/formatearFechaParaVisualizar";

const Comentarios = ({ id }) => {
  const {
    puntosPromedioXIDRecurso,
    puntosComentXIDRecurso,
    getPuntosComentXIDRecurso,
    getPuntosPromedioXIDRecurso,
  } = useContext(ContextGlobal);

  useEffect(() => {
    getPuntosComentXIDRecurso(id);
    getPuntosPromedioXIDRecurso(id);
  }, [id]);

  return (
    <Stack
    direction={{xl:"column", lg:"column", md:"column", xs: "row", sm: "row" }}
    width={{xl:"400px", lg:"400px", md:"400px"}}
      style={{
        width: "95%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
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
          gap: "1rem",
          padding: "15px",
          width: "250px",
          maxHeight: "320px",
        }}
      >
        <Typography variant="h4">Opiniones</Typography>
        {puntosPromedioXIDRecurso ? (
          <Puntuacion puntaje={puntosPromedioXIDRecurso} />
        ) : (
          <Puntuacion />
        )}
        <Button
          className="boton-generico"
          sx={{
            color: "#47a169",
            padding: "1.2rem 0.5rem",
            width: "150px",
            borderRadius: "20px",
          }}
        >
          Comentar
        </Button>
      </Paper>

      <Paper
        sx={{ /*width: "80%",*/ overflow: "hidden" }}
        style={{ margin: "0", display: "flex", maxWidth: "600px", flexDirection:"column", alignItems:"flex-start" }}
      >
        {/* Verifica que puntosComentXIDRecurso tenga datos antes de renderizar */}
        {puntosComentXIDRecurso && puntosComentXIDRecurso.length > 0 ? (
          puntosComentXIDRecurso.map((comentario, idPuntuacion) => (
            <Box
              key={idPuntuacion}
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
                    <AvatarNav Iniciales={comentario.nombreUsuario}></AvatarNav>
                    <Stack direction="column" spacing={0.4}>
                      <Typography variant="h6">
                        {comentario.nombreUsuario}
                      </Typography>
                      <Typography variant="body2">
                        {formatearFecha(new Date(comentario.fecha_valoracion))}
                      </Typography>
                    </Stack>
                  </Stack>
                  {/* <Puntuacion></Puntuacion> */}
                  <EstrellaValor puntuacion={comentario.puntuacion} />
                </Stack>
                <Typography variant="body2">{comentario.comentario}</Typography>
              </Stack>
            </Box>
          ))
        ) : (
          <Typography variant="body2">
            No hay comentarios disponibles.
          </Typography>
        )}
      </Paper>
      <Divider orientation="horizontal" flexItem spacing={2} />
    </Stack>
  );
};

export default Comentarios;
