import React, { useState, useContext, useEffect } from "react";
import "../Components/AgregarProducto.css";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import { Container } from "@mui/material";
import axios from "axios";
import { ContextGlobal } from "../Components/utils/global.context";
import "../Components/Genericos/CardProductoSimulado.css";
import CardProductoSimulado from "../Components/Genericos/CardProductoSimulado";

function nombreExiste(nombre, data) {
  return data.find((objeto) => objeto.nombre === nombre) !== undefined;
}
// const nombreYaExiste = nombreExiste(nombreBuscado, jsonData);

const AgregarProducto = () => {
  const urlBase = "http://52.32.210.155:8080/api/v1/recursos/save";
  const jwt = localStorage.getItem("jwt");
  const { productosBKLista, setProductosBKLista, getDatosBKLista } =
    useContext(ContextGlobal);
  const jsonData = productosBKLista;

  const [showPreview, setShowPreview] = useState(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const MAX_SELECTED_SERVICES = 5;

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

  const tipoRecursoArray = [
    {
      id: 1,
      tipo: "Oficina Privada",
      valor: "OFICINAPRIVADA",
    },
    {
      id: 2,
      tipo: "Coworking",
      valor: "COWORKING",
    },
    {
      id: 3,
      tipo: "Sala de Reuniones",
      valor: "SALAREUNION",
    },
    {
      id: 4,
      tipo: "Auditorio",
      valor: "Auditorio",
    },
    {
      id: 5,
      tipo: "Oficina Set",
      valor: "Oficina Set",
    },
    {
      id: 6,
      tipo: "Area de aprendizaje",
      valor: "Area de aprendizaje",
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
    const regex = /^[A-Za-z\s]{6,40}$/;
    return regex.test(n);
  };

  useEffect(() => {
    if (form) {
      getDatosBKLista(); // Actualiza el estado jsonData después de enviar la petición POST
    }
  }, [form]);

  /////////handleSubmit //////
  const handleSubmitCrearProducto = async (e) => {
    e.preventDefault();

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
    <div className="administracion-agre">
      <div className="administracion-agre-titulo">
        Administracion Características
      </div>
      <div className="paneles-agregar">
        <PanelAdminUser />
        <div className="division-form-preview">
          {/* <Container style={{ width:"100%"}}> */}
            <div className="pagina-formulario-alta-producto">
              {/* <div className="encabezado-formulario">
          {/* <div className="titulo-form-inicio-sesion">Agrega productos</div> */}
              {/* </div>  */}

              <form onSubmit={handleSubmitCrearProducto}>
                <div className="formularioAgregarProducto">
                  <div className="campo-anotacion">
                    <label className="anotacion" for="nombreProducto">
                      Nombre del producto *
                    </label>
                    <input
                      id="nombreProducto"
                      className="campo-formulario"
                      type="text"
                      placeholder="Ingresa el nombre del producto "
                      value={nuevoProducto.nombre}
                      onChange={onChangeNombre}
                      required
                    />
                    {nombreProductoValido ? (
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
                  </div>

                  <div className="campo-anotacion">
                    <label className="anotacion" for="descripción">
                      Descripcion *
                    </label>
                    <textarea
                      id="descripción"
                      className="campo-formulario"
                      type="text"
                      placeholder="Ingrese una descripcion"
                      value={nuevoProducto.descripción}
                      onChange={onChangeDescripcion}
                      required
                    />
                  </div>

                  <div className="campo-anotacion">
                    <label className="anotacion" for="tipoRecurso">
                      Tipo de Recurso *
                    </label>
                    <select
                      id="tipoRecurso"
                      className="campo-formulario"
                      type="text"
                      placeholder="Elija un tipo de recurso"
                      value={nuevoProducto.categoria_id}
                      onChange={onChangeTipoRecurso}
                      required
                    >
                      {tipoRecursoArray.map((tipoRecurso) => (
                        <option
                          key={tipoRecurso.id}
                          className="item-grid"
                          value={tipoRecurso.id}
                        >
                          {tipoRecurso.tipo}{" "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="campo-anotacion">
                    <div className="anotacion">Capacidad máxima *</div>
                    <select
                      className="campo-formulario"
                      type="number"
                      placeholder="Elija una capacidad máxima"
                      value={nuevoProducto.capacidadMáxima}
                      onChange={onChangeCapacidadMáxima}
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
                    </select>
                  </div>

                  {/* -/////////////////////////////////////// */}

                  {Object.keys(servicios).map((servicio) => (
                    <li key={servicio}>
                      <label>
                        <input
                          type="checkbox"
                          className="item-grid-check"
                          checked={servicios[servicio]}
                          onChange={() => handleOptionChange(servicio)}
                        />
                        {servicio}
                      </label>
                    </li>
                  ))}

                  {/* //////////////////////////////////////////////////////////////////////////////// */}

                  <div className="campo-anotacion">
                    <label className="anotacion" for="precioProducto">
                      Precio del producto *
                    </label>
                    <input
                      id="precioProducto"
                      className="campo-formulario"
                      type="number"
                      placeholder="Ingresa el precio del producto "
                      value={nuevoProducto.precioUnitario}
                      onChange={onChangePreciounitario}
                    />
                  </div>
                  {/* Falta en precio parsear pero mantener 2 decimales, ahora pasa todo a numero entero sin decimal */}

                  {/* //////////////////////////////////////////////////////////////////////////////// */}

                  <div className="campo-anotacion">
                    <label className="anotacion" for="tipoEspacio">
                      Elija el tipo de Espacio
                    </label>
                    <select
                      id="tipoEspacio"
                      className="campo-formulario"
                      type="number"
                      placeholder="Elija el tipo de espacio"
                      value={nuevoProducto.id_Tipo_Espacio}
                      onChange={onChangeAbiertoCerrado}
                      required
                    >
                      <option className="item-grid" value={1}>
                        OFICINA ESPACIO ABIERTO
                      </option>
                      <option className="item-grid" value={0}>
                        OFICINA ESPACIO CERRADO
                      </option>
                    </select>
                  </div>

                  {/* //////////////////////////////////////////////////////////////////////////////// */}

                  <div className="campo-anotacion">
                    <label className="anotacion" for="sede">
                      Elija una Sede *
                    </label>
                    <select
                      id="sede"
                      className="campo-formulario"
                      type="text"
                      placeholder="Elija una Sede"
                      value={nuevoProducto.idSede}
                      onChange={onChangeSede}
                      required
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
                    </select>
                  </div>
                  {/* ////////////////////DISPONIBLE//////////////////////////////////////////// */}

                  <div className="campo-anotacion">
                    <label className="anotacion" for="disponible">
                      Esta Disponible? *
                    </label>
                    <select
                      id="disponible"
                      className="campo-formulario"
                      type="text"
                      placeholder="Elija un tipo de recurso"
                      value={nuevoProducto.estadoRecurso}
                      onChange={onChangeDisponibilidad}
                      required
                    >
                      <option className="item-grid" value="Disponible">
                        Disponible
                      </option>
                      <option className="item-grid" value="No disponible">
                        No disponible
                      </option>
                    </select>
                  </div>

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

                  {/* //////////////-----------------------------////////////// */}
                  <div className="boton-acceso-agregar-producto">
                    <button className="boton" type="submit">
                      Guardar
                    </button>
                    <button className="boton" type="reset">
                      Cancelar
                    </button>
                  </div>
                </div>
                {form && (
                  <h5 className="msj-form-guardado">
                    Gracias !! Tu producto ha sido guardado!
                  </h5>
                )}
              </form>
              <div className="acceso-cuenta-o-usuarionuevo"></div>
            </div>
            <div className="segmento-preview">
              <h1 className="titulo-preview">Preview Carga de producto</h1>
              <CardProductoSimulado
                className="card-simulada"
                title={nuevoProducto.nombre}
                descripcion={nuevoProducto.descripción}
                url={nuevoProducto.imagenURL}
                precio={nuevoProducto.precioUnitario}
              />
            </div>
          {/* </Container> */}
        </div>
      </div>
    </div>
  );
};

export default AgregarProducto;
