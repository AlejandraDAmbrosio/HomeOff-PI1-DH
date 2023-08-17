// import React from "react";
// import "../Components/Detail.css";
// import "../Components/Screen.css";
// import { useNavigate } from "react-router-dom";
// import {
//   MdArrowBackIosNew,
//   MdPerson,
//   MdWifi,
//   MdApartment,
//   MdAcUnit,
//   MdLocationOn,
// } from "react-icons/md";
// import { useContext, useState, useEffect } from "react";
// import Screen from "./Screen";
// import Modal from "../Components/Modal/Modal";
// import { ContextGlobal } from "../Components/utils/global.context";
// import { useParams } from "react-router-dom";

// const Detail = () => {
//   const navigate = useNavigate();
//   const { listaProductosBase, showModal, closeModal, openModal } =
//     useContext(ContextGlobal);

//   const [productoID, setProductoID] = useState(null);
//   const { id } = useParams();
//   const [selectedFullScreenImage, setSelectedFullScreenImage] = useState(null);
//   const [showScreen, setShowScreen] = useState(false);

//   useEffect(() => {
//     const foundProduct = listaProductosBase.find(
//       (item) => item.id === parseInt(id, 10)
//     );
//     setProductoID(foundProduct);
//   }, [id, listaProductosBase]);

//   if (!productoID) {
//     // Handle case when product is not found
//     return <div>Product not found</div>;
//   }

//   const openScreen = (imageSrc) => {
//     setSelectedFullScreenImage(imageSrc);
//     setShowScreen(true);
//     openModal(); // Abre el modal al cambiar a la pantalla completa
//   };

//   const closeScreen = () => {
//     setSelectedFullScreenImage(null);
//     setShowScreen(false);
//     closeModal(); // Cierra el modal al volver de la pantalla completa
//   };

//   return (
//     <>
//       <div className="segmento-producto">
//         <div className="encabezado-descripcion">
//           <div className="contenido-encabezado">
//             <div className="encabezado">
//               <h1 className="nombre-producto-en-detail">{productoID.nombreProducto}</h1>
//               <div onClick={() => navigate(-1)}>
//                 <MdArrowBackIosNew className="flecha" />
//               </div>
//             </div>
//             <h3 className="descripcion-producto-en-detail">
//               {productoID.descripcion}
//             </h3>
//           </div>
//         </div>

//         <div className="galeria-detalleservicios-compra">
//           <div className="grid-container-galeria">

//             <img
//               className="item-grid-fotos1 foto-producto block"
//               src={productoID.fotos.foto1}
//               onClick={() => {
//                 openModal(productoID.fotos.foto1);
//                 openScreen(productoID.fotos.foto1);}}
//             />
//             <img
//               className="item-grid-fotos2 foto-producto block"
//               src={productoID.fotos.foto2}
//               onClick={() => {
//                 openModal(productoID.fotos.foto2);
//                 openScreen(productoID.fotos.foto2);}}
//             />
//             <img
//               className="item-grid-fotos3 foto-producto block"
//               src={productoID.fotos.foto3}
//               onClick={() => {
//                 openModal(productoID.fotos.foto3);
//                 openScreen(productoID.fotos.foto3);}}
//             />
//             <img
//               className="item-grid-fotos4 foto-producto block"
//               src={productoID.fotos.foto4}
//               onClick={() => {
//                 openModal(productoID.fotos.foto4);
//                 openScreen(productoID.fotos.foto4);}}
//             />
//             <img
//               className="item-grid-fotos5 foto-producto block"
//               src={productoID.fotos.foto5}
//               onClick={() => {
//                 openModal(productoID.fotos.foto5);
//                 openScreen(productoID.fotos.foto5);}}
//             />
//           </div>

//           {/* <button className="ver-mas" onClick={openModal}>
//             + Ver más
//           </button> */}

//           {showModal && (
//             <Modal onClose={closeModal}>
//              <img
//                 className="modal-img-previsual"
//                 alt="Imagen de previsualización"
//                 src={selectedFullScreenImage}
//               />
//             </Modal>
//           )}

//           <div className="contenedor-detalle-producto">
//             <p className="descripcion-producto">{productoID.descripcion}</p>
//             <div className="segmento-icon-detalle">
//               {productoID.servicios.servicio1 && (
//                 <div className="items-icon-detalle">
//                   <MdPerson className="icono-detalle-producto" />
//                   <p>{productoID.servicios.servicio1}</p>
//                 </div>
//               )}

