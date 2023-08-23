import React from "react";
import "./TablaCaracteristicas.css";
import { ContextGlobal } from "../../utils/global.context";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
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
import { Collapse, Container } from "@mui/material";
import axios from "axios";

import { useState, useEffect, useContext } from "react";

function nombreExiste(nombre, data) {
  return data.find((objeto) => objeto.nombre === nombre) !== undefined;
}

const TablaCaracteristicas = () => {
  const urlBaseGuardar =
    "http://52.32.210.155:8080/api/v1/caracteristicas/save";
  // const urlBaseEliminar = "http://52.32.210.155:8080/api/v1/categorias/delete/";
  // const urlBaseListar = "http://52.32.210.155:8080/api/v1/categorias/list";

  const { caracteristicasLista, getCaracteristicasLista } =
    useContext(ContextGlobal);
  // console.log("Listado Caracteristicas en Tabla Caracteristicas");
  // console.log(caracteristicasLista);

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
      // console.log(form);

      const nuevaCaracteristicaData = {
        nombre: nuevaCaracteristica.nombre,
        logoCaracteristica: "",
        idCaracteristica: 0,
      };

      console.log(
        "------------------Info paquete enviado en nuevaNuevaCaracteristica ------------------"
      );
      console.log(nuevaCaracteristica);

      // enviarDatos

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

      console.log(
        "Muestra el valor de toda la Lista actualizada despues del Post"
      );
      console.log(caracteristicasLista);
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

  return (
    <div>
      <div>TablaCaracteristicas</div>
      <Container>
        <div className="tabla-caracteristicas">
          <div
            className="lista-caracteristicas"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {caracteristicasLista.map((caracteristica, id) => (
              <Card
                key={caracteristica.idCaracteristica}
                style={{ width: "250px", height: "70", margin: "30px" }}
              >
                {/* <CardMedia */}
                {/* sx={{ height: "100" }} */}
                {/* image="/static/images/cards/contemplative-reptile.jpg" */}
                {/* title="green iguana" */}
                {/* ></CardMedia> */}
                <CardContent overflow="auto">
                  <Typography
                    variant="h7"
                    component="div"
                    textOverflow="ellipsis"
                  >
                    {caracteristica.nombre}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <DeleteForeverIcon  /* onClick={handleClickEliminar} *//>
                  </IconButton>
                </CardActions>
              </Card>
            ))}

            <Button variant="outlined" onClick={handleClickOpen}>
              Crear Característica
            </Button>
          </div>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Crear Característica</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Por favor, complete los datos para crear una nueva
                Característica.
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
      </Container>
    </div>
  );
};

export default TablaCaracteristicas;
