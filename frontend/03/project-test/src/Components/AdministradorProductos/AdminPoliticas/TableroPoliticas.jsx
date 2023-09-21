import React, { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../../utils/global.context";
import axios from "axios";
import {
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableHead,
  TableCell,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ButtonBase,
} from "@mui/material";
import Chip from "@mui/joy/Chip";
import Button from "@mui/joy/Chip";
import EditIcon from "@mui/icons-material/Edit";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import nombreExiste from "../../utils/nombreExiste.js";

const TableroPoliticas = () => {
  const { politicas, setPoliticas, getPoliticas } = useContext(ContextGlobal);
  const [editedItem, setEditedItem] = useState({
    politica_uso_conducta: "",
    politica_cambio_fecha: "",
    politica_cancelacion: "",
    idRecurso: 0,
    idPoliticas: 0,
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [idPoliticaXBorrar, setIdPoliticaXBorrar] = useState(null);

  // const editedItemData = {
  //   politica_uso_conducta: editedItem.politica_uso_conducta,
  //   politica_cambio_fecha: editedItem.politica_cambio_fecha,
  //   politica_cancelacion: editedItem.politica_cancelacion,
  //   idRecurso: editedItem.idRecurso,
  //   idPolitica: editedItem.idPolitica,
  // };

  const handleOpenEditDialog = (item) => {
    setEditedItem({
      ...item,
      idPoliticas: item.idPoliticas,
    });
    setEditDialogOpen(true);
  };
  useEffect(() => {
    getPoliticas();
  }, []);

  console.log(politicas);
  //////////////////////////////////////Crear Politica

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  ////// Datos para envio Form
  const [form, setForm] = useState(false);
  const [nuevaPolitica, setNuevaPolitica] = useState({
    politica_uso_conducta: "",
    politica_cambio_fecha: "",
    politica_cancelacion: "",
    idRecurso: 0,
    idPoliticas: 0,
  });

  ////// Validaciones
  // const validarNombreCaracteristicas = (n) => {
  //   const regex = /^[A-Za-z\s]{4,40}$/;
  //   return regex.test(n);
  // };

  ////////////////////////Manejo del evento Crear//////////
  const handleSubmitCrearPolitica = async (e) => {
    e.preventDefault();

    // const nombreCaracteristicaValida = validarNombreCaracteristicas(
    //   nuevaPolitica.nombre
    // );
    // const caracteristicaExisteEnData = nombreExiste(
    //   nuevaPolitica.nombre,
    //   jsonDataCaracteristicas
    // );

    if (
      nuevaPolitica.politica_uso_conducta ||
      nuevaPolitica.politica_cambio_fecha ||
      nuevaPolitica.politica_cancelacion
    ) {
      setForm(true);
      // setNombreCaracteristicaValida(true);
      // setShowPreview(true);

      const nuevaPoliticaData = {
        politica_uso_conducta: nuevaPolitica.politica_uso_conducta,
        politica_cambio_fecha: nuevaPolitica.politica_cambio_fecha,
        politica_cancelacion: nuevaPolitica.politica_cancelacion,
        idRecurso: parseInt(nuevaPolitica.idRecurso),
        idPoliticas: parseInt(nuevaPolitica.idRecurso),
      };


      try {
        const urlBaseGuardar = "http://52.32.210.155:8080/auth/politicas/save";
        const jsonDataPoliticas = JSON.stringify(nuevaPoliticaData);
        console.log("jsonDataReserva", jsonDataPoliticas);
        console.log("nuevaPoliticaData", nuevaPoliticaData);
        const response = await fetch(urlBaseGuardar, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonDataPoliticas,
        });

        console.log(response);
        if (response.ok) {
          const responseData = await response.json();
          console.log("Respuesta:", responseData);
          setForm(true);
          getPoliticas();
          handleClose();
        } else {
          console.error(
            "Error en la respuesta:",
            response.status,
            response.statusText
          );
          setForm(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }

      // }
      useEffect(() => {
        if (form) {
          getPoliticas(); // Actualiza el estado jsonData después de enviar la petición POST
        }
      }, [form]);

      setOpen(false);
      /////ERROR ????////////////////////////
    } else {
      setForm(false);
      setNombreCaracteristicaValida(false);

      setNuevaPolitica({
        nombre: "",
        logoCaracteristica: null,
        idCaracteristica: 0,
      });
      /////////////// VER ERROR ///////
    }
  };

  //////////////////////ELIMINAR Politica

  const eliminarPolitica = async (idPolitica) => {
    try {
      const response = await axios.post(
        `http://52.32.210.155:8080/auth/politicas/delete/${idPolitica}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const updatedPolitica = politicas.filter(
        (politica) => politica.idPoliticas !== idPolitica
      );
      setPoliticas(updatedPolitica);
      getPoliticas();
    } catch (error) {
      console.error("Error al eliminar la política:", error);
    }
  };

  const handleClickEliminar = (e, idPolitica) => {
    setIdPoliticaXBorrar(idPolitica);
    setOpenDialog(true);
  };

  ////// Validaciones
  // const validarTextoPoliticas = (n) => {
  //   const regex = /^[A-Za-z\s]{50,5000}$/;
  //   return regex.test(n);
  // };

  const [politicasValida, setPoliticasValida] = useState(true);

  const handleGuardarEdicion = async (e) => {
    e.preventDefault();
    console.log(">>>>>>>>>>>handleGuardarEdicion");
    // const politica_uso_conductaValida = validarTextoPoliticas(
    //   editedItem.politica_uso_conducta
    // );
    // const politica_cambio_fechaValida = validarTextoPoliticas(
    //   editedItem.politica_cambio_fecha
    // );
    // const politica_cancelacionValida = validarTextoPoliticas(
    //   editedItem.politica_cancelacion
    // );

    if (
      editedItem.politica_uso_conducta &&
      editedItem.politica_cambio_fecha &&
      editedItem.politica_cancelacion
    ) {
      setPoliticasValida(true);

      const urlUpdatePoliticas =
        "http://52.32.210.155:8080/auth/politicas/update";

      const editedItemData = {
        politica_uso_conducta: editedItem.politica_uso_conducta,
        politica_cambio_fecha: editedItem.politica_cambio_fecha,
        politica_cancelacion: editedItem.politica_cancelacion,
        idRecurso: editedItem.idRecurso,
        idPoliticas: editedItem.idRecurso,
      };
      console.log("editedItemData", editedItemData);

      try {
        const jsonDataEdicion = JSON.stringify(editedItemData);
        const response = await axios.post(urlUpdatePoliticas, jsonDataEdicion, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(
          "urlUpdatePoliticas: ",
          urlUpdatePoliticas,
          " --- ",
          "jsonDataEdicion",
          jsonDataEdicion
        );

        if (response.status === 200) {
          const responseData = await response.data;
          console.log("Respuesta:", responseData);
          getPoliticas();
        } else {
          console.error(
            "Error en la respuesta:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }

      // Cierra el diálogo de edición
      setEditDialogOpen(false);
    }
  };

  /////////////////////////////

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="lista-caracteristicas"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></div>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Editar Política</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="politica_uso_conducta"
            label="Política de uso y conducta"
            multiline
            rows={3}
            variant="standard"
            type="text"
            fullWidth
            value={editedItem.politica_uso_conducta}
            onChange={(e) =>
              setEditedItem({
                ...editedItem,
                politica_uso_conducta: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="normal"
            id="politica_cambio_fecha"
            label="Política cambio de fecha"
            multiline
            rows={3}
            variant="standard"
            type="text"
            fullWidth
            value={editedItem.politica_cambio_fecha}
            onChange={(e) =>
              setEditedItem({
                ...editedItem,
                politica_cambio_fecha: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="normal"
            id="politica_cancelacion"
            label="Política de cancelación"
            multiline
            rows={3}
            variant="standard"
            type="text"
            fullWidth
            value={editedItem.politica_cancelacion}
            onChange={(e) =>
              setEditedItem({
                ...editedItem,
                politica_cancelacion: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleGuardarEdicion}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar esta Característica?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              eliminarPolitica(idPoliticaXBorrar);
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
        <TableContainer
          sx={{ maxHeight: 500, width: "100%" }}
          style={{
            borderRadius: ":var(--bRadiusButton)",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: "lightgray",
                  borderRadius: ":var(--bRadiusButton)",
                  // padding: "10px",
                  width: "100%",
                }}
              >
                <TableCell>IdRecurso</TableCell>
                <TableCell>idPoliticas</TableCell>
                <TableCell>Política de cambio de fecha</TableCell>
                <TableCell>Política de cancelación</TableCell>
                <TableCell>Política de uso y conducta</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {politicas.map((politicas, idPoliticas) => (
                <TableRow key={idPoliticas} style={{ height: "30px" }}>
                  <TableCell style={{ width: "110px" }}>
                    {politicas.idRecurso}
                  </TableCell>
                  <TableCell style={{ width: "110px" }}>
                    {politicas.idPoliticas}
                  </TableCell>
                  <TableCell style={{ width: "400px" }}>
                    {politicas.politica_cambio_fecha}
                  </TableCell>
                  <TableCell style={{ width: "400px" }}>
                    {politicas.politica_cancelacion}
                  </TableCell>
                  <TableCell style={{ width: "400px" }}>
                    {politicas.politica_uso_conducta}
                  </TableCell>

                  <TableCell>
                    <Button
                      style={{
                        backgroundColor: "#9dd6b3",
                      }}
                      size="md"
                      variant="soft"
                      color="primary"
                      endDecorator={<EditIcon />}
                      onClick={() => handleOpenEditDialog(politicas)}
                    >
                      {" "}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Chip
                      color="danger"
                      size="lg"
                      variant="solid"
                      startDecorator={<DeleteForeverIcon />}
                      onClick={(e) =>
                        handleClickEliminar(e, politicas.idPoliticas)
                      }
                    ></Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button variant="outlined" onClick={handleClickOpen}>
        + Crear Política
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Característica</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, complete los datos para crear una nueva Política.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Indica el id del Recurso"
            type="number"
            value={nuevaPolitica.idRecurso}
            onChange={(e) =>
              setNuevaPolitica({
                ...nuevaPolitica,
                idRecurso: e.target.value,
              })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="normal"
            id="politica_uso_conducta"
            label="Política de uso y conducta"
            multiline
            rows={3}
            variant="standard"
            type="text"
            fullWidth
            value={nuevaPolitica.politica_uso_conducta}
            onChange={(e) =>
              setNuevaPolitica({
                ...nuevaPolitica,
                politica_uso_conducta: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="normal"
            id="politica_cambio_fecha"
            label="Política cambio de fecha"
            multiline
            rows={3}
            variant="standard"
            type="text"
            fullWidth
            value={nuevaPolitica.politica_cambio_fecha}
            onChange={(e) =>
              setNuevaPolitica({
                ...nuevaPolitica,
                politica_cambio_fecha: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="normal"
            id="politica_cancelacion"
            label="Política de cancelación"
            multiline
            rows={3}
            variant="standard"
            type="text"
            fullWidth
            value={nuevaPolitica.politica_cancelacion}
            onChange={(e) =>
              setNuevaPolitica({
                ...nuevaPolitica,
                politica_cancelacion: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmitCrearPolitica}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableroPoliticas;
