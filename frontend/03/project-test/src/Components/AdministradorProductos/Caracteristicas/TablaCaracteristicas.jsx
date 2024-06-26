import React, { useState, useEffect, useContext } from "react";
import { ContextGlobal } from "../../utils/global.context";
import axios from "axios";
import "./TablaCaracteristicas.css";
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
import { Link } from "react-router-dom";
import Edit from "@mui/icons-material/Edit";

const TablaCaracteristicas = () => {
  const {
    caracteristicasLista,
    setCaracteristicasLista,
    getCaracteristicasLista,
  } = useContext(ContextGlobal);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({
    logoCaracteristica: null,
    nombre: "",
    idCaracteristica: 0,
  });

  const handleOpenEditDialog = (item) => {
    setEditedItem(item);
    setEditDialogOpen(true);
  };

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

    setNombreCaracteristicaValida(true);
  };
  const onChangeLogoCaracteristica = (e) => {
    setNuevaCaracteristica({
      ...nuevaCaracteristica,
      logoCaracteristica: e.target.value,
    });

    setNombreCaracteristicaValida(true);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGuardarEdicion = async (e) => {
    e.preventDefault();
    const nombreCaracteristicaValida = validarNombreCaracteristicas(
      editedItem.nombre
    );
  
    const caracteristicaExisteEnData = nombreExiste(
      editedItem.nombre,
      jsonDataCaracteristicas
    );
  
    if (nombreCaracteristicaValida && !caracteristicaExisteEnData) {
      setNombreCaracteristicaValida(true);
  
      const editedItemData = {
        nombre: editedItem.nombre,
        logoCaracteristica: editedItem.logoCaracteristica,
        idCaracteristica: editedItem.idCaracteristica,
      };
  
      const urlBaseEditar = "http://52.32.210.155:8080/auth/caracteristicas/update";
  
      try {
        const jsonDataEdicion = JSON.stringify(editedItemData);
        const response = await axios.post(urlBaseEditar, jsonDataEdicion, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const responseData = await response.data;
          console.log("Respuesta:", responseData);
          console.log(" handleClose();:");

          handleClose();
          getCaracteristicasLista();
          setEditDialogOpen(false); 
        
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
     
    }
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
        logoCaracteristica: nuevaCaracteristica.logoCaracteristica,
        idCaracteristica: 0,
      };

      const urlBaseGuardar =
        "http://52.32.210.155:8080/auth/caracteristicas/save";

      // const token = localStorage.getItem("token");
      // console.log("token previo a agregar caracteristicas", token);

      // try {
      //   const response = await fetch(urlBaseGuardar, {
      //     method: "POST",
      //     url: urlBaseGuardar,
      //     headers: {
      //       "Content-Type": "application/json",

      //       Authorization: `Bearer "${token}"`,
      //     },
      //     body: JSON.stringify(nuevaCaracteristicaData),
      //   });

      try {
        const jsonData = JSON.stringify(nuevaCaracteristicaData);
        const response = await axios.post(urlBaseGuardar, jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Respuesta:", responseData);
          getCaracteristicasLista();
          handleClose();
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

      // try {
      //   // const jsonData = JSON.stringify(nuevaCaracteristicaData);
      //   const response = await axios.post(urlBaseGuardar, nuevaCaracteristicaData, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });

      //   console.log("Respuesta:", response.data);
      //   getCaracteristicasLista();
      //   handleClose();
      // } catch (error) {
      //   console.error("Error:", error);
      // }
      useEffect(() => {
        if (form) {
          getCaracteristicasLista(); // Actualiza el estado jsonData después de enviar la petición POST
        }
      }, [form]);

      setOpen(false);
      /////ERROR ????////////////////////////
    } else {
      setForm(false);
      setNombreCaracteristicaValida(false);

      setNuevaCaracteristica({
        nombre: "",
        logoCaracteristica: null,
        idCaracteristica: 0,
      });
      /////////////// VER ERROR ///////
    }
    handleClose
  };
  ///////////////////Eliminar Caracteristica

  const eliminarCaracteristica = async (idCaracteristica) => {
    try {
      const response = await axios.post(
        `http://52.32.210.155:8080/auth/caracteristicas/delete/${idCaracteristica}`,
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

  // const handleGuardarEdicion  = async (e) => {
  //   e.preventDefault();
  //   const nombreCaracteristicaValida = validarNombreCaracteristicas(
  //     editedItem.nombre
  //   );
  //   console.log("nombreCaracteristicaValida" ,nombreCaracteristicaValida)

  //   const caracteristicaExisteEnData = nombreExiste(
  //     editedItem.nombre,
  //     jsonDataCaracteristicas
  //   );
  //   console.log("caracteristicaExisteEnData" ,caracteristicaExisteEnData)

  //   if (nombreCaracteristicaValida && !caracteristicaExisteEnData) {
   
  //     setNombreCaracteristicaValida(true);
  //     // setShowPreview(true);

  //     const editedItem = {
  //       nombre: editedItem.nombre,
  //       logoCaracteristica: editedItem.logoCaracteristica,
  //       idCaracteristica: 0,
  //     };

  //     console.log("editedItem ---------------- >" ,editedItem)

  //     const urlBaseEditar =
  //     "http://52.32.210.155:8080/auth/caracteristicas/update";
  //   // Realiza las acciones para guardar los cambios en editedItem
  //   // Puedes enviar una solicitud al servidor aquí si es necesario

  
 
  //   try {
  //     const jsonDataEdicion = JSON.stringify(editedItem);
  //     console.log("jsonDataEdicion ---------------- >" ,jsonDataEdicion)

  //     const response = await axios.post(urlBaseEditar, jsonDataEdicion, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       const responseData = await response.data;
  //       console.log("Respuesta:", responseData);
  //       getCaracteristicasLista();
        
  //     } else {
  //       console.error(
  //         "Error en la respuesta:",
  //         response.status,
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }






  // // Cierra el diálogo de edición
  //   setEditDialogOpen(false);
  // };
  // }
  //////////////////////////////

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
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Crear Característica
        </Button> */}
      </div>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Editar Característica</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="edit-imagen"
            label="Imagen"
            type="text"
            fullWidth
            value={editedItem.logoCaracteristica}
            onChange={(e) =>
              setEditedItem({ ...editedItem, logoCaracteristica: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="edit-nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={editedItem.nombre}
            onChange={(e) =>
              setEditedItem({ ...editedItem, nombre: e.target.value })
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
                <TableCell>Imagen</TableCell>
                <TableCell>Id Caracteristica</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {caracteristicasLista.map((caracteristica, idCaracteristica) => (
                <TableRow key={idCaracteristica} style={{ height: "30px" }}>
                  <TableCell style={{ width: "200px" }}>
                    {" "}
                    <img
                      src={caracteristica.logoCaracteristica}
                      alt={`Imagen de ${caracteristica.nombre}`}
                      style={{
                        width: "60px",
                        height: "50px",
                        padding: "2px 0 0 0px",
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: "400px" }}>
                    {caracteristica.idCaracteristica}
                  </TableCell>
                  <TableCell style={{ width: "800px" }}>
                    {caracteristica.nombre}
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
                      onClick={() => handleOpenEditDialog(caracteristica)}
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

          {!nombreCaracteristicaValida ? (
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
            value={nuevaCaracteristica.logoCaracteristica}
            onChange={onChangeLogoCaracteristica}
            fullWidth
            variant="standard"
          />

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
      <Button variant="outlined" onClick={handleClickOpen}>
        + Crear Característica
      </Button>
    </div>
  );
};

export default TablaCaracteristicas;
