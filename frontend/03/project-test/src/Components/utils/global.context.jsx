import React, { createContext, useContext, useState, useEffect } from "react";
import listadoProductosData from "../ListadoProductos.json";
import {useLocalStorageList} from '../utils/useStorageList.js'
export const ContextGlobal = createContext();
export const ContextProvider = ({ children }) => {

  // const [listaProductosBase, setListaProductosBase] = useLocalStorageList("listaProductosBase", listadoProductosData);

  ///////// este funcionaba
  // const [listaProductosBase, setListaProductosBase] = useState([]);
    // useEffect(() => {
    //   const cargarDatos = async () => {
    //     if (listaProductosBase.length === 0) {
    //       setListaProductosBase(listadoProductosData);
    //     }
    //   };
    //   cargarDatos();
    // }, [listaProductosBase]);

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

/////////////////////////////////////////////////////
  /////////GetOdontosID //////////////
  const [datoBKID, setDatoBKID] = useState([]);

  const getDatoBKID = async (id) => {
    try {
      const res = await fetch(`http://52.32.210.155:8080/api/v1/recursos/list`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      console.log("console del Listado en json");
      console.log(data);
      const productoID = data.find((item) => item.idRecurso === id);
      console.log("console de producto ID encontrado");
      console.log(productoID);
      setDatoBKID(productoID);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

///////////////////////////////////////////



  return (
    <ContextGlobal.Provider
      value={{
        productosBKLista, 
        setProductosBKLista,
        getDatosBKLista,
        datoBKID, 
        setDatoBKID, 
        getDatoBKID,
        // listaProductosBase,
        // setListaProductosBase,
        showModal,
        selectedImage,
        closeModal,
        openModal,
        // openModalCU,
        // closeModalCU,
        // showModalCU,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};

// useEffect(() => {
//   const storedData = localStorage.getItem("listaProductos");
//   if (storedData) {
//     setListaProductosBase(JSON.parse(storedData));
//   } else {
//     // If no data is stored in localStorage, use initial data
//     setListaProductosBase(listadoProductosData);
//   }
// }, []);

// useEffect(() => {
//   localStorage.setItem("listaProductos", JSON.stringify(listaProductosBase));
// }, [listaProductosBase]);

/////////GetDatos //////////////
// const [producto, setProducto] = useState([]);

// const getDatos = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/photos/");
//   const data = await res.json();
//   setProducto(data);
// };

// useEffect(() => {
//     getDatos();
// }, []);
//////////////////////////////////////////////////
// const getMapeoProductos = (productos, tituloProducto, claseCss) => {
//   const mapeo = productos.map((producto, index) => (
//     <div key={producto.id} className={claseCss}>
//       {tituloProducto? <div className="titulo-producto">{producto.name}</div>:""};
//       <img
//         src={producto.src}
//         alt={`Imagen del producto ${producto.id}`}
//       />
//     </div>
//   ));

//   return mapeo;
// };
