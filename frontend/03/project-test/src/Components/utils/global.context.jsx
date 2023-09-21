import React, { createContext, useContext, useState, useEffect } from "react";
export const ContextGlobal = createContext();
import axios from "axios";
import buscadorNombresEnLogIn from "./buscadorNombresEnLogIn";

export const ContextProvider = ({ children }) => {
  //////////////////////////LOGUEO //////////////////Autenticacion
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [userIdLogIn, setUserIdLogIn] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rol, setRol] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [tokenUserState, setTokenUserState] = useState(null);
  const [userLogIn, setUserLogIn] = useState({
    username: "",
    password: "",
  });
  const [email, setEmail] = useState(null);
  const [errorLogueo, setErrorLogueo] = useState("");
  // const [mensajeLog, setMensajeLog] = useState("");

  const realizarLogIn = async () => {
    const { username, password } = userLogIn;

    // Validar los datos
    if (!username || !password) {
      setErrorLogueo("Ingrese un nombre de usuario y una contraseña");
      return;
    }

    // solicitud POST a la API
    const urlBaseGuardar = "http://52.32.210.155:8080/auth/login";
    const body = JSON.stringify({
      username,
      password,
    });
    console.log("Body ", body);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    try {
      const response = await fetch(urlBaseGuardar, options);
      setErrorLogueo("Logueando usuario...");
      if (response.ok) {
        setErrorLogueo(`Gracias por ingresar ${username}`);
        const data = await response.json();
        console.log(data);
        if (data.token) {
          setErrorLogueo(`Gracias por ingresar ${username}`);
          handleSuccessfulLogin(data);
        } else {
          setErrorLogueo("Error al iniciar sesión: No se recibió un token");
        }
      } else if (response.status === 401) {
        setErrorLogueo("Credenciales incorrectas");
      } else {
        setErrorLogueo(
          "Error al iniciar sesión. Por favor, revisa tus credenciales."
        );
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setErrorLogueo(
        "Error al iniciar sesión. Por favor, revisa tus credenciales."
      );
    }
  };

  const handleSuccessfulLogin = (data) => {
    // setErrorLogueo(`Gracias por ingresar ${username}`);
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("idUsuario", data.idUsuario);
    localStorage.setItem("username", data.username);
    localStorage.setItem("rol", data.rol);
    localStorage.setItem("nombreCompleto", data.nombreCompleto);

    // const idUser = buscadorNombresEnLogIn(userLogIn.username, usersLista);
    // localStorage.setItem("userId", idUser);
    const tokenUser = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");
    const rol = localStorage.getItem("rol");
    const nombreCompletoStorage = localStorage.getItem("nombreCompleto");
    const emailStorage = localStorage.getItem("username");

    setTokenUserState(tokenUser);
    setLoginSuccess(true);
    setUserIdLogIn(idUsuario);
    setUsuarios(data);
    setUsuarioLogueado(nombreCompletoStorage);
    setRol(rol);
    setNombreCompleto(nombreCompletoStorage);
    setEmail(emailStorage);
    // console.log("ROL ----------------------- >", rol);
    // console.log(
    //   "nombreCompleto ----------------------- >",
    //   nombreCompletoStorage
    // );
    // console.log("username ----------------------- >", userNameStorage);
    if (rol === "ADMINISTRADOR") {
      setIsAdmin(true);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("username");
    localStorage.removeItem("rol");
    localStorage.removeItem("nombreCompleto");
    setIsAdmin(false);
    setUsuarioLogueado(null);
    window.location.replace("/");
    // console.log("----------Cerrando sesión. en Context .---------");
  };

  ////////////////////////////////// Registro User

  ///Modal Fotos ////
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  /////////////////////// Escuchar el ancho de pantalla
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Agrega un evento para escuchar los cambios en el tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  ///////////////////////GetDatosLista
  const [productosBKLista, setProductosBKLista] = useState([]);

  const getDatosBKLista = async () => {
    const res = await fetch("http://52.32.210.155:8080/auth/recursos/list");
    const data = await res.json();

    setProductosBKLista(data);
  };

  useEffect(() => {
    getDatosBKLista();
  }, []);

  ///////////////////////////////// Get Recurso XID
  const [recursoXID, setRecursoXID] = useState(null);

  const getRecursoXID = async (id) => {
    const response = await axios.get(
      `http://52.32.210.155:8080/auth/recursos/${id}`
    );
    const data = response.data;

    setRecursoXID(data);
  };

  /////////////////////////////////// GET USERS
  // const [usersLista, setUsersLista] = useState([]);
  // const urlUsers = "http://52.32.210.155:8080/api/v1/usuarios/list";

  // const getDatosUsers = async () => {
  //   const res = await fetch("http://52.32.210.155:8080/api/v1/usuarios/list");
  //   const data = await res.json();
  //   setUsersLista(data);
  // };
  // useEffect(() => {
  //   getDatosUsers();
  // }, []);

  const [usersLista, setUsersLista] = useState([]);
  // const urlUsers = "http://52.32.210.155:8080/api/v1/usuarios/list";
  // const getTokenUser = localStorage.getItem("token");

  // console.log("-------------- > getTokenUser", tokenUserState);
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer "${tokenUserState}"`,
  };

  const getDatosUsers = async () => {
    const urlUsers = "http://52.32.210.155:8080/auth/usuario/list";
    // console.log("-------------- > getTokenUser", tokenUserState);
    // console.log("-------------- > urlUsers", urlUsers);

    try {
      const response = await axios.get(urlUsers, headers);

      if (response.status === 200) {
        const data = response.data;
        // console.log("Respuesta:", data);
        setUsersLista(data);
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
  };

  useEffect(() => {
    getDatosUsers();
  }, []);

  //////////////////////////

  const [usersXID, setUsersXID] = useState([]);

  const getDatosUsersXID = async (id) => {
    const urlUsers = `http://52.32.210.155:8080/auth/usuario/${id}`;

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(urlUsers, headers);

      if (response.status === 200) {
        const data = response.data;
        console.log("Respuesta:", data);
        setUsersXID(data);
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
  };

  /////////////////////////////////GetCategorias
  const [categoriasLista, setCategoriasLista] = useState([]);

  const getCategoriasLista = async () => {
    const res = await fetch("http://52.32.210.155:8080/auth/categoria/list");
    const data = await res.json();

    // console.log(data);
    setCategoriasLista(data);
  };

  const [caracteristicasLista, setCaracteristicasLista] = useState([]);

  const getCaracteristicasLista = async () => {
    const res = await fetch(
      "http://52.32.210.155:8080/auth/caracteristicas/list"
    );
    const data = await res.json();
    setCaracteristicasLista(data);
  };

  useEffect(() => {
    getCaracteristicasLista();
  }, []);

  /////////////////////// Get Caracteristicas por ID
  const [caracteristicasXID, setCaracteristicasXID] = useState([]);

  const getCaracteristicasXID = async (id) => {
    const res = await fetch(`http://52.32.210.155:8080/auth/inter/${id}`);
    const data = await res.json();
    setCaracteristicasXID(data);
  };

  // useEffect(() => {
  //   getCaracteristicasLista();
  // }, []);

  /////////////////////////////// Politicas por ID Recurso

  const [politicasXID, setPoliticasXID] = useState([]);

  const getPoliticasXID = async (id) => {
    const res = await fetch(`http://52.32.210.155:8080/auth/politicas/${id}`);
    const data = await res.json();

    setPoliticasXID(data);
  };

  ////////////////////////////////

  const [politicas, setPoliticas] = useState([]);

  const getPoliticas = async () => {
    const res = await fetch(`http://52.32.210.155:8080/auth/politicas/list`);
    const data = await res.json();

    setPoliticas(data);
  };

  /////////////////////////////////// Puntaje promedio por IDRecurso

  const [puntosPromedioXIDRecurso, setPuntosPromedioXIDRecurso] = useState([]);

  const getPuntosPromedioXIDRecurso = async (id) => {
    try {
      const response = await axios.get(
        `http://52.32.210.155:8080/auth/puntaje/${id}/promedio`
      );

      if (response.status === 404 || isNaN(response.data)) {
        setPuntosPromedioXIDRecurso(0);
        return 0; // Devuelve 0 si la respuesta es 404 o no es un número válido
      }
      setPuntosPromedioXIDRecurso(Number(response.data));
      return Number(response.data);
    } catch (error) {
      console.error("Error al obtener puntos promedio:", error);
      return 0; // Devuelve 0 en caso de error
    }
  };

  //// If response.data === 0  setPuntosPromedioXIDRecurso(0);

  ////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////Favoritos X ID

  const [favoritosXID, setFavoritosXID] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [favoritos, setFavoritos] = useState([]);

  const getFavoritosXID = async (id) => {
    const res = await fetch(`http://52.32.210.155:8080/auth/favoritos/${id}`);
    const data = await res.json();

    const newArray = data.map((item) => ({ idRecurso: item.idRecurso }));

    setFavoritosXID(newArray);
  };

  const [listaFavXUserId, setListaFavXUserId] = useState([]);

  const getListaFavXUserID = async (id) => {
    const res = await fetch(`http://52.32.210.155:8080/auth/favoritos/${id}`);
    const data = await res.json();
    setListaFavXUserId(data);
  };

  // const getFavoritos = async (id) => {
  //   const res = await fetch(`http://52.32.210.155:8080/auth/favoritos/${id}`);
  //   const data = await res.json();

  //   setFavoritos(data);
  // };

  ///////// Guardar Favoritos
  // auth/favoritos/save
  const [errorFavoritos, setErrorFavoritos] = useState("");
  const [favorito, setFavorito] = useState({
    idUsuario: 0,
    idRecurso: 0,
    favorito: 1,
    vigente: 1,
    fecha_MarcacionFavorito: "2023-09-14",
  });

  const guardarFavorito = async (idUsuario, iDRecursos) => {
    setFavorito({
      idUsuario: idUsuario,
      idRecurso: iDRecursos,
      favorito: 1,
      vigente: 1,
      fecha_MarcacionFavorito: "2023-09-14",
    });

    // solicitud POST a la API
    const urlBaseGuardar = "http://52.32.210.155:8080/auth/favoritos/save";
    const body = JSON.stringify(favorito);
    console.log("Body ", body);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };
    console.log("options ", options);
    try {
      const response = await fetch(urlBaseGuardar, options);
      setErrorFavoritos("Intentando conectar");
      if (response.ok) {
        // setErrorLogueo(`Gracias por ingresar ${username}`);
        const data = await response.json();
        console.log(data);
      } else if (response.status === 401) {
        setErrorFavoritos("Datos incorrectos");
      } else {
        setErrorFavoritos("Pruebe más tarde");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setErrorFavoritos(
        "Error al realizar la acción. Por favor, revisa tus credenciales."
      );
    }
  };

  /////////////////////Actualizar Favortos
  // postActualizarFavorito
  // actualizarFavorito, setActualizarFavorito
  // errorActFavoritos, setErrorActFavoritos
  const [errorActFavoritos, setErrorActFavoritos] = useState("");
  const [actualizarFavorito, setActualizarFavorito] = useState({
    idUsuario: 0,
    idRecurso: 0,
    favorito: 1,
    vigente: 1,
    fecha_MarcacionFavorito: "2023-09-14",
    id: 0,
  });

  const postActualizarFavorito = async (
    idFavorito,
    favorito,
    userId,
    idRecurso
  ) => {
    setActualizarFavorito({
      id: idFavorito,
      favorito: favorito,
      vigente: 1,
      fecha_MarcacionFavorito: "2023-09-14",
    });

    //     // solicitud POST a la API
    const urlBaseGuardar = "http://52.32.210.155:8080/auth/favoritos/update";
    const body = JSON.stringify({
      idUsuario: userId,
      idRecurso: idRecurso,
      favorito: favorito,
      vigente: 1,
      fecha_MarcacionFavorito: "2023-09-14",
      id: idFavorito,
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };
    console.log("options ", options);
    try {
      const response = await fetch(urlBaseGuardar, options);
      setErrorActFavoritos("Intentando conectar");
      if (response.ok) {
        // setErrorLogueo(`Gracias por ingresar ${username}`);
        const data = await response.json();
        console.log(data);
      } else if (response.status === 401) {
        setErrorActFavoritos("Datos incorrectos");
      } else {
        setErrorActFavoritos("Pruebe más tarde");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setErrorActFavoritos(
        "Error al realizar la acción. Por favor, revisa tus credenciales."
      );
    }
  };

  ///////////////////////////////////////////////////////////

  const [rating, setRating] = useState(null);

  ///////////////////////////////// Puntajes y comentarios por IdRecurso
  const [puntosComentXIDRecurso, setPuntosComentXIDRecurso] = useState([]);

  const getPuntosComentXIDRecurso = async (id) => {
    const res = await fetch(`http://52.32.210.155:8080/auth/puntaje/${id}`);
    const data = await res.json();

    setPuntosComentXIDRecurso(data);
  };

  //////////////////////////////// Guardar Comentario y puntos
  const [datosPuntuarComentar, setDatosPuntuarComentar] = useState([]);
  const [mensajePostComentario, setMensajePostComentario] = useState("");
  const fechaActualPuntuacion = new Date();
  const fechaFormateada = fechaActualPuntuacion.toISOString().split("T")[0];
  const [formEnviadoComentario, setFormEnviadoComentario] = useState(false);
  const postPuntuarComentar = async (
    idUsuario,
    idRecurso,
    puntuacion,
    comentario
  ) => {
    // preparacion de datos
    setDatosPuntuarComentar({
      idUsuario: idUsuario,
      idRecurso: idRecurso,
      puntuacion: puntuacion,
      comentario: comentario,
      fecha_valoracion: fechaFormateada,
    });
    console.log(datosPuntuarComentar);

    const urlBaseGuardar = "http://52.32.210.155:8080/auth/puntaje/save";

    const body = JSON.stringify({
      idUsuario: idUsuario,
      idRecurso: idRecurso,
      puntuacion: puntuacion,
      comentario: comentario,
      fecha_valoracion: fechaFormateada,
    });

    console.log("datosPuntuarComentar BODY JSON.stringify", body);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    try {
      const response = await fetch(urlBaseGuardar, options);

      if (response.ok) {
        setMensajePostComentario(`Gracias por valorar nuestros servicios`);
        const data = await response.json();
        console.log(data);
        setFormEnviadoComentario(true);
      } else if (response.status === 401) {
        setMensajePostComentario("Datos incorrectos");
      } else {
        setErrorLogueo(
          "Error al intentar realizar la operación. Por favor, intente más tarde."
        );
      }
      setFormEnviadoComentario(true);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setMensajePostComentario(`Error al realizar la solicitud: ${error}`);
    }
    setFormEnviadoComentario(true);
  };

  //////////////////////////////////////////////////////////////
  const [nuevoUsuario, setNuevoUsuario] = useState([]);

  //////////////////////////////////////////// FECHAS ////////////////////////
  const [fechasBusqueda, setFechasBusqueda] = useState([null, null]);

  //////////////////////////Buscar por sede   /////////////////////////////////
  const [idFilteredSedes, setIdFilteredSedes] = useState([]);
  const [filteredSedes, setFilteredSedes] = useState([]);

  //////////////////////////Buscar por nombre  en Sede ///////////////////////
  const [idFilteredName, setIdFilteredName] = useState([]);
  const [filteredName, setfilteredName] = useState([]);

  ////////////////////////////// Buscar por nombre //////////////////////////

  const [filteredNombre, setFilteredNombre] = useState([]);

  /////////////////////////////  Productos a mostrar en busqueda ////////////
  const [prodFiltrados, setProdFiltrados] = useState([]);
  const [busquedaCero, setBusquedaCero] = useState(false); /// define mensaje de error en resultado 0 en las busquedas
  const [tituloListadoProductos, setTituloListadoProductos] =
    useState("Productos");

  useEffect(() => {
    async function actualizarTitulo() {
      if (prodFiltrados.length > 0) {
        setTituloListadoProductos(
          `Resultados de tu búsqueda ${prodFiltrados.length} productos`
        );
      } else if (
        prodFiltrados.length ==
        0 /*&& tituloListadoProductos !== "Resultados de tu búsqueda"*/
      ) {
        setTituloListadoProductos("Productos");
      }
    }

    actualizarTitulo();
  }, [prodFiltrados, tituloListadoProductos]);

  ////////////////////////////////////// Reservas

  const [reservas, setReservas] = useState([]);

  const getReservas = async (id) => {
    const response = await axios.get(
      `http://52.32.210.155:8080/auth/reserva/usuario/${id}`
    );
    const data = response.data;
    console.log(data);
    setReservas(data);
  };

  ////////////////////////////////////// Guardar Reservas

  const [guardarReserva, setGuardarReserva] = useState({
    nombre: "",
    apellido: "",
    idUsuario: 0,
    idRecurso: 0,
    inicioReserva: "",
    estadoReserva: 0,
    email: "",
    finalizacionReserva: "",
    fechaRealizacionReserva: "",
  });

  // const postReserva = async (
  // nombre,
  // apellido,
  // idUsuario,
  // idRecurso,
  // inicioReserva,
  // estadoReserva,
  // email,
  // finalizacionReserva,
  // fechaRealizacionReserva
  // ) => {
  // const datosReserva2 = {
  //   nombre: "Eduardo",
  //   apellido: "Gonzales",
  //   idUsuario: 56,
  //   idRecurso: 176,
  //   inicioReserva: "2023-09-12",
  //   estadoReserva: 1,
  //   email: "prueba15@gmail.com",
  //   finalizacionReserva: "2023-09-14",
  //   fechaRealizacionReserva: "2023-09-10"

  // setGuardarReserva({
  //   nombre: nombre,
  // apellido:apellido,
  // idUsuario: idUsuario,
  // idRecurso: idRecurso,
  // inicioReserva: inicioReserva,
  // estadoReserva: estadoReserva,
  // email: email,
  // finalizacionReserva:finalizacionReserva,
  // fechaRealizacionReserva: fechaRealizacionReserva,
  // })
  // }

  // try {
  //   const urlReserva = "http://52.32.210.155:8080/auth/reserva/save"; // Reemplaza esto con tu URL real
  //   const jsonDataReserva = JSON.stringify(guardarReserva);
  //   console.log("datosReserva", jsonDataReserva);
  //   const response = await fetch(urlReserva, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: jsonDataReserva,
  //   });

  //   if (response.ok) {
  //     const responseData = await response.json();
  //     console.log("Respuesta:", responseData);
  //   } else {
  //     console.error(
  //       "Error en la respuesta:",
  //       response.status,
  //       response.statusText
  //     );
  //   }
  // } catch (error) {
  //   console.error("Error:", error);
  // }
  ///////////////datosReserva stringify///////////////////

  // try {
  //   const jsonDataReserva = JSON.stringify(datosReserva);
  //   console.log("jsonDataReserva ---------- > ", jsonDataReserva)

  //   const response = await axios.post(urlReserva, datosReserva, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (response.status === 200) {
  //     const responseData = await response.data;
  //     console.log("Respuesta:", responseData);
  //   } else {
  //     console.error(
  //       "Error en la respuesta:",
  //       response.status,
  //       response.statusText
  //     );
  //   }
  // } catch (error) {
  //   console.error("Error:", error);
  // }
  // };

  ///////////////////////////////////

  const [infoRecursoAReservar, setInfoRecursoAReservar] = useState({
    idRecurso: 0,
    fechaInicio: "2023-08-31T00:00:00.000+00:00",
    fechaFin: "2023-09-05T00:00:00.000+00:00",
    idUser: 0,
    precioProducto: 0,
    precioTotal: 0,
    dias: 0,
    fechaRealizacionReserva: "2023-09-05T00:00:00.000+00:00",
  });

  // const [fechasInicioDetalle, setFechasInicioDetalle] = useState([null, null]);
  // const [fechasFinDetalle, setFechasFinDetalle] = useState([null, null]);
  // const [fechasResDetalle, setFechasResDetalle] = useState([null, null]);

  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [cantidadDias, setCantidadDias] = useState(null);

  const [reservasPorRecurso, setReservasPorRecurso] = useState([]);

  const getReservasPorRecurso = async (id) => {
    const response = await axios.get(
      `http://52.32.210.155:8080/auth/reserva/recurso/${id}`
    );
    const data = response.data;

    setReservasPorRecurso(data);
    // console.log(`reservasPorRecurso ${id}`, data   )
  };

  const [arrayFechasReservasXRecurso, setArrayFechasReservasXRecurso] =
    useState([]);

  const getArrayFechasReservasXRecurso = async (id) => {
    const response = await axios.get(
      `http://52.32.210.155:8080/auth/reserva/recurso/${id}`
    );
    const data = response.data;

    const fechas = [];

    for (const objeto of data) {
      const inicioReserva = new Date(objeto.inicioReserva);
      const finalizacionReserva = new Date(objeto.finalizacionReserva);
      console.log("finalizacionReserva", finalizacionReserva);

      const ultimaFecha = new Date(finalizacionReserva);
      ultimaFecha.setDate(finalizacionReserva.getDate() + 1);

      const primeraFecha = new Date(inicioReserva);
      primeraFecha.setDate(inicioReserva.getDate() + 1);

      if (inicioReserva.toDateString() !== finalizacionReserva.toDateString()) {
        // Si las fechas no son iguales, agregamos todas las fechas intermedias
        const fechaActual = new Date(inicioReserva);

        while (primeraFecha <= ultimaFecha) {
          fechas.push(new Date(primeraFecha));
          primeraFecha.setDate(primeraFecha.getDate() + 1);
        }
      } else {
        // Si las fechas son iguales, agregamos solo una vez la fecha de inicio
        fechas.push(primeraFecha);
      }
    }

    // Luego de procesar los datos y crear el array de fechas, lo asignamos al estado
    setArrayFechasReservasXRecurso(fechas);

    // console.log(`reservasPorRecurso ${id}`, data);
    // console.log("inicioReserva ---------Context---", inicioReserva)
    // console.log("finalizacionReserva -----------Context---", finalizacionReserva)
  };
  // console.log(`reservasPorRecurso arrayFechasReservasXRecurso`, arrayFechasReservasXRecurso);

  //////////////////////////////////////////////////////////////////////////////////////////////////

  const [fechaInicioBusqueda, setFechaInicioBusqueda] = useState(new Date());
  const [fechaFinBusqueda, setFechaFinBusqueda] = useState(new Date());
  const [cantidadDiasBusqueda, setCantidadDiasBusqueda] = useState(null);



//////////////////////////////////////////
const [openLogIn, setOpenLogIn] = useState(false);


  ///////////////////////////////////////
  return (
    <ContextGlobal.Provider
      value={{
        openLogIn, setOpenLogIn,
        rating, setRating,
        postPuntuarComentar,
        postActualizarFavorito,
        actualizarFavorito,
        setActualizarFavorito,
        errorActFavoritos,
        setErrorActFavoritos,
        fechaFinBusqueda,
        setFechaFinBusqueda,
        cantidadDiasBusqueda,
        setCantidadDiasBusqueda,
        fechaInicioBusqueda,
        setFechaInicioBusqueda,
        politicas,
        setPoliticas,
        getPoliticas,
        arrayFechasReservasXRecurso,
        getArrayFechasReservasXRecurso,
        getReservasPorRecurso,
        reservasPorRecurso,
        cantidadDias,
        setCantidadDias,
        fechaInicio,
        setFechaInicio,
        fechaFin,
        setFechaFin,
        // fechasResDetalle, setFechasResDetalle,
        // fechasFinDetalle, setFechasFinDetalle,
        // fechasInicioDetalle, setFechasInicioDetalle,
        email,
        setEmail,
        infoRecursoAReservar,
        setInfoRecursoAReservar,
        getDatosUsersXID,
        usersXID,
        setUsersXID,
        guardarReserva,
        setGuardarReserva,
        // postReserva,
        getReservas,
        reservas,
        setReservas,
        listaFavXUserId,
        setListaFavXUserId,
        getListaFavXUserID,
        tokenUserState,
        setTokenUserState,
        isAdmin,
        setIsAdmin,
        nombreCompleto,
        setNombreCompleto,
        rol,
        setRol,
        setUsuarios,
        loginSuccess,
        setLoginSuccess,
        // userNameStorage,
        busquedaCero,
        setBusquedaCero,
        tituloListadoProductos,
        guardarFavorito,
        favoritos,
        setFavoritos,

        isFav,
        setIsFav,
        favoritosXID,
        setFavoritosXID,
        getFavoritosXID,
        puntosComentXIDRecurso,
        setPuntosComentXIDRecurso,
        getPuntosComentXIDRecurso,
        puntosPromedioXIDRecurso,
        setPuntosPromedioXIDRecurso,
        getPuntosPromedioXIDRecurso,
        politicasXID,
        setPoliticasXID,
        getPoliticasXID,
        userIdLogIn,
        setUserIdLogIn,
        errorLogueo,
        userLogIn,
        setUserLogIn,
        setErrorLogueo,
        realizarLogIn,
        prodFiltrados,
        setProdFiltrados,
        filteredNombre,
        setFilteredNombre,
        idFilteredName,
        setIdFilteredName,
        filteredName,
        setfilteredName,
        filteredSedes,
        setFilteredSedes,
        idFilteredSedes,
        setIdFilteredSedes,
        fechasBusqueda,
        setFechasBusqueda,
        usuarioLogueado,
        setUsuarioLogueado,
        caracteristicasXID,
        getCaracteristicasXID,
        cerrarSesion,
        categoriasLista,
        setCategoriasLista,
        getCategoriasLista,
        caracteristicasLista,
        setCaracteristicasLista,
        getCaracteristicasLista,
        usersLista,
        setUsersLista,
        getDatosUsers,
        productosBKLista,
        setProductosBKLista,
        getDatosBKLista,
        recursoXID,
        setRecursoXID,
        getRecursoXID,
        showModal,
        selectedImage,
        closeModal,
        openModal,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};
