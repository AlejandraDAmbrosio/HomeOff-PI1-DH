
import React, { useState, useContext, useEffect } from "react";
import Error from "../Components/Error";
import "../Components/Screen.css";
import Modal from "../Components/Modal/Modal";
import "../Components/Modal/Modal.css"
import { ContextGlobal } from "../Components/utils/global.context";
import GaleriaModal from "../Components/GaleriaFotos/GaleriaModal";
import { useParams } from "react-router-dom";

const Screen = () => {
  const { listaProductosBase, showModal, closeModal, openModal } =
    useContext(ContextGlobal);
    const [showScreen, setShowScreen] = useState(false);
  const { id } = useParams();
  const [productoID, setProductoID] = useState(null);
  const [selectedFullScreenImage, setSelectedFullScreenImage] = useState(null);

  useEffect(() => {
    const foundProduct = listaProductosBase.find(
      (item) => item.id === parseInt(id, 10)
    );
    setProductoID(foundProduct);
  }, [id, listaProductosBase]);

  if (!productoID) {
    // Handle case when product is not found
    return <div>Product not found</div>;
  }



  const openScreen = (imageSrc) => {
    setSelectedFullScreenImage(imageSrc);
    setShowScreen(true);
    openModal(); // Abre el modal al cambiar a la pantalla completa
  };

  const closeScreen = () => {
    setSelectedFullScreenImage(null);
    setShowScreen(false);
    closeModal(); // Cierra el modal al volver de la pantalla completa
  };

  return (
    <div>
      {showModal && (
        <div className="screen">
          <div className="encabezado-preview-galeria">
            <div className="titulo-producto-screen">{productoID.nombreProducto}</div>
            {/* <div className="cerrar" onClick={closeModal}>
              Cerrar X
            </div> */}
          </div>
          <div className="contenedor-grid-fotos">
            <div className="item-grid">
             <img
                src={productoID.fotos.foto1}
                alt={`Imagen del producto 1`}
                onClick={() => {
                  openModal(productoID.fotos.foto1);
                  openScreen(productoID.fotos.foto1);}}
              />
            </div>
            <div className="item-grid">
              <img
                src={productoID.fotos.foto2}
                alt={`Imagen del producto 2`}
                onClick={() => {
                  openModal(productoID.fotos.foto2);
                  openScreen(productoID.fotos.foto2);}}
              />
            </div>
            <div className="item-grid">
              <img
                src={productoID.fotos.foto3}
                alt={`Imagen del producto 3`}
                onClick={() => {
                  openModal(productoID.fotos.foto3);
                  openScreen(productoID.fotos.foto3);}}
              />
            </div>
            <div className="item-grid">
              <img
                src={productoID.fotos.foto4}
                alt={`Imagen del producto 4`}
                onClick={() => {
                  openModal(productoID.fotos.foto4);
                  openScreen(productoID.fotos.foto4);}}
              />
            </div>
            <div className="item-grid">
              <img
                src={productoID.fotos.foto5}
                alt={`Imagen del producto 5`}
                onClick={() => {
                  openModal(productoID.fotos.foto5);
                  openScreen(productoID.fotos.foto5);}}
              />
            </div>
          </div>
          {showScreen && (
            <Modal onClose={closeScreen}>
              <img
                className="modal-img-previsual"
                alt="Imagen de previsualización"
                src={selectedFullScreenImage}
              />
            </Modal>
          )}
        </div>
      )}

 
    </div>
  );
};

export default Screen;
