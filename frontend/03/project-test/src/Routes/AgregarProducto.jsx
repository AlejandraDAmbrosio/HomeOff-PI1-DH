import React, { useState, useContext, useEffect } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import buscadorSedeXIDSede from "../Components/utils/buscadorSedeXIDSede";
import nombreExiste from "../Components/utils/nombreExiste.js";
import obtenerNombreCategoriaPorId from "../Components/utils/obtenerNombreCategoriaPorId";
import axios from "axios";
import "../Components/AgregarProducto.css";
import "../Components/Genericos/CardProductoSimulado.css";
import CardProductoSimulado from "../Components/Genericos/CardProductoSimulado";
import {
  FormLabel,
  FormControl,
  TextField,
  FormGroup,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AgregarProducto = () => {
  const navigate = useNavigate();

  const {
    productosBKLista,
    setProductosBKLista,
    getDatosBKLista,
    categoriasLista,
    caracteristicasLista,
    setCategoriasLista,
    getCategoriasLista,
  } = useContext(ContextGlobal);

  const [nombreProductoValido, setNombreProductoValido] = useState(true);
  const [nombreYaExiste, setNombreYaExiste] = useState(false);
  const [form, setForm] = useState(false);
  const [mensajeErrorAltaProd, setMensajeErrorAltaProd] = useState("");

  /////// Preparar obbjeto para enviar al servidor    ///////
  const [nuevoProducto, setNuevoProducto] = useState({
    idRecurso: 0,
    nombre: "",
    descripción: "",
    capacidadMáxima: 0,
    precioUnitario: 1.0,
    idSede: 1,
    categoria_id: 1,
    id_Tipo_Espacio: 1,
    imagenUrl01:
      "https://c2-team4-images-test-bucket.s3.amazonaws.com/lockers.jpg",
    imagenUrl02: "",
    imagenURL: "",
    imagenUrl03: "",
    imagenUrl04: "",
    tieneCafetería: 1,
    tieneWifi: 1,
    estadoRecurso: "Disponible",
    tieneLokker: 1,
    tieneFotocopiadoraImpresion: 1,
    tieneEspacioDescanso: 1,
    tieneEstaciónCafeAguaAromatica: 1,
  });

  const [caracteristica, setCaracteristicas] = useState({
    nombre: "",
    logoCaracteristica: "",
    idCaracteristica: "",
  });

  const sedesArray = [
    {
      id: 1,
      nombre: "Colombia",
      direccion: "CARRERA 100 # 15",
    },
    {
      id: 2,
      nombre: "Argentina",
      direccion: "Calle 1 y 60 La Plata",
    },
    {
      id: 3,
      nombre: "Chile",
      direccion: "Av. Libertador Bernardo O'Higgins 1449, Torre",
    },
  ];

  const capacidadArray = [
    {
      id: 1,
      cantidad: 1,
    },
    {
      id: 2,
      cantidad: 2,
    },
    {
      id: 3,
      cantidad: 3,
    },
    {
      id: 4,
      cantidad: 4,
    },
    {
      id: 5,
      cantidad: 5,
    },
    {
      id: 10,
      cantidad: 10,
    },
    {
      id: 20,
      cantidad: 20,
    },
  ];

  //////////////////OnChanges///////////////

  const onChangeNombre = (e) => {
    setNuevoProducto({ ...nuevoProducto, nombre: e.target.value });
    setNombreYaExiste(false);
    setNombreProductoValido(true);
  };

  const onChangeDescripcion = (e) => {
    setNuevoProducto({ ...nuevoProducto, descripción: e.target.value });
  };

  const onChangeCapacidadMáxima = (e) => {
    setNuevoProducto({ ...nuevoProducto, capacidadMáxima: e.target.value });
  };

  const onChangePreciounitario = (e) => {
    const newValue = e.target.value;
    setNuevoProducto({ ...nuevoProducto, precioUnitario: newValue });
    validarPrecio(newValue);
  };

  const validarPrecio = (n) => {
    if (isNaN(n)) {
      setMensajeErrorAltaProd("Por favor, ingrese un numero");
    } else if (n == 0) {
      setMensajeErrorAltaProd("Por favor, ingrese un numero mayor a 0");
    } else {
    }
    return true;
  };

  const onChangeSede = (e) => {
    setNuevoProducto({ ...nuevoProducto, idSede: e.target.value });
  };

  const onChangeTipoRecurso = (e) => {
    setNuevoProducto({ ...nuevoProducto, categoria_id: e.target.value });
  };

  const onChangeAbiertoCerrado = (e) => {
    setNuevoProducto({ ...nuevoProducto, id_Tipo_Espacio: e.target.value });
  };

  const onChangeDisponibilidad = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      estadoRecurso: e.target.value,
    });
  };

  const handleOptionChange = (servicio) => {
    setCaracteristicas((prevCaracteristica) => ({
      ...prevCaracteristica,
      [caracteristica]: !prevCaracteristica[caracteristica],
    }));
  };

  const onChangeImagenUrl = (e, fieldName) => {
    const newValue = e.target.value;
    setNuevoProducto((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };


  const onChangeFoto = (e) => {
    const fotos = e.target.files; // Obtener los archivos seleccionados
    const fotosArray = Array.from(fotos); // Convertir FileList en un array
    // Crear un objeto con las URLs temporales de las fotos seleccionadas
    const fotosTempUrls = fotosArray.map((foto) => URL.createObjectURL(foto));

  
    setNuevoProducto({
      ...nuevoProducto,
      imagenURL: fotosTempUrls[0] || "",
      imagenUrl01: fotosTempUrls[1] || "",
      imagenUrl02: fotosTempUrls[2] || "",
      imagenUrl03: fotosTempUrls[3] || "",
      imagenUrl04: fotosTempUrls[4] || "",
    });
  };

  ///////////////Validaciones ///////////////////
  const validarNombreProducto = (n) => {
    const regex = /^[A-Za-z\s]{5,40}$/;
    console.log(regex);
    return regex.test(n);
  };

  useEffect(() => {
    if (form) {
      getDatosBKLista(); // Actualiza el estado jsonData después de enviar la petición POST
    }
  }, [form]);
  const jsonData = productosBKLista;

  /////////handleSubmit //////
  const handleSubmitCrearProducto = async (e) => {
    e.preventDefault();
    console.log("----------------- Console al arrancar HandleSubmit");
    console.log(e);
    const nombreEsValido = validarNombreProducto(nuevoProducto.nombre);
    const nombreExisteEnData = nombreExiste(nuevoProducto.nombre, jsonData);

    console.log("------------------nombreYaExiste ?????? ------------------");
    console.log(nombreEsValido);
    console.log(
      "------------------validarNombreProducto ??? ------------------"
    );
    console.log("nombreExisteEnData ----------------> ", nombreExisteEnData);
    console.log("nombreEsValido ----------------> ", nombreEsValido);

    if (nombreEsValido && !nombreExisteEnData) {
      setForm(true);
      setNombreProductoValido(true);
      // setShowPreview(true);
      // console.log(form);

      const nuevoProductoData = {
        idRecurso: 0,
        nombre: nuevoProducto.nombre,
        descripción: nuevoProducto.descripción,
        capacidadMáxima: nuevoProducto.capacidadMáxima,
        precioUnitario: parseInt(nuevoProducto.precioUnitario),
        idSede: nuevoProducto.idSede,
        categoria_id: nuevoProducto.categoria_id,
        id_Tipo_Espacio: nuevoProducto.id_Tipo_Espacio,
        estadoRecurso: nuevoProducto.estadoRecurso,
        imagenUrl01:
          "https://c2-team4-images-test-bucket.s3.amazonaws.com/lockers.jpg",
        imagenUrl02: "",
        imagenURL: "",
        imagenUrl03: "",
        imagenUrl04: "",
        tieneCafetería: 1,
        tieneWifi: 1,
        tieneLokker: 1,
        tieneFotocopiadoraImpresion: 1,
        tieneEspacioDescanso: 1,
        tieneEstaciónCafeAguaAromatica: 1,
      };
      
      console.log(
        "------------------Info paquete enviado en nuevoProductoData ------------------"
      );
      console.log(nuevoProductoData);
      const urlBase = "http://52.32.210.155:8080/auth/recursos/save";

      ///////////////Envio de datos

      try {
        const jsonData = JSON.stringify(nuevoProductoData);
        const response = await axios.post(urlBase, jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("response.status", response.status);
        if (response.status == 200) {
          console.log(
            "PRE  productosBKLista -------------------> ",
            productosBKLista
          );
          const responseData = await response.data;
          console.log("Respuesta:", responseData);
          getDatosBKLista();
          console.log(
            "productosBKLista -----dentro de  if (response.status == 200) {--------------> ",
            productosBKLista
          );
          const ultimoElemento = productosBKLista[productosBKLista.length - 1];

          const idRecursoUltimoElemento = ultimoElemento.idRecurso + 1;

          console.log(idRecursoUltimoElemento);
          console.log(
            "idRecursoUltimoElemento -----> ",
            idRecursoUltimoElemento
          );
          navigate(`/agregarCaracteristicas/${idRecursoUltimoElemento}`);
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
      getDatosBKLista();

      console.log("productosBKLista -------------------> ", productosBKLista);

      // useEffect(() => {
      //   getDatosBKLista();
      // }, []);

      /////ERROR ????////////////////////////
    } else {
      setForm(false);
      setNombreYaExiste(nombreExisteEnData);
      setNombreProductoValido(false);

      setNuevoProducto({
        nombre: "",
        descripción: "",
        capacidadMáxima: 0,
        categoria_id: 1,
        precioUnitario: 1,
        idSede: 0,
        id_Tipo_Espacio: 1,
        imagenURL: "",
        imagenURL01: "",
        imagenURL02: "",
        imagenURL03: "",
        imagenURL04: "",
        tipoDeRecurso: "",
        estadoRecurso: "",
      });
      /////////////// VER ERROR ///////
    }
  };

  return (
    <div className="administracion-agre">
      <div className="administracion-agre-titulo">Agregar producto</div>
      <div className="paneles-agregar">
        <PanelAdminUser />
        <div className="division-form-preview">
          <div className="pagina-formulario-alta-producto">
            <FormControl
              onSubmit={handleSubmitCrearProducto}
              style={{ padding: "1rem 0rem", width: "500px" }}
            >
              {/* <h1 className="titulo-form-carga-prod">Carga de producto</h1> */}
              <div className="formularioAgregarProducto">
                <div
                  style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    id="nombreProducto"
                    label="Nombre del producto"
                    variant="standard"
                    className="campo-formulario"
                    type="text"
                    placeholder="Ingresa el nombre del producto "
                    value={nuevoProducto.nombre}
                    onChange={onChangeNombre}
                    required
                    margin="normal"
                    // style={{ width: "400px" }}
                  />
                  {!nombreProductoValido ? (
                    <Typography className="error-nombre-existe">
                      Ingrese un nombre que tenga mas de 3 y menos de 30
                      caracteres y solo letras.
                    </Typography>
                  ) : (
                    ""
                  )}
                  {nombreYaExiste ? (
                    <p className="error-nombre-existe">
                      Ya existe un producto con el mismo nombre. Por favor,
                      indique un nuevo nombre.
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                {/* /////////--------------------------------////// */}

                <TextField
                  id="descripción"
                  label="Descripción"
                  multiline
                  rows={3}
                  defaultValue="Ingrese una descripción"
                  variant="standard"
                  value={nuevoProducto.descripción}
                  onChange={onChangeDescripcion}
                  required
                  margin="normal"
                  style={{ width: "400px" }}
                />
                {/* /////////--------------------------------////// */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    maxWidth: "485px",
                    gap: "0.5rem",
                  }}
                >
                  <TextField
                    id="tipoRecurso"
                    select
                    label="Categorias de productos"
                    defaultValue="OFICINAS PRIVADAS"
                    style={{ width: "210px" }}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Elija un tipo de recurso"
                    variant="standard"
                    value={nuevoProducto.categoria_id}
                    onChange={onChangeTipoRecurso}
                    required
                    margin="normal"
                  >
                    {categoriasLista.map((categoria, categoria_id) => (
                      <option
                        key={categoria.categoria_id}
                        className="item-grid"
                        value={categoria.categoria_id}
                      >
                        {categoria.name}{" "}
                      </option>
                    ))}
                  </TextField>
                  {/* /////////--------------------------------////// */}

                  <TextField
                    id="tipoEspacio"
                    select
                    type="number"
                    label="Tipo de Espacio"
                    style={{ width: "224px" }}
                    defaultValue="OFICINAS PRIVADAS"
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Elija el tipo de espacio"
                    variant="standard"
                    value={nuevoProducto.id_Tipo_Espacio}
                    onChange={onChangeAbiertoCerrado}
                    required
                    margin="normal"
                  >
                    <option className="item-grid" value={1}>
                      OFICINA ESPACIO ABIERTO
                    </option>
                    <option className="item-grid" value={2}>
                      OFICINA ESPACIO CERRADO
                    </option>
                  </TextField>

                  {/* //////////////////// */}
                </div>
                {/* -/////////////////////////////////////// */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    maxWidth: "600px",
                  }}
                >
                  <TextField
                    id="sede"
                    select
                    type="text"
                    label="Elija una Sede"
                    defaultValue="Argentina"
                    style={{ width: "300px" }}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Elija una Sede"
                    variant="standard"
                    value={nuevoProducto.idSede}
                    onChange={onChangeSede}
                    required
                    margin="normal"
                  >
                    {sedesArray.map((sede) => (
                      <option
                        key={sede.id}
                        className="item-grid"
                        value={sede.id}
                      >
                        {sede.nombre}{" "}
                      </option>
                    ))}
                  </TextField>

                  <TextField
                    id="precioProducto"
                    label="Ingresa el precio del producto"
                    type="number"
                    value={nuevoProducto.precioUnitario}
                    onChange={onChangePreciounitario}
                    margin="normal"
                    style={{ width: "150px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />

                  {/* //////////////////////////////////////////////////////////////////////////////// */}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    maxWidth: "600px",
                  }}
                >
                  {/* //////////////////////////////////////////////////////////////////////////////// */}
                  <TextField
                    id="disponible"
                    select
                    type="text"
                    label="Esta Disponible?"
                    defaultValue="Argentina"
                    style={{ width: "300px" }}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Está disponible?"
                    variant="standard"
                    value={nuevoProducto.estadoRecurso}
                    onChange={onChangeDisponibilidad}
                    required
                    margin="normal"
                  >
                    <option className="item-grid" value="Disponible">
                      Disponible
                    </option>
                    <option className="item-grid" value="No disponible">
                      No disponible
                    </option>
                  </TextField>

                  {/* ////////////// */}
                  <TextField
                    id="capacidad maxima"
                    select
                    type="number"
                    value={nuevoProducto.capacidadMáxima}
                    onChange={onChangeCapacidadMáxima}
                    label="Capacidad máxima"
                    defaultValue="1"
                    style={{ width: "120px" }}
                    margin="normal"
                    SelectProps={{
                      native: true,
                    }}
                    // helperText="Elija una capacidad máxima"
                    variant="standard"
                    required
                  >
                    {capacidadArray.map((cant) => (
                      <option
                        key={cant.id}
                        className="item-grid"
                        value={cant.cantidad}
                      >
                        {cant.cantidad}{" "}
                      </option>
                    ))}
                  </TextField>
                </div>

                {/* ///////////////////////////////////////////////////////////////////// */}
                <div
                  className="campo-anotacion"
                  style={{
                    margin: "35px 0px",
                    border: "1px solid grey",
                    padding: "10px 5px",
                    width: "100%",
                  }}
                >
                  <label className="anotacion" for="fotos">
                    Ingresa las fotos del producto *
                  </label>
                  <input
                    type="file"
                    id="fotos"
                    name="fotos"
                    accept=".jpg, .jpeg, .png"
                    onChange={onChangeFoto}
                    multiple
                  />
                </div>
                {/* /////////OPCION comentada para subir imagenes //////// */}

                <div
                  style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    id="foto1"
                    label="Foto 1"
                    variant="standard"
                    className="campo-formulario"
                    type="text"
                    placeholder="Ingresa el link para subir tu foto"
                    value={nuevoProducto.imagenUrl01}
                    onChange={(e) => onChangeImagenUrl(e, "imagenUrl01")}
                    required
                    margin="normal"
                  />

                  <TextField
                    id="foto2"
                    label="Foto 2"
                    variant="standard"
                    className="campo-formulario"
                    type="text"
                    placeholder="Ingresa el link para subir tu foto"
                    value={nuevoProducto.imagenUrl02}
                    onChange={(e) => onChangeImagenUrl(e, "imagenUrl02")}
                    required
                    margin="normal"
                  />

                  <TextField
                    id="foto3"
                    label="Foto 3"
                    variant="standard"
                    className="campo-formulario"
                    type="text"
                    placeholder="Ingresa el link para subir tu foto"
                    value={nuevoProducto.imagenUrl03}
                    onChange={(e) => onChangeImagenUrl(e, "imagenUrl03")}
                    required
                    margin="normal"
                  />
                  <TextField
                    id="foto4"
                    label="Foto 4"
                    variant="standard"
                    className="campo-formulario"
                    type="text"
                    placeholder="Ingresa el link para subir tu foto"
                    value={nuevoProducto.imagenUrl04}
                    onChange={(e) => onChangeImagenUrl(e, "imagenUrl04")}
                    required
                    margin="normal"
                  />

                  <TextField
                    id="foto5"
                    label="Foto 5"
                    variant="standard"
                    className="campo-formulario"
                    type="text"
                    placeholder="Ingresa el link para subir tu foto"
                    value={nuevoProducto.imagenUrl05}
                    onChange={(e) => onChangeImagenUrl(e, "imagenUrl05")}
                    required
                    margin="normal"
                  />
                </div>

                {/* <div>
                  <input
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    id="file-upload"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Cargar Archivo
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!selectedFile}
                  >
                    Subir
                  </Button>
                  {selectedFile && (
                    <p>Archivo seleccionado: {selectedFile.name}</p>
                  )}
                </div> */}
                {/* //////////////-----------------------------////////////// */}
                <div className="boton-acceso-agregar-producto">
                  <Button
                    className="boton"
                    type="submit"
                    variant="outlined"
                    onClick={handleSubmitCrearProducto}
                  >
                    Guardar
                  </Button>

                  <Button
                    className="boton"
                    type="reset"
                    variant="outlined"
                    color="error"
                  >
                    Cancelar
                  </Button>
                </div>
                {/* /////////--------------------------------////// */}
              </div>
              {form && (
                <h5 className="msj-form-guardado">
                  Gracias !! Tu producto ha sido guardado!
                </h5>
              )}
            </FormControl>
            <div className="acceso-cuenta-o-usuarionuevo-agregar-prod"></div>
          </div>
          <div className="segmento-preview">
            <h1 className="titulo-preview">Previsualiza tu producto</h1>
            <CardProductoSimulado
              className="card-simulada"
              title={nuevoProducto.nombre}
              descripcion={nuevoProducto.descripción}
              url={nuevoProducto.imagenURL}
              precio={nuevoProducto.precioUnitario}
              sede={buscadorSedeXIDSede(nuevoProducto.idSede)}
              categoria={obtenerNombreCategoriaPorId(
                nuevoProducto.categoria_id,
                productosBKLista,
                categoriasLista
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarProducto;
