<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
import { Stack, Typography, Divider, Paper, Box, Button } from "@mui/material";
=======
import React, { useContext, useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Divider,
  Paper,
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";
>>>>>>> ecba9aee4dab27332505f7150a57e77da5a70825
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
<<<<<<< HEAD
  } = useContext(ContextGlobal);
=======
    usuarioLogueado,
    userIdLogIn,
    postPuntuarComentar
  } = useContext(ContextGlobal);
  const user = localStorage.getItem("nombreCompleto");
  // Define el estado para controlar la apertura y cierre del modal
  const [modalOpen, setModalOpen] = useState(false);

  // Define los estados para los valores de comentario y puntuación
  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(null);

  const handleOpenModal = () => {
    console.log("Abrir modal");
    setModalOpen(true);
  };

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Función para manejar el envío del comentario
  const handleGuardarComentario = () => {


    postPuntuarComentar(userIdLogIn, id, puntuacion, comentario);
    getPuntosComentXIDRecurso(id)
    getPuntosPromedioXIDRecurso(id)
    handleCloseModal();
  };
>>>>>>> ecba9aee4dab27332505f7150a57e77da5a70825

  useEffect(() => {
    getPuntosComentXIDRecurso(id);
    getPuntosPromedioXIDRecurso(id);
  }, [id]);

  return (
<<<<<<< HEAD
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
=======
    <Stack
      direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
      sx={{
        // overflowY: "auto",
        maxHeight: "450px",
        margin: "auto",
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "column", md: "column", lg: "column" }}
        sx={{
          overflowY: "auto",
          maxHeight: "400px",
          display: "flex",
          maxWidth: "1400px",
          margin: "1rem 2rem",
          width: "90%",
          alignItems: "center",
          // flexDirection: "row",
          padding: "1rem 0.2rem 1rem 0.2rem",
          // border: "1px solid #dfdfdf",
          borderRadius: "28px",
>>>>>>> ecba9aee4dab27332505f7150a57e77da5a70825
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
<<<<<<< HEAD
=======
            // border: "1px solid red",
>>>>>>> ecba9aee4dab27332505f7150a57e77da5a70825
          }}
        >
          <Stack
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1.5rem",
              justifyContent: "space-between",
              alignItems: "center",
<<<<<<< HEAD
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
=======

              // border: "1px solid red",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Valoraciones de huéspedes
            </Typography>

            <Stack spacing={1} direction={"row"} sx={{padding:"5px"}}>

            
            {puntosPromedioXIDRecurso ? (
              <EstrellaValor puntuacion={puntosPromedioXIDRecurso} />
            ) : (
              <EstrellaValor />
            )}

            <Typography  style={{  fontSize:"18px" }}>/ {puntosComentXIDRecurso.length} evaluaciones</Typography>
            </Stack>
          </Stack>
          {(usuarioLogueado || userIdLogIn || user) && (
            <Button
              className="boton-generico"
              sx={{
                color: "#47a169",
                padding: "1.2rem 0.5rem",
                width: "100%",
                borderRadius: "20px",
              }}
              onClick={handleOpenModal}
            >
              Comentar
            </Button>
          )}

          {/* Modal para Comentar */}
          <Modal open={modalOpen} onClose={handleCloseModal}>
            <Paper
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Comentar
              </Typography>
              <TextField
                label="Comentario"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              <TextField
                label="Puntuación"
                variant="outlined"
                fullWidth
                type="number"
                value={puntuacion}
                onChange={(e) => setPuntuacion(e.target.value)}
              />
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGuardarComentario}
                >
                  Guardar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </Button>
              </Box>
            </Paper>
          </Modal>
        </Stack>

>>>>>>> ecba9aee4dab27332505f7150a57e77da5a70825
        <Stack
          style={{
            overflowY: "auto",
            width: "100%",
<<<<<<< HEAD
            height: "230px",
            // border: "1px solid violet",
          }}
        >
          {/* Verifica que puntosComentXIDRecurso tenga datos antes de renderizar */}
          {puntosComentXIDRecurso && puntosComentXIDRecurso.length > 0 ? (
            puntosComentXIDRecurso.map((comentario, idPuntuacion) => (
              <Box
                key={idPuntuacion}
                sx={{
                  width: "100%",
                  // border: "1px solid blue",
                  height: "200px",

                  padding: "0.1rem 5px 0.1rem 5px",
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
                    marginBottom: "1rem",
                    overflowY: "auto",
                    width: "100%",
                    padding: "1px",
                    // border: "1px solid green",
                    maxHeight: "300px",
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
                      height: "70px",
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
=======
            height: "380px",
            borderRadius: "8px",
            border: "1px solid #dfdfdf",

            // boxShadow:"3px 3px 3px 3px #b6b5b5",
            display: "flex",
          }}
        >
          {" "}
          <Typography
            variant="h5"
            textAlign={"center"}
            sx={{ height: "20%", margin: "1rem 0rem 0.1rem 0rem" }}
          >
            Comentarios
          </Typography>
          <Stack
            style={{
              overflowY: "auto",
              width: "100%",
              height: "80%",
              borderRadius: "0px 0px 8px 8px",
              border: "1px solid #dfdfdf",
              // boxShadow:"3px 3px 3px 3px #b6b5b5",
              display: "flex",
            }}
          >
            {/* Verifica que puntosComentXIDRecurso tenga datos antes de renderizar */}
            {puntosComentXIDRecurso && puntosComentXIDRecurso.length > 0 ? (
              puntosComentXIDRecurso.map((comentario, idPuntuacion) => (
                <Box
                  key={idPuntuacion}
                  sx={{
                    width: "100%",
                    //  border: "1px solid blue",
                    height: "200px",

                    padding: "1rem 1rem 0rem 1rem",
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
                    sx={{
                      marginBottom: "1rem",
                      overflowY: "auto",
                      width: "100%",
                      padding: "10px",
                      // border: "1px solid green",
                      maxHeight: "300px",
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
                        height: "70px",
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
      </Stack>
    </Stack>
>>>>>>> ecba9aee4dab27332505f7150a57e77da5a70825
  );
};

export default Comentarios;
