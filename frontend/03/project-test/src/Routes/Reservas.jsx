import React, { useState, useContext, useEffect } from "react";
import { ContextGlobal } from "../Components/utils/global.context";

import { useParams } from "react-router-dom";
import { Stack } from "@mui/system";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import obtenerImagenXIdRecurso from "../Components/utils/obtenerImagenXIdRecurso";
import formatearFecha from "../Components/utils/formatearFechaParaVisualizar";
<<<<<<< HEAD
obtenerPrecioXIdRecurso;
=======

>>>>>>> ecba9aee4dab27332505f7150a57e77da5a70825
import formateoFechas from "../Components/utils/formateoFechas";
import obtenerPrecioXIdRecurso from "../Components/utils/obtenerPrecioXIdRecurso";
import calculoDiasEntreFechas from "../Components/utils/calculoDiasEntreFechas";

const Reservas = () => {
  const { id } = useParams();
  const { setUsuarioLogueado, usuarioLogueado, userIdLogIn, isAdmin, getReservas,
    reservas,
    postReserva,
    productosBKLista,
    recursoXID,
    getRecursoXID, } =
  useContext(ContextGlobal);


  const user = localStorage.getItem("nombreCompleto");
  const userId = localStorage.getItem("idUsuario");



  useEffect(() => {

    getRecursoXID(id);
    getCaracteristicasXID(id);
    getPuntosComentXIDRecurso(id);
  }, [id]);
  console.log(reservas);

  return (

    <Container>
    <Stack  style={{
        marginTop: "7rem",
        marginBottom: "2rem",
        minHeight: "730px",
        maxWidth: "1900px",
      }}>
      <Typography variant="h3">{recursoXID.nombre}</Typography>
      <Typography>{user}</Typography>


  <Stack>  </Stack>
  
   </Stack>



    </Container>
  );
};

export default Reservas;
