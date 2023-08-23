import React from "react";
import "./TablaCategorias.css";
import { ContextGlobal } from "../../utils/global.context";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import BotonAgregarCategorias from "./BotonAgregarCategorias";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { Collapse, Container } from "@mui/material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

function nombreExiste(nombre, data) {
  return data.find((objeto) => objeto.nombre === nombre) !== undefined;
}

const TablaCategorias = () => {
  //// Traer base
  const urlBaseGuardar = "http://52.32.210.155:8080/api/v1/categorias/save";
  const urlBaseEliminar = "http://52.32.210.155:8080/api/v1/categorias/delete/";

  const { categoriasLista, setCategoriasLista, getCategoriasLista } =
    useContext(ContextGlobal);

  ///////Escucha si se actualiza la lista y comprobamos que actualiza
  useEffect(() => {
    getCategoriasLista();
  }, []);

  // console.log(categoriasLista);

  /////////// Asigna valor lista a una 2da para comparar sin afectar
  const jsonData = categoriasLista;

  ////// Datos para envio Form
  const [form, setForm] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    categoria_id: 0,
    name: "",
    description: "",
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
      };

      console.log(
        "------------------Info paquete enviado en nuevoProductoData ------------------"
      );
      console.log(nuevaCategoriaData);

      // enviarDatos

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
      setForm(true);
      setNombreCategoriaValida(true);

      setNuevaCategoria({
        categoria_id: 0,
        name: "",
        description: "",
      });
      /////////////// VER ERROR ///////
    }
  };

  ///////////////////////////////////////
  return (
    <Container>
      <div className="tabla-categorias">
        <div
          className="lista-categorias"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {categoriasLista.map((categoria, id) => (
            <Card
              key={categoria.categoria_id}
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
                  {categoria.name}
                </Typography>
              </CardContent>
              {/* <CardActions disableSpacing>
                  
                      <ExpandMore
                        expand={expandedMap[id]}
                        onClick={() => handleExpandClick(id)}
                        
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse
                      in={expanded}
                      timeout="auto" 
                      id={categoria.id}
                      unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Descripcion:</Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textOverflow="ellipsis"
                        >
                          {categoria.description}
                        </Typography>
                      </CardContent>
                    </Collapse> */}
            </Card>
          ))}

          <Button variant="outlined" onClick={handleClickOpen}>
            Crear Categoria
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Crear categoria</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, complete los datos para crear una nueva categoria.
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
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Descripción"
              type="text"
              value={nuevaCategoria.description}
              onChange={onChangeDescription}
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              type="file"
              accept="image/*"
              label="Imagen Categoria"
              value={nuevaCategoria.icono}
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
              </Card>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSubmitCrearCategoria}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
};

export default TablaCategorias;
