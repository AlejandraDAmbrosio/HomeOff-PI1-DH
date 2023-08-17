import React, { useState, useContext, useEffect } from "react";
import { useLocalStorage } from "../Components/utils/useLocalStorage";
import "../Components/AgregarProducto.css";
import Error from "../Components/Error";
import { Boton } from "../Components/Genericos/Boton";

import { ContextGlobal } from "../Components/utils/global.context";
import "../Components/Genericos/CardProductoSimulado.css";
import CardProductoSimulado from "../Components/Genericos/CardProductoSimulado";

const AgregarProducto = () => {
  //// Variables y constantes ////
  const urlBase = "http://52.32.210.155:8080/api/v1/recursos/";
  const jwt = localStorage.getItem("jwt");
  const { productosBKLista, setProductosBKLista, getDatosBKLista } =
    useContext(ContextGlobal);

  const [showPreview, setShowPreview] = useState(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const MAX_SELECTED_SERVICES = 5;

  /////// Preparar obbjeto para enviar al servidor    ///////

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripción: "",
    capacidadMáxima: 1,
    precioUnitario: 1,
    idSede: 1,
    imagenURL: "",
    imagenUrl01: "",
    imagenUrl02: "",
    imagenUrl03: "",
    imagenUrl04: "",
    tipoDeRecurso: "OFICINAPRIVADA",
    estadoRecurso: "DISPONIBLE",
  });

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
      tipo: "Oficina House",
      valor: "SALAFLEXIBLE",
    },
    {
      id: 5,
      tipo: "Oficina Abierta",
      valor: "OFICINAPRIVADA",
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

  const serviciosArray = [
    {
      id: 1,
      tipo: "Wifi",
    },
    {
      id: 2,
      tipo: "Internet de alta velocidad",
    },
    {
      id: 3,
      tipo: "Impresora y escáner",
    },
    {
      id: 4,
      tipo: "Terraza",
    },
    {
      id: 5,
      tipo: "Sala de juegos",
    },
    {
      id: 6,
      tipo: "Estacionamiento",
    },
    {
      id: 7,
      tipo: "Locker",
    },
    {
      id: 8,
      tipo: "Seguridad privada",
    },
  ];

  const [form, setForm] = useState(false);

  //////////////////OnChanges///////////////

  const onChangeNombre = (e) => {
    setNuevoProducto({ ...nuevoProducto, nombre: e.target.value });
  };

  const onChangeDescripcion = (e) => {
    setNuevoProducto({ ...nuevoProducto, descripción: e.target.value });
  };

  const onChangeCapacidadMáxima = (e) => {
    setNuevoProducto({ ...nuevoProducto, capacidadMáxima: e.target.value });
  };

  const onChangePreciounitario = (e) => {
    setNuevoProducto({ ...nuevoProducto, precioUnitario: e.target.value });
  };

  const onChangeSede = (e) => {
    setNuevoProducto({ ...nuevoProducto, idSede: e.target.value });
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

  const onChangeTipoRecurso = (e) => {
    setNuevoProducto({ ...nuevoProducto, tipoDeRecurso: e.target.value });
  };

  const onChangeDisponibilidad = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      estadoRecurso: e.target.value,
    });
  };

  // const onChangeServicios = (e) => {
  //   const selectedServiceId = e.target.value;

  //   if (selectedServiceIds.includes(selectedServiceId)) {
  //     setSelectedServiceIds(
  //       selectedServiceIds.filter((id) => id !== selectedServiceId)
  //     );
  //   } else {
  //     if (selectedServiceIds.length < MAX_SELECTED_SERVICES) {
  //       setSelectedServiceIds([...selectedServiceIds, selectedServiceId]);
  //     }
  //   }
  // };

  ///////////////Validaciones ///////////////////
  const validarNombreProducto = (n) => {
    const regex = /^[A-Za-z\s]{6,40}$/;
    return regex.test(n);
  };

  // const validarFormulario = () => {
  //   validarNombreProducto(nuevoProducto.nombre);
  // };

  /////////handleSubmit //////
  const handleSubmitCrearProducto = (e) => {
    e.preventDefault();

    if (validarNombreProducto()) {
      setForm(true);
      // setShowPreview(true);
      // console.log(form);

      // const nuevoProductoData = {
      //   nombre: "Sala sala sala",
      //   descripción: "Sala sala sala",
      //   capacidadMáxima: 1,
      //   precioUnitario: 10.0,
      //   idSede: 1,
      //   // imagenURL: nuevoProducto.imagenURL,
      //   // imagenUrl01: nuevoProducto.imagenUrl01,
      //   // imagenUrl02: nuevoProducto.imagenUrl02,
      //   // imagenUrl03: nuevoProducto.imagenUrl03,
      //   // imagenUrl04: nuevoProducto.imagenUrl04,
      //   imagenURL:
      //     "https://drive.google.com/file/d/107pyQ8NvKzFtg6I9ZRUPe88eavWb95RT/view?usp=drive_link",
      //   imagenUrl01:
      //     "https://drive.google.com/file/d/107pyQ8NvKzFtg6I9ZRUPe88eavWb95RT/view?usp=drive_link",
      //   imagenUrl02:
      //     "https://drive.google.com/file/d/107pyQ8NvKzFtg6I9ZRUPe88eavWb95RT/view?usp=drive_link",
      //   imagenUrl03:
      //     "https://drive.google.com/file/d/107pyQ8NvKzFtg6I9ZRUPe88eavWb95RT/view?usp=drive_link",
      //   imagenUrl04:
      //     "https://drive.google.com/file/d/107pyQ8NvKzFtg6I9ZRUPe88eavWb95RT/view?usp=drive_link",

      //   tipoDeRecurso: "OFICINAPRIVADA",
      //   estadoRecurso: "DISPONIBLE",
      //   IdRecurso: 0,
      // };
      // console.log("------------------Info data nuevo producto------------------");
      // console.log(nuevoProducto);

      // console.log("------------------Info paquete enviado en nuevoProductoData ------------------");
      // console.log(nuevoProductoData);

      const bodyBase = {
        nombre: "xxxxxxxxxxxxxxxx",
        descripción: "xxxxxxxxxxxxxxxxxxxxx",
        capacidadMáxima: 5,
        precioUnitario: 999.11,
        idSede: 2,
        imagenURL:
        "https://c2-team4-images-test-bucket.s3.amazonaws.com/oficinaprivada.jpg",
        imagenUrl01:
          "https://c2-team4-images-test-bucket.s3.amazonaws.com/lockers.jpg",
        tipoDeRecurso: "OFICINAPRIVADA",
        imagenUrl02:
          "https://c2-team4-images-test-bucket.s3.amazonaws.com/mobiliario.jpg",
          imagenUrl03:
          "https://c2-team4-images-test-bucket.s3.amazonaws.com/oficinaprivada2.jpg",
        imagenUrl04:
          "https://c2-team4-images-test-bucket.s3.amazonaws.com/lockers.jpg",
        tipoDeRecurso: "OFICINAPRIVADA",
        estadoRecurso: "DISPONIBLE",
        categoria_id: 3,
        IdRecurso: 0,
      };
    
      console.log("ver body------------------------------------------------");
      console.log(JSON.stringify(bodyBase));

      async function enviarDatos() {
        try {
          const response = await fetch(
            "https://ecommerce-grupo4-k3d49f6tz-maorojas.vercel.app/api/v1/recursos/save",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyBase),
            }
          );

          if (!response.ok) {
            throw new Error("Error en la solicitud fetch");
          }
          const data = await response.json();
          console.log(data);

     
        } catch (error) {
          console.error(error);
        }
      }
    

      enviarDatos();
      // const configuraciones = {
      //   method: "POST",
      //   body: JSON.stringify(nuevoProductoData),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },

      // };

      // fetch(`${urlBase}save`, configuraciones)
      //   .then((respuesta) => {
      //     if (!respuesta.ok) {
      //       throw new Error("Error al enviar los datos");
      //     }
      //     return respuesta.json();
      //   })
      //   .then((info) => {
      //     console.log("Nuevo Producto 👇" + info);
      //     getDatosBKLista();
      //   })
      //   .catch((error) => console.log(error));

      console.log("Muestra el valor de toda la Lista ");
      console.log(productosBKLista);

      // useEffect(() => {
      //   getDatosBKLista();
      // }, []);

      /////ERROR ????////////////////////////
    } else {
      setForm(false);
      setNuevoProducto({
        nombre: "",
        descripción: "",
        capacidadMáxima: 0,
        precioUnitario: 0,
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
    <div className="division-form-preview">
      <div className="pagina-formulario-alta-producto">
        <div className="encabezado-formulario">
          <div className="titulo-form-inicio-sesion">Agrega productos</div>
        </div>

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
              />
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
                value={nuevoProducto.tipoDeRecurso}
                onChange={onChangeTipoRecurso}
              >
                {tipoRecursoArray.map((tipoRecurso) => (
                  <option
                    key={tipoRecurso.id}
                    className="item-grid"
                    value={tipoRecurso.valor}
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

            {/* <div className="campo-anotacion">
            <label className="anotacion">Selecciona hasta 5 servicios *</label>
            {serviciosArray.map((servicio) => (
              <div key={servicio.id}>
                <input
                  type="checkbox"
                  id={`servicio-${servicio.id}`}
                  name={`servicio-${servicio.id}`}
                  value={servicio.id}
                  checked={selectedServiceIds.includes(servicio.id)}
                  onChange={onChangeServicios}
                  disabled={
                    selectedServiceIds.length >= MAX_SELECTED_SERVICES &&
                    !selectedServiceIds.includes(servicio.id)
                  }
                />
                <label htmlFor={`servicio-${servicio.id}`}>
                  {servicio.tipo}
                </label>
              </div>
            ))}
          </div> */}

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

            <div className="campo-anotacion">
              <label className="anotacion" for="sede">
                Elija una Sede *
              </label>
              {/* <select
              id="sede"
              className="campo-formulario"
              type="text"
              placeholder="Elija una Sede"
              value={nuevoProducto.idSede}
              onChange={onChangeSede}
            >
              <option className="item-grid" value={nuevoProducto.idSede}>
                Argentina
              </option>
              <option className="item-grid" value={nuevoProducto.idSede}>
                Colombia
              </option>
              <option className="item-grid" value={nuevoProducto.idSede}>
                Chile
              </option>
              
            </select> */}

              <select
                id="sede"
                className="campo-formulario"
                type="text"
                placeholder="Elija una Sede"
                value={nuevoProducto.idSede}
                onChange={onChangeSede}
              >
                {sedesArray.map((sede) => (
                  <option key={sede.id} className="item-grid" value={sede.id}>
                    {sede.nombre}{" "}
                  </option>
                ))}
              </select>
            </div>

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
              >
                <option className="item-grid" value={true}>
                  DISPONIBLE
                </option>
                <option className="item-grid" value={false}>
                  NODISPONIBLE
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
              <button className="boton" type="submit" value="Guardar">
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
          tipoRecurso={nuevoProducto.tipoDeRecurso}
        />
      </div>
    </div>
  );
};

export default AgregarProducto;
