import React, { useState, useContext, useEffect } from "react";
import "../Components/AgregarProducto.css";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { ContextGlobal } from "../Components/utils/global.context";
import "../Components/Genericos/CardProductoSimulado.css";
import CardProductoSimulado from "../Components/Genericos/CardProductoSimulado";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import buscadorSedeXIDSede from "../Components/utils/buscadorSedeXIDSede";
// import Select, { SelectChangeEvent } from '@mui/material/Select';

function nombreExiste(nombre, data) {
  return data.find((objeto) => objeto.nombre === nombre) !== undefined;
}
// const nombreYaExiste = nombreExiste(nombreBuscado, jsonData);

const AgregarProducto = () => {
  const urlBase = "http://52.32.210.155:8080/api/v1/recursos/save";
  const jwt = localStorage.getItem("jwt");
  const {
    productosBKLista,
    setProductosBKLista,
    getDatosBKLista,
    categoriasLista,
    setCategoriasLista,
    getCategoriasLista,
  } = useContext(ContextGlobal);

  // const [selectedFile, setSelectedFile] = useState(null);
  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   const newFiles = Array.from(files).slice(0, 5); // Limitar a 5 archivos
  //   setSelectedFiles(newFiles);
  // };

  // const handleUpload = () => {
  //   if (selectedFiles.length > 0) {
  //     // Aquí puedes implementar la lógica para enviar los archivos al servidor
  //     console.log("Subiendo archivos:", selectedFiles.map(file => file.name));
  //   }
  // };
  // const [showPreview, setShowPreview] = useState(false);
  // const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  // const MAX_SELECTED_SERVICES = 5;

  const [nombreProductoValido, setNombreProductoValido] = useState(true);
  const [nombreYaExiste, setNombreYaExiste] = useState(true);
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

  const [servicios, setServicios] = useState({
    tieneCafetería: false,
    tieneWifi: false,
    tieneLokker: false,
    tieneFotocopiadoraImpresion: false,
    tieneEspacioDescanso: false,
    tieneEstaciónCafeAguaAromatica: false,
  });

  ///////////////Envio de datos

  /////////////////////////////

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
    setServicios((prevServicios) => ({
      ...prevServicios,
      [servicio]: !prevServicios[servicio],
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
    console.log(nombreExisteEnData);

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
        tieneCafetería: servicios.tieneCafetería ? 1 : 0,
        tieneWifi: servicios.tieneWifi ? 1 : 0,
        tieneLokker: servicios.tieneLokker ? 1 : 0,
        tieneFotocopiadoraImpresion: servicios.tieneFotocopiadoraImpresion
          ? 1
          : 0,
        tieneEspacioDescanso: servicios.tieneEspacioDescanso ? 1 : 0,
        tieneEstaciónCafeAguaAromatica: servicios.tieneEstaciónCafeAguaAromatica
          ? 1
          : 0,
      };

      console.log(
        "------------------Info paquete enviado en nuevoProductoData ------------------"
      );
      console.log(nuevoProductoData);

      // enviarDatos();

      try {
        const jsonData = JSON.stringify(nuevoProductoData);
        const response = await axios.post(urlBase, jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Respuesta:", response.data);
        getDatosBKLista();
      } catch (error) {
        console.error("Error:", error);
      }
      useEffect(() => {
        if (form) {
          getDatosBKLista(); // Actualiza el estado jsonData después de enviar la petición POST
        }
      }, [form]);

      console.log("Muestra el valor de toda la Lista ");
      console.log(productosBKLista);
      console.log("------------------productosBKLista  ------------------");
      console.log(jsonData);
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
        precioUnitario: 1,
        idSede: 0,
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
    <div className="administracion-agre" style={{ padding: "2rem 0rem" }}>
      <div
        className="administracion-agre-titulo"
        style={{ padding: "0rem 0rem" }}
      >
        Agregar productos
      </div>
      <div className="paneles-agregar">
        <PanelAdminUser />
        <div
          className="division-form-preview"
          style={{ padding: "0rem 2rem", maxWidth: "1500px" }}
        >
          <div className="pagina-formulario-alta-producto">
            <FormControl
              onSubmit={handleSubmitCrearProducto}
              style={{ padding: "1rem 2rem", width: "890px" }}
            >
              <div className="formularioAgregarProducto">
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
                />
                {!nombreProductoValido ? (
                  <p className="error-nombre-existe">
                    Ingrese un nombre que tenga mas de 3 y menos de 30
                    caracteres y solo letras.
                  </p>
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
                  style={{ width: "700px" }}
                />
                {/* /////////--------------------------------////// */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    id="tipoRecurso"
                    select
                    label="Categorias de productos"
                    defaultValue="OFICINAS PRIVADAS"
                    style={{ width: "300px" }}
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
                    <option className="item-grid" value={0}>
                      OFICINA ESPACIO CERRADO
                    </option>
                  </TextField>

                  {/* //////////////////// */}
                  <TextField
                    id="capacidad maxima"
                    select
                    type="number"
                    value={nuevoProducto.capacidadMáxima}
                    onChange={onChangeCapacidadMáxima}
                    label="Capacidad máxima"
                    defaultValue="1"
                    style={{ width: "150px" }}
                    margin="normal"
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Elija una capacidad máxima"
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
                {/* -/////////////////////////////////////// */}
                <FormGroup
                  className="formgroup-check-boxs"
                  label="Elija las caracteristicas"
                  component="fieldset"
                >
                  <FormLabel component="legend">Label placement</FormLabel>
                  <div className="container-check-boxs">
                    {Object.keys(servicios).map((servicio) => (
                      <li key={servicio} style={{ listStyle: "none" }}>
                        <label>
                          <Checkbox
                            type="checkbox"
                            className="item-grid-check"
                            checked={servicios[servicio]}
                            onChange={() => handleOptionChange(servicio)}
                          />
                          {servicio}
                        </label>
                      </li>
                    ))}
                  </div>
                </FormGroup>
                {/* /////////--------------------------------////// */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
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
                  {/* Falta en precio parsear pero mantener 2 decimales, ahora pasa todo a numero entero sin decimal */}
                  {/* //////////////////////////////////////////////////////////////////////////////// */}
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

                  {/* //////////////////////////////////////////////////////////////////////////////// */}
                  <TextField
                    id="disponible"
                    select
                    type="text"
                    label="Esta Disponible?"
                    defaultValue="Argentina"
                    style={{ width: "200px" }}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Esta Disponible?"
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
                </div>
                {/* ////////////////////DISPONIBLE//////////////////////////////////////////// */}

                {/* ///////////////////////////////////////////////////////////////////// */}
                <div className="campo-anotacion">
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
                {/* ///////////////// */}
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
            <h1 className="titulo-preview">Preview Carga de producto</h1>
            <CardProductoSimulado
              className="card-simulada"
              title={nuevoProducto.nombre}
              descripcion={nuevoProducto.descripción}
              url={nuevoProducto.imagenURL}
              precio={nuevoProducto.precioUnitario}
              sede={buscadorSedeXIDSede(nuevoProducto.idSede)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarProducto;
