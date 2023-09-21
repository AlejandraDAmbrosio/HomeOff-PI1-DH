import React, { useState, useContext, useEffect } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/system";
import {
  Container,
  Paper,
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
import { BiSortDown,BiSortUp  } from 'react-icons/bi';


import formateoFechas from "../Components/utils/formateoFechas";
import obtenerPrecioXIdRecurso from "../Components/utils/obtenerPrecioXIdRecurso";
import calculoDiasEntreFechas from "../Components/utils/calculoDiasEntreFechas";

const VerReservas = () => {
  const { id } = useParams();
  const {
    getReservas,
    reservas,
    postReserva,
    productosBKLista,
    getRecursoXID,
  } = useContext(ContextGlobal);
  const [sortColumn, setSortColumn] = useState(null); // Columna actualmente ordenada
  const [sortDirection, setSortDirection] = useState("asc"); // Dirección de ordenamiento
  const [sortedReservas, setSortedReservas] = useState([...reservas]); // Copia ordenada de las reservas

  useEffect(() => {
    getReservas(id);
  }, [id]);

  useEffect(() => {
    // Actualiza la copia ordenada cuando cambia el estado 'reservas'
    setSortedReservas([...reservas]);
  }, [reservas]);


  const toggleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const sortData = (column) => {
    if (column === sortColumn) {
      toggleSortDirection(); // Cambia la dirección si la misma columna se hace clic nuevamente
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }

    const newSortedReservas = [...sortedReservas].sort((a, b) => {
      const factor = sortDirection === "asc" ? 1 : -1;

      if (column === "nombreRecurso") {
        return a.nombreRecurso.localeCompare(b.nombreRecurso) * factor;
      } else if (column === "inicioReserva") {
        return a.inicioReserva.localeCompare(b.inicioReserva) * factor;
      } else if (column === "finalizacionReserva") {
        return a.finalizacionReserva.localeCompare(b.finalizacionReserva) * factor;
      } else if (column === "fechaRealizacionReserva") {
        return a.fechaRealizacionReserva.localeCompare(b.fechaRealizacionReserva) * factor;
      } else if (column === "Dias") {
        return a.Dias.localeCompare(b.Dias) * factor;
        //  return (a.dias - b.dias) * factor;
      } else if (column === "precio") {
        return (a.precio - b.precio) * factor;
      } else {
        return 0; // Si no se ordena por ninguna columna específica, no se cambia el orden
      }
    });

    // Actualiza la copia ordenada de las reservas
    setSortedReservas(newSortedReservas);
  };
    // Actualiza la copia ordenada de las reservas
  

  const getSortIcon = (column) => {
    if (column === sortColumn) {
      return sortDirection === "asc" ? <BiSortDown fontSize={"20px"}/> : <BiSortUp  fontSize={"20px"}/>;
    }
    return null;
  };

  return (
    // <Container sx={{width:"70vw"}}>
      <Stack
        style={{
          display:"flex",
          flexDirection:"column",
          margin:"7rem auto 2rem auto",
          justifyContent:"space-evenly",
          minHeight: "730px",
          maxWidth: "1900px",
          width:"90%",
          
        }}
      >
        <Typography variant="h3">Ver historial Reservas</Typography>
<Paper sx={{width:"100%"}}>
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
              <TableCell style={{fontSize:"1.1rem"}}>Imagen</TableCell>
                <TableCell style={{ fontSize:"1.1rem", width:"80px"}}>Id </TableCell>
                <TableCell onClick={() => sortData("nombreRecurso")} style={{cursor:"pointer", fontSize:"1.1rem", width:"100px"}}>Nombre  {getSortIcon("nombreRecurso")}</TableCell>
                <TableCell onClick={() => sortData("inicioReserva")} style={{cursor:"pointer", fontSize:"1.1rem", width:"200px"}}>Fecha de inicio {getSortIcon("inicioReserva")}</TableCell>
                <TableCell onClick={() => sortData("finalizacionReserva")} style={{cursor:"pointer", fontSize:"1.1rem", width:"200px"}}>Fecha de fin {getSortIcon("finalizacionReserva")}</TableCell>
                <TableCell onClick={() => sortData("fechaRealizacionReserva") } style={{cursor:"pointer", fontSize:"1.1rem", width:"200px"}}>Fecha reserva {getSortIcon("fechaRealizacionReserva")}</TableCell>
                <TableCell style={{ fontSize:"1.1rem", width:"90px"}}>Días</TableCell>
                <TableCell  style={{ fontSize:"1.1rem", width:"90px"}}>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedReservas.map((reserva, idReserva) => (
                <TableRow key={idReserva} style={{ height: "30px" }}>
                  <TableCell style={{ width: "30px", padding: "0 0 0 15px" }}>
                    <img
                      src={obtenerImagenXIdRecurso(
                        reserva.idRecurso,
                        productosBKLista
                      )}
                      alt={`Imagen de ${reserva.nombreRecurso}`}
                      style={{
                        width: "60px",
                        height: "50px",
                        padding: "2px 0 0 0px",
                      }}
                    />
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
                    {calculoDiasEntreFechas(
                      formateoFechas(reserva.inicioReserva),
                      formateoFechas(reserva.finalizacionReserva)
                    )}
                  </TableCell>
                  {/* <TableCell>{recurso.estadoRecurso}</TableCell> */}

                  <TableCell>
                    $
                    {obtenerPrecioXIdRecurso(
                      reserva.idRecurso,
                      productosBKLista,
                      calculoDiasEntreFechas(
                        formateoFechas(reserva.inicioReserva),
                        formateoFechas(reserva.finalizacionReserva)
                      )
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Stack>
    // </Container>
  );
};

export default VerReservas;
