import React from "react";
import "./TablaCaracteristicas.css";
import { ContextGlobal } from "../../utils/global.context";

import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/joy/Chip";
import Paper from "@mui/material/Paper";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableHead,
  TableCell,
  //   Chip,
} from "@mui/material";

import { Collapse, Container } from "@mui/material";
import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { alignProperty } from "@mui/material/styles/cssUtils";

function nombreExiste(nombre, data) {
  return data.find((objeto) => objeto.nombre === nombre) !== undefined;
}

const TablaCaracteristicas = () => {
  const {
    caracteristicasLista,
    setCaracteristicasLista,
    getCaracteristicasLista,
  } = useContext(ContextGlobal);

  const [caracteristicaXEliminar, setCaracteristicaXEliminar] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [idCaracteristicaXBorrar, setIdCaracteristicaXBorrar] = useState(null);

  useEffect(() => {
    getCaracteristicasLista();
  }, []);

  /////////// Asigna valor lista a una 2da para comparar sin afectar
  const jsonDataCaracteristicas = caracteristicasLista;

  ////// Datos para envio Form
  const [form, setForm] = useState(false);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState({
    nombre: "",
    logoCaracteristica: null,
    idCaracteristica: 0,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  ////// Validaciones
  const validarNombreCaracteristicas = (n) => {
    const regex = /^[A-Za-z\s]{4,40}$/;
    return regex.test(n);
  };

  const [nombreCaracteristicaValida, setNombreCaracteristicaValida] =
    useState(true);

  const onChangeNombre = (e) => {
    setNuevaCaracteristica({ ...nuevaCaracteristica, nombre: e.target.value });
    // setNombreYaExiste(false);
    setNombreCaracteristicaValida(true);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitCrearCaracteristica = async (e) => {
    e.preventDefault();

    const nombreCaracteristicaValida = validarNombreCaracteristicas(
      nuevaCaracteristica.nombre
    );
    const caracteristicaExisteEnData = nombreExiste(
      nuevaCaracteristica.nombre,
      jsonDataCaracteristicas
    );

    if (nombreCaracteristicaValida && !caracteristicaExisteEnData) {
      setForm(true);
      setNombreCaracteristicaValida(true);
      // setShowPreview(true);

      const nuevaCaracteristicaData = {
        nombre: nuevaCaracteristica.nombre,
        logoCaracteristica: "",
        idCaracteristica: 0,
      };

      const urlBaseGuardar =
        "http://52.32.210.155:8080/api/v1/caracteristicas/save";

      try {
        const jsonData = JSON.stringify(nuevaCaracteristicaData);
        const response = await axios.put(urlBaseGuardar, jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Respuesta:", response.data);
        getCaracteristicasLista();
        handleClose();
      } catch (error) {
        console.error("Error:", error);
      }
      useEffect(() => {
        if (form) {
          getCaracteristicasLista(); // Actualiza el estado jsonData después de enviar la petición POST
        }
      }, [form]);

      setOpen(false);
      /////ERROR ????////////////////////////
    } else {
      setForm(true);
      setNombreCaracteristicaValida(true);

      setNuevaCaracteristica({
        nombre: "",
        logoCaracteristica: null,
        idCaracteristica: 0,
      });
      /////////////// VER ERROR ///////
    }
  };
  ///////////////////Eliminar Caracteristica

  const eliminarCaracteristica = async (idCaracteristica) => {
    try {
      const response = await axios.delete(
        `http://52.32.210.155:8080/api/v1/caracteristicas/delete/${idCaracteristica}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const updatedCaracteristicas = caracteristicasLista.filter(
        (caracteristicasListaXId) =>
          caracteristicasListaXId.idCaracteristica !== idCaracteristica
      );
      setCaracteristicasLista(updatedCaracteristicas);
    } catch (error) {
      console.error("Error al eliminar caracteristicas:", error);
    }
  };

  const handleClickEliminar = (e, idCaracteristica) => {
    setIdCaracteristicaXBorrar(idCaracteristica);
    setOpenDialog(true);
  };

  ////////////////////////////

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="lista-caracteristicas"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" onClick={handleClickOpen}>
          Crear Característica
        </Button>
      </div>
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
              eliminarCaracteristica(idCaracteristicaXBorrar);
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
          sx={{ maxHeight: 400 }}
          style={{
            borderRadius: ":var(--bRadiusButton)",
            padding: "10px",
            width: "1000px",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            {/* <div className="encabezado-tabla"> */}
            <TableHead>
              {/* <thead> */}

              <TableRow
                style={{
                  backgroundColor: "lightgray",
                  borderRadius: ":var(--bRadiusButton)",
                  // padding: "10px",
                  width: "100%",
                }}
              >
                <TableCell>Imagen</TableCell>
                <TableCell>Id Caracteristica</TableCell>
                <TableCell>Nombre</TableCell>
                {/* <TableCell>Editar</TableCell> */}
                <TableCell>Eliminar</TableCell>
              </TableRow>

              {/* </thead> */}
            </TableHead>
            {/* </div> */}
            <TableBody>
              {/* <tbody> */}

              {caracteristicasLista.map((caracteristica, idCaracteristica) => (
                <TableRow key={idCaracteristica} style={{ height: "30px" }}>
                  <TableCell style={{ width: "100px" }}>
                    {" "}
                    {/*  <img
                        src={recurso.imagenURL}
                        alt={`Imagen de ${recurso.nombre}`}
                        style={{
                          width: "60px",
                          height: "50px",
                          padding: "2px 0 0 0px",
                        }}
                      /> */}
                    {caracteristica.logoCaracteristica}
                  </TableCell>
                  <TableCell style={{ width: "150px" }}>
                    {caracteristica.idCaracteristica}
                  </TableCell>
                  <TableCell style={{ width: "400px" }}>
                    {caracteristica.nombre}
                  </TableCell>

                  <TableCell>
                    <Chip
                      color="danger"
                      size="lg"
                      variant="solid"
                      startDecorator={<DeleteForeverIcon />}
                      onClick={(e) =>
                        handleClickEliminar(e, caracteristica.idCaracteristica)
                      }
                    ></Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Característica</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, complete los datos para crear una nueva Característica.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre Categoria"
            type="text"
            value={nuevaCaracteristica.nombre}
            onChange={onChangeNombre}
            fullWidth
            variant="standard"
          />
          {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Descripción"
              type="text"
              value={nuevaCaracteristica.description}
              onChange={onChangeDescription}
              fullWidth
              variant="standard"
            /> */}

          {/* <TextField
              autoFocus
              margin="dense"
              type="file"
              accept="image/*"
              label="Imagen Categoria"
              value={nuevaCaracteristica.icono}
              onChange={handleImageChange}
              fullWidth
              variant="standard"
            />
            {selectedImage && (
              <Card>
                <CardMedia
                  component="img"
                  alt="Selected"
                  height="150"
                  image={selectedImage}
                />
              </Card> */}
          {/* )} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmitCrearCaracteristica}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TablaCaracteristicas;
