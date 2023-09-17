import React, { useState, useContext, useEffect } from "react";
import "../Components/AgregarProducto.css";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import { Container } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { ContextGlobal } from "../Components/utils/global.context";
import "../Components/Genericos/CardProductoSimulado.css";
import CardProductoSimulado from "../Components/Genericos/CardProductoSimulado";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useParams } from "react-router-dom";

// import Select, { SelectChangeEvent } from '@mui/material/Select';

// function nombreExiste(nombre, data) {
//   return data.find((objeto) => objeto.nombre === nombre) !== undefined;
// }

const EditarProducto = () => {
  const { id } = useParams();

  const urlBase = "http://52.88.220.184:8080/auth/recursos/update";

  const {
    productosBKLista,
    setProductosBKLista,
    getDatosBKLista,
    categoriasLista,
    setCategoriasLista,
    getCategoriasLista,
    caracteristicasLista,
    recursoXID,
    getRecursoXID,
    caracteristicasXID,
    getCaracteristicasXID,
  } = useContext(ContextGlobal);

  const datosRecursoXID = recursoXID;

  console.log(
    "----------------- Print recursoXID ---------------- en Editar Producto en linea 44"
  );
  console.log(recursoXID);

  useEffect(() => {
    getRecursoXID(id);
  }, [id]);

  console.log(
    "----------------- Print recursoXID ---------------- en Editar Producto en linea 51"
  );
  console.log(recursoXID);

  const [nombreProductoValido, setNombreProductoValido] = useState(true);
  // const [nombreYaExiste, setNombreYaExiste] = useState(true);
  const [form, setForm] = useState(false);

  const [mensajeErrorAltaProd, setMensajeErrorAltaProd] = useState("");
  const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] =
    useState({});

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

  

  const [formCaracteristicas, setFormCaracteristicas] = useState({
    idCaracteristica: 0,
    idRecurso: 0,
    idCaracteristicas_x_Recurso: 0,
  });

  useEffect(() => {
    if (recursoXID) {
      setNuevoProducto({
        idRecurso: `${recursoXID.idRecurso}`,
        nombre: `${recursoXID.nombre}`,
        descripción: `${recursoXID.descripción}`,
        capacidadMáxima: `${recursoXID.capacidadMáxima}`,
        precioUnitario: `${recursoXID.precioUnitario}`,
        idSede: `${recursoXID.idSede}`,
        categoria_id: `${recursoXID.categoria_id}`,
        id_Tipo_Espacio: `${recursoXID.id_Tipo_Espacio}`,
        imagenUrl01: `${recursoXID.imagenUrl01}`,
        imagenUrl02: `${recursoXID.imagenUrl02}`,
        imagenURL: `${recursoXID.imagenUrl02}`,
        imagenUrl03: `${recursoXID.imagenUrl03}`,
        imagenUrl04: `${recursoXID.imagenUrl04}`,
        tieneCafetería: `${recursoXID.tieneCafetería}`,
        tieneWifi: `${recursoXID.tieneWifi}`,
        estadoRecurso: `${recursoXID.estadoRecurso}`,
        tieneLokker: `${recursoXID.tieneLokker}`,
        tieneFotocopiadoraImpresion: `${recursoXID.tieneFotocopiadoraImpresion}`,
        tieneEspacioDescanso: `${recursoXID.tieneEspacioDescanso}`,
        tieneEstaciónCafeAguaAromatica: `${recursoXID.tieneEstaciónCafeAguaAromatica}`,
      });
    }
  }, [recursoXID]);

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
      nombre: "Argentina",
      direccion: "Libertador 2100, Capital Federal.",
    },
    {
      id: 2,
      nombre: "Colombia",
      direccion: "CR 2 #5-27, Bogota.",
    },
    {
      id: 3,
      nombre: "Chile",
      direccion: "Avenida Presidente Kennedy 4420. Santiago de Chile.",
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

  const handleOptionChange = (caracteristica) => {
    setCaracteristicasSeleccionadas((prevCaracteristicas) => ({
      ...prevCaracteristicas,
      [caracteristica.idCaracteristica]:
        !prevCaracteristicas[caracteristica.idCaracteristica],
    }));
  };

  const onChangeNombre = (e) => {
    setNuevoProducto({ ...nuevoProducto, nombre: e.target.value });

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

  // const handleOptionChange = (servicio) => {
  //   setServicios((prevServicios) => ({
  //     ...prevServicios,
  //     [servicio]: !prevServicios[servicio],
  //   }));
  // };

  const onChangeFoto = (e) => {
    const fotos = e.target.files; // Obtener los archivos seleccionados
    const fotosArray = Array.from(fotos); // Convertir FileList en un array
    // Crear un objeto con las URLs temporales de las fotos seleccionadas
    const fotosTempUrls = fotosArray.map((foto) => URL.createObjectURL(foto));

    setNuevoProducto({
      ...nuevoProducto,
      imagenUrl01: `${recursoXID.imagenUrl01}`,
      imagenUrl02: `${recursoXID.imagenUrl02}`,
      imagenURL: `${recursoXID.imagenUrl02}`,
      imagenUrl03: `${recursoXID.imagenUrl03}`,
      imagenUrl04: `${recursoXID.imagenUrl04}`,

      // imagenURL: fotosTempUrls[0] || "",
      // imagenUrl01: fotosTempUrls[1] || "",
      // imagenUrl02: fotosTempUrls[2] || "",
      // imagenUrl03: fotosTempUrls[3] || "",
      // imagenUrl04: fotosTempUrls[4] || "",
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
      getDatosBKLista();
    }
  }, [form]);
  const jsonData = productosBKLista;
  /////////handleSubmit //////
  const handleSubmitCrearProducto = async (e) => {
    e.preventDefault();

    console.log("----------------- Console al arrancar HandleSubmit");
    console.log(e);

    const nombreEsValido = validarNombreProducto(nuevoProducto.nombre);

    console.log("------------------nombreYaExiste ?????? ------------------");
    console.log(nombreEsValido);

    if (nombreEsValido) {
      setForm(true);
      setNombreProductoValido(true);

      const nuevoProductoData = {
        idRecurso: nuevoProducto.idRecurso,
        nombre: nuevoProducto.nombre,
        descripción: nuevoProducto.descripción,
        capacidadMáxima: nuevoProducto.capacidadMáxima,
        precioUnitario: parseInt(nuevoProducto.precioUnitario),
        idSede: nuevoProducto.idSede,
        categoria_id: nuevoProducto.categoria_id,
        id_Tipo_Espacio: nuevoProducto.id_Tipo_Espacio,
        estadoRecurso: nuevoProducto.estadoRecurso,
        imagenUrl01: `${recursoXID.imagenUrl01}`,
        imagenUrl02: `${recursoXID.imagenUrl02}`,
        imagenURL: `${recursoXID.imagenUrl02}`,
        imagenUrl03: `${recursoXID.imagenUrl03}`,
        imagenUrl04: `${recursoXID.imagenUrl04}`,
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
      // useEffect(() => {
      //   if (form) {
      //     getDatosBKLista(); // Actualiza el estado jsonData después de enviar la petición POST
      //   }
      // }, [form]);

      console.log("Muestra el valor de toda la Lista ");
      console.log(productosBKLista);
      console.log("------------------productosBKLista  ------------------");
      console.log(jsonData);
      // useEffect(() => {
      //   getDatosBKLista();
      // }, []);

      //////// Envio de info a Caracteristicas///////////////////

      const urlCaracteristicasXIdRec =
        "http://52.32.210.155:8080/auth/inter/save";

      const caracteristicasParaEnviar = Object.keys(
        caracteristicasSeleccionadas
      ).map((idCaracteristica) => ({
        idCaracteristica: parseInt(idCaracteristica),
        idRecurso: recursoXID.idRecurso,
        idCaracteristicas_x_Recurso: 0,
      }));
      console.log(
        "----caracteristicasParaEnviar: --->",
        caracteristicasParaEnviar
      );

      try {
        console.log("segundo Try: ------------------------------------------------>");

        // Vuelve a definir jsonData para la segunda llamada a axios.post
        const jsonData2 = JSON.stringify(caracteristicasParaEnviar);
        console.log("jsonData2", jsonData2)
        console.log("caracteristicasParaEnviar", caracteristicasParaEnviar)
        const response2 = await axios.post(
          urlCaracteristicasXIdRec,
          caracteristicasParaEnviar,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
         
          console.log("caracteristicasParaEnviar-----------------", jsonData2)
        if (response2.status === 200) {
          const responseData2 = await response2.json();
          console.log("Respuesta:", responseData2);
          cleanForm();
        } else {
          console.error(
            "Error en la segunda llamada a axios.post:",
            response2.status,
            response2.statusText
          );
        }
      } catch (error) {
        console.error("Error en la segunda llamada a axios.post:", error);
      }

      ///////////////////////////////////////////////////////////////

      /////ERROR ????////////////////////////
    } else {
      setForm(false);
      // setNombreYaExiste(nombreExisteEnData);
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
        <div className="division-form-preview">
          <div className="pagina-formulario-alta-producto">
            <FormControl
              onSubmit={handleSubmitCrearProducto}
              style={{ padding: "1rem 0rem", width: "500px" }}
            >
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
                  />
                  {!nombreProductoValido ? (
                    <p className="error-nombre-existe">
                      Ingrese un nombre que tenga mas de 3 y menos de 30
                      caracteres y solo letras.
                    </p>
                  ) : (
                    ""
                  )}
                  {/* {nombreYaExiste ? (
                  <p className="error-nombre-existe">
                    Ya existe un producto con el mismo nombre. Por favor,
                    indique un nuevo nombre.
                  </p>
                ) : (
                  ""
                )} */}
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
                    defaultValue="OFICINA ESPACIO ABIERTO"
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
                </div>

                {/* -/////////////////////////////////////// */}
                <FormGroup
                  className="formgroup-check-boxs"
                  label="Elija las caracteristicas"
                  component="fieldset"
                  style={{ maxWidth: "480px", height: "fit-content" }}
                >
                  <FormLabel component="legend">Características</FormLabel>
                  <div className="container-check-boxs">
                    {caracteristicasLista.map((caracteristica) => (
                      <li
                        key={caracteristica.idCaracteristica}
                        style={{ listStyle: "none" }}
                        className="item-grid-check"
                      >
                        <label>
                          <Checkbox
                            type="checkbox"
                            // className="item-grid-check"
                            checked={caracteristica.checked} // Asumo que cada objeto tiene una propiedad "checked"
                            onChange={() => handleOptionChange(caracteristica)}
                          />
                          {caracteristica.nombre}
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
                    maxWidth: "600px",
                  }}
                >
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
                {/* ////////////////////DISPONIBLE//////////////////////////////////////////// */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    maxWidth: "600px",
                  }}
                >
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
            <div className="acceso-cuenta-o-usuarionuevo"></div>
          </div>
          <div className="segmento-preview">
            <h1 className="titulo-preview">Previsualiza tu producto</h1>
            <CardProductoSimulado
              className="card-simulada"
              title={nuevoProducto.nombre}
              descripcion={nuevoProducto.descripción}
              url={nuevoProducto.imagenURL}
              precio={nuevoProducto.precioUnitario}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
