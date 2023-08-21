import React from "react";
import { ContextGlobal } from "../../utils/global.context";
import "./TablaProductos.css";
import { useState, useEffect, useContext } from "react";
import Button from "@mui/joy/Button";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/joy/Chip";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import obtenerNombreCategoriaPorId from "../../utils/buscarNombreCategoria";
import axios from "axios";

import {
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableHead,
  TableCell,
} from "@mui/material";
import { Collapse, Container } from "@mui/material";

const TablaProductos = () => {
  ///Traer datos de Base mediante UseContext
  const {
    productosBKLista,
    setProductosBKLista,
    getDatosBKLista,
    categoriasLista,
    setCategoriasLista,
    getCategoriasLista,
  } = useContext(ContextGlobal);
  useEffect(() => {
    getDatosBKLista();
  }, []);

  useEffect(() => {
    getCategoriasLista();
  }, []);

  /////////////// Metodo Eliminar Producto
  const [recursoXEliminar, setrecursoXEliminar] = useState("");

  const eliminarUsuario = async (idRecurso) => {
    try {
      await axios.delete(
        `http://52.32.210.155:8080/api/v1/recursos/delete/${idRecurso}`
      );

      const updatedRecursos = productosBKLista.filter(
        (productoXId) => productoXId.idRecurso !== idRecurso
      );
       setProductosBKLista(updatedRecursos);;
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleClick = (e, idRecurso) => {
    eliminarUsuario(idRecurso);
    setrecursoXEliminar(e.target.idUsuario);
  
    console.log(e);
  };

  /////////////////Paginacion //////////////////////////

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //////////////////////

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden" }}
      style={{ margin: "0 20px 0 0" }}
    >
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          {/* <div className="encabezado-tabla"> */}
          <TableHead>
            {/* <thead> */}

            <TableRow
              style={{
                backgroundColor: "lightgray",
                borderRadius: ":var(--bRadiusButton)",
                padding: "10px",
                width: "100%",
              }}
            >
              <TableCell>Imagen</TableCell>
              <TableCell>IdRecurso</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>

            {/* </thead> */}
          </TableHead>
          {/* </div> */}
          <TableBody>
            {/* <tbody> */}

            {productosBKLista.map((recurso, IdRecurso) => (
              <TableRow key={IdRecurso} style={{ height: "40px" }}>
                <TableCell style={{ width: "40px", padding:"0 0 0 15px"}}>
                  {" "}
                  <img
                    src={recurso.imagenURL}
                    alt={`Imagen de ${recurso.nombre}`}
                    style={{ width: "50px", height: "40px", padding:"0", }}
                  />
                </TableCell>
                <TableCell>{recurso.idRecurso}</TableCell>
                <TableCell style={{ width: "250px"}}>{recurso.nombre}</TableCell>
                <TableCell style={{ width: "120px"}}>
                  {obtenerNombreCategoriaPorId(
                    recurso.categoria_id,
                    productosBKLista
                  )}
                </TableCell>
                <TableCell style={{ width: "450px"}}>{recurso.descripción}</TableCell>
                <TableCell style={{ width: "70px"}}>{recurso.precioUnitario}</TableCell>
                <TableCell>{recurso.estadoRecurso}</TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    gap: "1rem",
                    width: "50px",
                    aligItems: "center",
                    textAlign: "center",
                    padding: "10px 0 10px 0",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "#9dd6b3",
                    }}
                    size="md"
                    variant="soft"
                    color="primary"
                    endDecorator={<EditIcon />}
                  ></Button>
                </TableCell>

                <TableCell>
                  <Chip
                    color="danger"
                    size="lg"
                    variant="solid"
                    startDecorator={<DeleteOutlinedIcon />}
                    onClick={(e) => handleClick(e, recurso.idRecurso)}
                  ></Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70]}
        component="div"
        count={productosBKLista.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TablaProductos;