//               {productoID.servicios.servicio2 && (
//                 <div className="items-icon-detalle">
//                   <MdPerson className="icono-detalle-producto" />
//                   <p>{productoID.servicios.servicio2}</p>
//                 </div>
//               )}

//               {productoID.servicios.servicio3 && (
//                 <div className="items-icon-detalle">
//                   <MdPerson className="icono-detalle-producto" />
//                   <p>{productoID.servicios.servicio3}</p>
//                 </div>
//               )}

//               {productoID.servicios.servicio4 && (
//                 <div className="items-icon-detalle">
//                   <MdPerson className="icono-detalle-producto" />
//                   <p>{productoID.servicios.servicio4}</p>
//                 </div>
//               )}

//               {productoID.servicios.servicio5 && (
//                 <div className="items-icon-detalle">
//                   <MdPerson className="icono-detalle-producto" />
//                   <p>{productoID.servicios.servicio5}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Detail;
import React from "react";
import "../Components/Detail.css";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBackIosNew,
  MdPerson,
  MdWifi,
  MdApartment,
  MdAcUnit,
  MdLocationOn,
} from "react-icons/md";
import { useContext, useState, useEffect } from "react";
import Screen from "./Screen";
import Modal from "../Components/Modal/Modal";
import { ContextGlobal } from "../Components/utils/global.context";
import { useParams } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();
  const {
    productosBKLista,
    getDatosBKLista,
    showModal,
    closeModal,
    openModal,
    datoBKID, 
    setDatoBKID, 
    getDatoBKID,
  } = useContext(ContextGlobal);

  console.log("------ Datos Lista traida de BKND----------------------");
  console.log(productosBKLista);
  const [productoID, setProductoID] = useState(null);
  const { id } = useParams();

    getDatoBKID(id);


  console.log("------ Datos de Producto ID ----------------------");
  console.log(datoBKID.idRecurso);
  console.log(datoBKID);
  if (!productoID) {
    // Handle case when product is not found
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="segmento-producto">
        <div className="encabezado-descripcion">
          <div className="contenido-encabezado">
            <div className="encabezado">
              <h1>{productoID.nombreProducto}</h1>
              <div onClick={() => navigate(-1)}>
                <MdArrowBackIosNew className="flecha" />
              </div>
            </div>
            <h3 className="descripcion">
              Localidad y tipo {productoID.descripcion}
            </h3>
          </div>
        </div>

        <div className="galeria-detalleservicios-compra">
          <div className="grid-container-galeria">
            <img
              className="item-grid-fotos1 foto-producto block"
              src={productoID.imagenURL}
            />
            <img
              className="item-grid-fotos2 foto-producto block"
              src={productoID.imagenUrl01}
            />
            <img
              className="item-grid-fotos3 foto-producto block"
              src={productoID.imagenUrl02}
            />
            <img
              className="item-grid-fotos4 foto-producto block"
              src={productoID.imagenUrl03}
            />
            <img
              className="item-grid-fotos5 foto-producto block"
              src={productoID.imagenUrl04}
            />
          </div>

          <button className="ver-mas" onClick={openModal}>
            + Ver más
          </button>

          {showModal && (
            <Modal onClose={closeModal}>
              <Screen />
            </Modal>
          )}

          <div className="contenedor-detalle-producto">
            {/* <div className="titulo-caracteristicas-descripcion-producto"> */}
            <h2 className="titulo-caracteristicas">Características</h2>

            <div className="descripcion-producto">
              <p className="descripcion-bullets">{productoID.descripcion}</p>
              <div className="segmento-icon-detalle">
                {productoID.servicios.servicio1 && (
                  <div className="items-icon-detalle">
                    <MdPerson className="icono-detalle-producto" />
                    <p>{productoID.servicios.servicio1}</p>
                  </div>
                )}

                {productoID.servicios.servicio2 && (
                  <div className="items-icon-detalle">
                    <MdPerson className="icono-detalle-producto" />
                    <p>{productoID.servicios.servicio2}</p>
                  </div>
                )}

                {productoID.servicios.servicio3 && (
                  <div className="items-icon-detalle">
                    <MdPerson className="icono-detalle-producto" />
                    <p>{productoID.servicios.servicio3}</p>
                  </div>
                )}

                {productoID.servicios.servicio4 && (
                  <div className="items-icon-detalle">
                    <MdPerson className="icono-detalle-producto" />
                    <p>{productoID.servicios.servicio4}</p>
                  </div>
                )}

                {productoID.servicios.servicio5 && (
                  <div className="items-icon-detalle">
                    <MdPerson className="icono-detalle-producto" />
                    <p>{productoID.servicios.servicio5}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Detail;
