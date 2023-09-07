import React, { createContext, useContext, useState, useEffect } from "react";
export const ContextGlobal = createContext();
import axios from "axios";
import buscadorNombresEnLogIn from "./buscadorNombresEnLogIn";

export const ContextProvider = ({ children }) => {
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
  const [usersLista, setUsersLista] = useState([]);
  const getDatosUsers = async () => {
    const res = await fetch("http://52.32.210.155:8080/auth/usuario/list");
    const data = await res.json();
    setUsersLista(data);
  };
  useEffect(() => {
    getDatosUsers();
  }, []);
  /////////////////////////////////GetCategorias
  const [categoriasLista, setCategoriasLista] = useState([]);

  const getCategoriasLista = async () => {
    const res = await fetch("http://52.32.210.155:8080/auth/categoria/list");
    const data = await res.json();

    console.log(data);
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

  // useEffect(() => {
  //   getCaracteristicasLista();
  // }, []);

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

  //////////////////////////////////////Favoritos X ID

  const [favoritosXID, setFavoritosXID] = useState([]);
const [ isFav, setIsFav] = useState(false);
const [ favoritos, setFavoritos] = useState([]);

  const getFavoritosXID = async (id) => {
    const res = await fetch(`http://52.32.210.155:8080/auth/favoritos/${id}`);
    const data = await res.json();
    console.log("Data antes de inyectarse", data);
    const newArray = data.map((item) => ({ idRecurso: item.idRecurso }));
    console.log("newArray", newArray);
    setFavoritosXID(newArray);
  };

  const getIsFav  = async (id) => {
    const res = await fetch(`http://52.32.210.155:8080/auth/favoritos/${id}`);
    const data = await res.json();
    console.log("Data antes de inyectarse", data);
    const esFav = data.some((item) => item.idUsuario === userIdLogIn);
    
    console.log("esFav", esFav);
    setIsFav(esFav);
  };


  const getFavoritos  = async (id) => {
    const res = await fetch(`http://52.32.210.155:8080/auth/favoritos/${id}`);
    const data = await res.json();
    console.log("Data antes de inyectarse", data);
    
    setFavoritos(data);
  };


  ///////////////////////////////// Puntajes y comentarios por IdRecurso
  const [puntosComentXIDRecurso, setPuntosComentXIDRecurso] = useState([]);

  const getPuntosComentXIDRecurso = async (id) => {
    const res = await fetch(`http://52.32.210.155:8080/auth/puntaje/${id}`);
    const data = await res.json();

    setPuntosComentXIDRecurso(data);
    console.log("puntosComentXIDRecurso");
    console.log(puntosComentXIDRecurso);
  };

  //////////////////////////LOGUEO //////////////////Autenticacion

  const [userIdLogIn, setUserIdLogIn] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [userLogIn, setUserLogIn] = useState({
    username: "",
    password: "",
  });
  const [errorLogueo, setErrorLogueo] = useState("");

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

    const response = await fetch(urlBaseGuardar, options);

    if (response.ok) {
      const data = await response.json();

      if (data.token) {
        setErrorLogueo("");
        localStorage.setItem("token", data.token);
        console.log("Respuesta token:", data.token);
        localStorage.setItem("username", username);
        setUsuarios(data);
        console.log("Datos guardados de la respuesta en DATA");
        console.log(data);
        setUsuarioLogueado(username);
        console.log("username en Global" , username)
        const idUser = buscadorNombresEnLogIn(username, usersLista);
        setUserIdLogIn(idUser);
        console.log("userIdLogIn en Global" , userIdLogIn)
        localStorage.setItem("userId", userIdLogIn);
        window.location.replace("/");
      }
    } else {
      console.error("Error al iniciar sesión:", response);
      setErrorLogueo("Error al iniciar sesión");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("token");
    setUsuarioLogueado(null);
    window.location.replace("/");
    console.log("----------Cerrando sesión. en Context .---------");
  };

  //// chequear el idUsuario del username buscando en la lista de users

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

  return (
    <ContextGlobal.Provider
      value={{
        getIsFav,
        getFavoritos,
        isFav, setIsFav,
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
