import React, { createContext, useContext, useState, useEffect } from "react";
export const ContextGlobal = createContext();
import axios from "axios";


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

  ///////////////////////GetDatosLista 
  const [productosBKLista, setProductosBKLista] = useState([]);

  const getDatosBKLista = async () => {
    const res = await fetch("http://52.32.210.155:8080/api/v1/recursos/list");
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
      `http://52.32.210.155:8080/api/v1/recursos/unico/${id}`
    );
    const data = response.data;

    setRecursoXID(data);
 
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
    // console.log(data);
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
    // console.log(data);
  };

  useEffect(() => {
    getCategoriasLista();
  }, []);

  ///////////////// Get Caracteristicas
  const [caracteristicasLista, setCaracteristicasLista] = useState([]);
  
  const getCaracteristicasLista = async () => {
    const res = await fetch(
      "http://52.32.210.155:8080/api/v1/caracteristicas/list"
    );
    const data = await res.json();

    setCaracteristicasLista(data);
   
  };

  useEffect(() => {
    getCaracteristicasLista();
  }, []);

  //////////////////////////LOGUEO //////////////////Autenticacion
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(
        "http://52.32.210.155:8080/api/v1/usuarios/list"
      );
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  //   console.log("Usuarios antes de validaciones");
  // console.log(usuarios);
  const iniciarSesion = (nombre, email, password) => {
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.nombreCompleto === nombre &&
        usuario.correo === email &&
        usuario.contraseña === password
    );

    if (usuarioEncontrado) {
      setUsuarioLogueado(usuarioEncontrado);
      localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuarioEncontrado)
      );
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

  //////////////////////////////////////////// FECHAS
  const [fechasBusqueda, setFechasBusqueda] = useState([null, null]);


//////////////////////////Buscar por sede   ///////////////////////////////// 
const [idFilteredSedes, setIdFilteredSedes] = useState([]);
const [filteredSedes, setFilteredSedes] = useState([]);

//////////////////////////Buscar por nombre   ///////////////////////////////// 
const [idFilteredName, setIdFilteredName] = useState([]);
const [filteredName, setfilteredName] = useState([]);


///////////////////////////////////Paginado 

/////////////////////////////////////////

////////////////////////////// Buscar por nombre

const [filteredNombre, setFilteredNombre] = useState([]);

/////////////////////////////
const [prodFiltrados, setProdFiltrados] = useState([]);

  return (
    <ContextGlobal.Provider
      value={{
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
        iniciarSesion,
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
