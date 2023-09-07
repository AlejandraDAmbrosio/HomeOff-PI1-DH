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
        marginBottom: "2rem",
        padding: "1rem 1rem 1rem 1rem",
      }}
    >
      <Stack
        style={{
          overflowY: "auto",
          maxHeight: "330px",
          margin: "0",
          display: "flex",
          width: "370px",
          maxWidth: "370px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1.5rem",
          padding: "1rem 1rem 1rem 1rem",
        }}
      >
        <Stack
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            padding: "1rem 1rem 1rem 1rem",
            width: "320px",
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
              width: "300px",
              borderRadius: "20px",
            }}
          >
            Comentar
          </Button>
        </Stack>
        <Stack style={{ overflowY: "auto", width: "320px" }}>
          {/* Verifica que puntosComentXIDRecurso tenga datos antes de renderizar */}
          {puntosComentXIDRecurso && puntosComentXIDRecurso.length > 0 ? (
            puntosComentXIDRecurso.map((comentario, idPuntuacion) => (
              <Box
                key={idPuntuacion}
                sx={{
                  // maxHeight: "250px",
                  width: "100%",
                  height: "200px",
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
                  style={{ marginBottom: "2rem", height: "200px" }}
                >
                  <Stack
                    direction="row"
                    spacing={3}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "285px",
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
      <Divider orientation="horizontal" flexItem spacing={2} />
    </Paper>
  );
};

export default Comentarios;
