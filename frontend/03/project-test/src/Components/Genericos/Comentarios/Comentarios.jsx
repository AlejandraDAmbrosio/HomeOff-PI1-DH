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
    <Paper
      style={{
        // overflowY: "auto",
        maxHeight: "400px",
        margin: "0",
        display: "flex",
        width: "100%",
        maxWidth: "370px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1rem",
        // border: "1px solid green",
      }}
    >
      <Stack
        style={{
          overflowY: "auto",
          maxHeight: "400px",
          display: "flex",
          width: "100%",
          alignItems: "center",
          padding: "1rem 0.2rem 1rem 0.2rem",
          // border: "1px solid yellow",
        }}
      >
        <Stack
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            padding: "1rem 1rem 1rem 1rem",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Stack
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1.5rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Opiniones</Typography>

            {puntosPromedioXIDRecurso ? (
              <EstrellaValor puntuacion={puntosPromedioXIDRecurso} />
            ) : (
              <EstrellaValor />
            )}
          </Stack>

          <Button
            className="boton-generico"
            sx={{
              color: "#47a169",
              padding: "1.2rem 0.5rem",
              width: "100%",
              borderRadius: "20px",
            }}
          >
            Comentar
          </Button>
        </Stack>
        <Stack
          style={{
            overflowY: "auto",
            width: "100%",
            // border: "1px solid violet",
          }}
        >
          {/* Verifica que puntosComentXIDRecurso tenga datos antes de renderizar */}
          {puntosComentXIDRecurso && puntosComentXIDRecurso.length > 0 ? (
            puntosComentXIDRecurso.map((comentario, idPuntuacion) => (
              <Box
                key={idPuntuacion}
                sx={{
                   maxHeight: "250px",
                  overflowY: "auto", // Agrega una barra de desplazamiento vertical cuando sea necesario
                  width: "100%",
                  // border: "1px solid blue",
                  height: "300px",
                  overflow: "hidden",
                  padding: "0.5rem 0.5px 1rem 0.5rem",
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
                <Paper
                  direction="column"
                  spacing={1}
                  style={{
                    marginBottom: "2rem",
                    overflowY: "auto", // Agrega una barra de desplazamiento vertical cuando sea necesario
                    width: "100%",
                    // border: "1px solid green",
                    maxHeight: "400px",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={3}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      // border: "1px solid red",
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <AvatarNav
                        Iniciales={comentario.nombreUsuario}
                      ></AvatarNav>
                      <Stack direction="column" spacing={0.4}>
                        <Typography variant="h6">
                          {comentario.nombreUsuario}
                        </Typography>
                        <Typography variant="body2">
                          {formatearFecha(
                            new Date(comentario.fecha_valoracion)
                          )}
                        </Typography>
                      </Stack>
                    </Stack>
                    {/* <Puntuacion></Puntuacion> */}
                    <EstrellaValor puntuacion={comentario.puntuacion} />
                  </Stack>
                  <Typography variant="body2">
                    {comentario.comentario}
                  </Typography>
                </Paper>
              </Box>
            ))
          ) : (
            <Typography variant="body2">
              No hay comentarios disponibles.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Comentarios;
