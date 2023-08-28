import React, { useState, useEffect, useContext } from "react";
import buscadorIconoCategoria from "../Categorias/iconoXCategoria.js";
import "./TablaCategorias.css";
import { ContextGlobal } from "../../utils/global.context";
import {
  Button,
  Paper,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableHead,
  TableCell,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Chip from "@mui/joy/Chip";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import nombreExiste from "../../utils/nombreExiste.js";



const TablaCategorias = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [idCategoriaXBorrar, setIdCategoriaXBorrar] = useState(null);

  const { categoriasLista, setCategoriasLista, getCategoriasLista } =
    useContext(ContextGlobal);

  ///////Escucha si se actualiza la lista y comprobamos que actualiza
  useEffect(() => {
    getCategoriasLista();
  }, []);
  //////////////

  /////////// Asigna valor lista a una 2da para comparar sin afectar
  const jsonData = categoriasLista;

  ////// Datos para envio Form
  const [form, setForm] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    categoria_id: 0,
    name: "",
    description: "",
    icono_Categoria: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  //// State Para Validaciones
  // const [nombreYaExiste, setNombreYaExiste] = useState(false);

  const validarNombreCategoria = (n) => {
    const regex = /^[A-Za-z\s]{4,40}$/;
    return regex.test(n);
  };

  const [nombreCategoriaValida, setNombreCategoriaValida] = useState(true);

  const onChangeNombre = (e) => {
    setNuevaCategoria({ ...nuevaCategoria, name: e.target.value });
    // setNombreYaExiste(false);
    setNombreCategoriaValida(true);
  };

  const onChangeDescription = (e) => {
    setNuevaCategoria({ ...nuevaCategoria, description: e.target.value });
  };

  const onChangeIconoCat = (e) => {
    setNuevaCategoria({ ...nuevaCategoria, icono_Categoria: e.target.value });
  };

  ////////// Modal Form
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /////////////////////////////////////////

  ////////////////////////////////////////////

  const handleSubmitCrearCategoria = async (e) => {
    e.preventDefault();

    const nombreCategoriaValida = validarNombreCategoria(nuevaCategoria.name);
    console.log(jsonData);
    const categoriaExisteEnData = nombreExiste(nuevaCategoria.name, jsonData);
    if (nombreCategoriaValida && !categoriaExisteEnData) {
      setForm(true);
      setNombreCategoriaValida(true);
      // setShowPreview(true);
      // console.log(form);

      const nuevaCategoriaData = {
        categoria_id: 0,
        name: nuevaCategoria.name,
        description: nuevaCategoria.description,
        icono_Categoria: nuevaCategoria.icono_Categoria,
      };

      console.log(
        "------------------Info paquete enviado en nuevoProductoData ------------------"
      );
      console.log(nuevaCategoriaData);

      // enviarDatos
      const urlBaseGuardar = "http://52.32.210.155:8080/api/v1/categorias/save";

      try {
        const jsonData = JSON.stringify(nuevaCategoriaData);
        const response = await axios.post(urlBaseGuardar, jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Respuesta:", response.data);
        getCategoriasLista();
        handleClose();
      } catch (error) {
        console.error("Error:", error);
      }
      useEffect(() => {
        if (form) {
          getCategoriasLista(); // Actualiza el estado jsonData después de enviar la petición POST
        }
      }, [form]);

      console.log(
        "Muestra el valor de toda la Lista actualizada despues del Post"
      );
      console.log(categoriasLista);
      setOpen(false);
      /////ERROR ????////////////////////////
    } else {
      setForm(false);
      setNombreCategoriaValida(false);

      setNuevaCategoria({
        categoria_id: 0,
        name: "",
        description: "",
        icono_Categoria: "",
      });
      /////////////// VER ERROR ///////
    }
  };
  ///////////////////Eliminar Categoria

  const eliminarCategoria = async (categoria_id) => {
    try {
      const response = await axios.get(
        `http://52.32.210.155:8080/api/v1/categorias/delete/${categoria_id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      
      const updatedCategorias = categoriasLista.filter(
        (categoriasListaXId) => categoriasListaXId.categoria_id !== categoria_id
      );
      setCategoriasLista(updatedCategorias);
    } catch (error) {
      console.error("Error al eliminar caracteristicas:", error);
    }
  };

  const handleClickEliminar = (e, categoria_id) => {
    setIdCategoriaXBorrar(categoria_id);
    setOpenDialog(true);
  };

  ///////////////////////////////////////
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
      
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar esta categoría?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              eliminarCategoria(idCategoriaXBorrar);
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
            width: "1400px",
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
                <TableCell>Ícono categoría</TableCell>
                <TableCell>Id categoría</TableCell>
                <TableCell>Nombre categoría</TableCell>
                <TableCell>Descripción</TableCell>
                {/* <TableCell>Editar</TableCell> */}
                <TableCell>Eliminar</TableCell>
              </TableRow>

              {/* </thead> */}
            </TableHead>
            {/* </div> */}
            <TableBody>
              {/* <tbody> */}

              {categoriasLista.map((categoria, categoria_id) => (
                <TableRow key={categoria_id} style={{ height: "30px" }}>
                  <TableCell style={{ width: "200px" }}>
                    {" "}
                    <img
                      src={buscadorIconoCategoria(categoria.categoria_id)}
                      alt={`Imagen de ${categoria.name}`}
                      style={{
                        width: "60px",
                        height: "50px",
                        padding: "2px 0 0 0px",
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: "100px" }}>
                    {categoria.categoria_id}
                  </TableCell>
                  <TableCell style={{ width: "200px" }}>
                    {categoria.name}
                  </TableCell>
                  <TableCell style={{ width: "1000px" }}>
                    {categoria.description}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="danger"
                      size="lg"
                      variant="solid"
                      startDecorator={<DeleteForeverIcon />}
                      onClick={(e) =>
                        {handleClickEliminar(e, categoria.categoria_id)
                        console.log(categoria.categoria_id)}}
                    ></Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, complete los datos para crear una nueva Categoría.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre Categoria"
            type="text"
            value={nuevaCategoria.name}
            onChange={onChangeNombre}
            fullWidth
            variant="standard"
          />
   {!nombreCategoriaValida ? (
                  <p className="error-form-inicio">
                    Por favor, ingrese un nombre válido.
                  </p>
                ) : (
                  ""
                )}

          <TextField
            autoFocus
            margin="dense"
            id="IconoCaracterística"
            label="Icono Característica"
            type="text"
            value={nuevaCategoria.icono_Categoria}
            onChange={onChangeIconoCat}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmitCrearCategoria}>Guardar</Button>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" onClick={handleClickOpen}>
          Crear Categoría
        </Button>
    </div>
  );
};

export default TablaCategorias;
