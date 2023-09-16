import React, { useState, useContext, useEffect } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/system";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import obtenerImagenXIdRecurso from "../Components/utils/obtenerImagenXIdRecurso"
import formatearFecha from "../Components/utils/formatearFechaParaVisualizar"

import formateoFechas from "../Components/utils/formateoFechas"
import obtenerPrecioXIdRecurso from "../Components/utils/obtenerPrecioXIdRecurso"
import calculoDiasEntreFechas from "../Components/utils/calculoDiasEntreFechas"

const VerReservas = () => {
  const { id } = useParams();
  const { getReservas, reservas, postReserva, productosBKLista, getRecursoXID } = useContext(ContextGlobal);

  useEffect(() => {
    getReservas(id);
    postReserva();
  }, [id]);





  return (
    <Container>
    <Stack
      style={{
        marginTop: "7rem",
        marginBottom: "2rem",
        minHeight: "730px",
        maxWidth: "1900px",
      }}
    >
      <Typography variant="h3">Ver historial Reservas</Typography>

   

      <TableContainer sx={{ maxHeight: 500, width: "100%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: "lightgray",
                  borderRadius: ":var(--bRadiusButton)",
                  padding: "10px",
                  width: "100%",
                }}
              >
                <TableCell>Imagen</TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Fecha de inicio</TableCell>
                <TableCell>Fecha de fin</TableCell>
                <TableCell>Fecha reserva</TableCell>
              
                <TableCell>Días</TableCell>
                <TableCell>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservas.map((reserva, idReserva) => (
                <TableRow key={idReserva} style={{ height: "30px" }}>
                  <TableCell style={{ width: "30px", padding: "0 0 0 15px" }}>
                  <img
                      src= { obtenerImagenXIdRecurso(reserva.idRecurso, productosBKLista)}
                      alt={`Imagen de ${reserva.nombreRecurso}`}
                      style={{
                        width: "60px",
                        height: "50px",
                        padding: "2px 0 0 0px",
                      }}/>
                 
                  </TableCell>
                  <TableCell>{reserva.idRecurso}</TableCell>
                  <TableCell style={{ width: "300px" }}>
                    {reserva.nombreRecurso}
                  </TableCell>
                  <TableCell style={{ width: "150px" }}>
                  {formateoFechas(reserva.inicioReserva)}
                  </TableCell>
                  <TableCell style={{ width: "150px" }}>
                  {formateoFechas(reserva.finalizacionReserva)}
                  
                  </TableCell>
                  <TableCell style={{ width: "150px" }}>
                  {formateoFechas(reserva.fechaRealizacionReserva)}
                 
                  </TableCell>
                  
                 
                 
                  <TableCell>
                    {calculoDiasEntreFechas( (formateoFechas(reserva.inicioReserva)),  (formateoFechas(reserva.finalizacionReserva))  )}
                    </TableCell>
                  {/* <TableCell>{recurso.estadoRecurso}</TableCell> */}
                 

                  <TableCell>
                ${obtenerPrecioXIdRecurso(reserva.idRecurso, productosBKLista, calculoDiasEntreFechas( (formateoFechas(reserva.inicioReserva)),  (formateoFechas(reserva.finalizacionReserva))  ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


    </Stack>
    </Container>
  );
};

export default VerReservas;
