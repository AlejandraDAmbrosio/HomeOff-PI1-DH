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
obtenerPrecioXIdRecurso;
import formateoFechas from "../Components/utils/formateoFechas";
import obtenerPrecioXIdRecurso from "../Components/utils/obtenerPrecioXIdRecurso";
import calculoDiasEntreFechas from "../Components/utils/calculoDiasEntreFechas";

const Reservas = ({idRecurso, fechaInicio, fechaFin}) => {
  const { id } = useParams();
  const {
    getReservas,
    reservas,
    postReserva,
    productosBKLista,
    getRecursoXID,
  } = useContext(ContextGlobal);

  useEffect(() => {
    getReservas(id);
    postReserva();
  }, [id]);
  console.log(reservas);

  return (

    <Container>
    <div>
      <div>Reservas</div>
    </div>

    </Container>
  );
};

export default Reservas;
