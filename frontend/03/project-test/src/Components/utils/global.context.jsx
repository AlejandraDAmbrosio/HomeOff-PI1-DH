import React, { createContext, useContext, useState, useEffect } from "react";
export const ContextGlobal = createContext();
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

///////////////////////////////////////////

  return (
    <ContextGlobal.Provider
      value={{
        usersLista, 
        setUsersLista,
        getDatosUsers,
        productosBKLista, 
        setProductosBKLista,
        getDatosBKLista,
        // datoBKID, 
        // setDatoBKID, 
        // getDatoBKID,
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
