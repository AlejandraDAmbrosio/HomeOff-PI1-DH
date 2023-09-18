import React, { useState, useEffect, useContext } from "react";
import { ContextGlobal } from "../../utils/global.context";
import "./TablaProductos.css";
import { Link } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Chip from "@mui/joy/Chip";
import Button from "@mui/joy/Chip";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TablePagination,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableHead,
  TableCell,
} from "@mui/material";

function obtenerNombreCategoriaPorId(idCategoria, data, listaCategorias) {
  const categoriaEncontrada = listaCategorias.find(
    (item) => item.categoria_id === idCategoria
  );
  if (categoriaEncontrada) {
    return categoriaEncontrada.name;
  } else {
    return "Categoría no encontrada";
  }
}

const TablaProductos = () => {
  ///Traer datos de Base mediante UseContext
  const {
    productosBKLista,
    setProductosBKLista,
    categoriasLista,
    getCategoriasLista,
    getDatosBKLista,
  } = useContext(ContextGlobal);

  const tokenUser = localStorage.getItem("token");

  useEffect(() => {
    getCategoriasLista();
  }, []);

  /////////////// Metodo Eliminar Producto
  const [openDialog, setOpenDialog] = useState(false);
  const [idRecursoToDelete, setIdRecursoToDelete] = useState(null);
  // console.log("-------------- > tokenUser", tokenUser);

  // const headers={}

  const eliminarRecurso = async (idRecurso) => {
    try {
      const response = await axios.delete(
        `http://44.231.66.124:8080/auth/recurso/delete/${idRecurso}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedRecursos = productosBKLista.filter(
        (productoXId) => productoXId.idRecurso !== idRecurso
      );
      setProductosBKLista(updatedRecursos);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleClick = (e, idRecurso) => {
    setIdRecursoToDelete(idRecurso);
    setOpenDialog(true);
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
    <div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar este producto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              eliminarRecurso(idRecursoToDelete);
              setOpenDialog(false);
            }}
            color="primary"
          >
            Confirmar
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Paper
        sx={{ width: "100%", overflow: "hidden" }}
        style={{ margin: "0 20px 0 0" }}
      >
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
                <TableCell>Categoría</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Características</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productosBKLista.map((recurso, IdRecurso) => (
                <TableRow key={IdRecurso} style={{ height: "30px" }}>
                  <TableCell style={{ width: "30px", padding: "0 0 0 15px" }}>
                    {" "}
                    <img
                      src={recurso.imagenURL}
                      alt={`Imagen de ${recurso.nombre}`}
                      style={{
                        width: "60px",
                        height: "50px",
                        padding: "2px 0 0 0px",
                      }}
                    />
                  </TableCell>
                  <TableCell>{recurso.idRecurso}</TableCell>
                  <TableCell style={{ width: "160px" }}>
                    {recurso.nombre}
                  </TableCell>
                  <TableCell style={{ width: "120px" }}>
                    {obtenerNombreCategoriaPorId(
                      recurso.categoria_id,
                      productosBKLista,
                      categoriasLista
                    )}
                  </TableCell>
                  <TableCell style={{ width: "300px" }}>
                    <div
                      style={{
                        maxWidth: "260px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {recurso.descripción}
                    </div>
                  </TableCell>
                  <TableCell style={{ width: "70px" }}>
                    {recurso.precioUnitario}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/agregarCaracteristicas/${recurso.idRecurso}`}
                      key={recurso.idRecurso}
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
                    </Link>
                  </TableCell>
                 
                 
                  <TableCell><Link
                      to={`/editarproducto/${recurso.idRecurso}`}
                      key={recurso.idRecurso}
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
                    </Link>
                    </TableCell>
                  {/* <TableCell>{recurso.estadoRecurso}</TableCell> */}
                 

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
    </div>
  );
};

export default TablaProductos;
