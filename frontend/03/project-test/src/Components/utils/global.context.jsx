import React, { createContext, useContext, useState, useEffect } from "react";
export const ContextGlobal = createContext();
import axios from "axios";
// const { useHistory } = require("react-router-dom");

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

  /////////GetDatosLista //////////////
  const [productosBKLista, setProductosBKLista] = useState([]);

  const getDatosBKLista = async () => {
    const res = await fetch("http://52.32.210.155:8080/api/v1/recursos/list");
    const data = await res.json();

    setProductosBKLista(data);
    console.log(productosBKLista);
  };

  useEffect(() => {
    getDatosBKLista();
  }, []);

  /////////////////////////////////
  const [recursoXID, setRecursoXID] = useState(null);

  const getRecursoXID = async (id) => {
    const response = await axios.get(`http://52.32.210.155:8080/api/v1/recursos/unico/${id}`);
    const data = response.data;

    setRecursoXID(data);
    console.log(data);
  };

  useEffect(() => {
    getRecursoXID();
  }, []);

  /////////////////////////////////// GET USERS
  const [usersLista, setUsersLista] = useState([]);
  const getDatosUsers = async () => {
    const res = await fetch("http://52.32.210.155:8080/api/v1/usuarios/list");
    const data = await res.json();

    setUsersLista(data);
    console.log(data);
  };

  useEffect(() => {
    getDatosUsers();
  }, []);

  /////////////////////////////////GetCategorias

  const [categoriasLista, setCategoriasLista] = useState([]);
  const getCategoriasLista = async () => {
    const res = await fetch("http://52.32.210.155:8080/api/v1/categorias/list");
    const data = await res.json();

    setCategoriasLista(data);
    console.log(data);
  };

  useEffect(() => {
    getCategoriasLista();
  }, []);

  ///////////////// Get Caracteristicas

  const [caracteristicasLista, setCaracteristicasLista] = useState([]);
  const getCaracteristicasLista = async () => {
    const res = await fetch("http://52.32.210.155:8080/api/v1/categorias/list");
    const data = await res.json();

    setCategoriasLista(data);
    console.log(data);
  };

  useEffect(() => {
    getCategoriasLista();
  }, []);

  //////////////////////////LOGUEO //////////////////Autenticacion
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://52.32.210.155:8080/api/v1/usuarios/list");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const iniciarSesion = (nombre, email, password) => {
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.nombreCompleto === nombre && usuario.correo === email && usuario.contraseña === password
    );
  
    if (usuarioEncontrado) {
      setUsuarioLogueado(usuarioEncontrado);
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
      
    
    } else {
      console.log("Credenciales incorrectas");
    }
  };

  
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioGuardado) {
      setUsuarioLogueado(usuarioGuardado);
    }
  }, []);
  // const history = useHistory();
  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");
    setUsuarioLogueado(null);
    console.log("----------Cerrando sesión. en Context .---------");
    // history.push("/");
  };

  ////////////////////////////////////////////

  return (
    <ContextGlobal.Provider
      value={{
        usuarioLogueado, 
        iniciarSesion, 
        cerrarSesion,
        categoriasLista,
        setCategoriasLista,
        getCategoriasLista,
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
