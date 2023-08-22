import { ContextGlobal } from "../Components/utils/global.context";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../Components/Detail.css";
import React from "react";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Detail = () => {
  const navigate = useNavigate();
  const { recursoXID, getRecursoXID } = useContext(ContextGlobal);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /////////////////Config para modales
  const [openImage1, setOpenImage1] = useState(false);
  const [openImage2, setOpenImage2] = useState(false);
  const [openImage3, setOpenImage3] = useState(false);
  const [openImage4, setOpenImage4] = useState(false);
  const [openImage5, setOpenImage5] = useState(false);

  const handleOpenImage1 = () => setOpenImage1(true);
  const handleCloseImage1 = () => setOpenImage1(false);
  const handleOpenImage2 = () => setOpenImage2(true);
  const handleCloseImage2 = () => setOpenImage2(false);
  const handleOpenImage3 = () => setOpenImage3(true);
  const handleCloseImage3 = () => setOpenImage3(false);
  const handleOpenImage4 = () => setOpenImage4(true);
  const handleCloseImage4 = () => setOpenImage4(false);
  const handleOpenImage5 = () => setOpenImage5(true);
  const handleCloseImage5 = () => setOpenImage5(false);
  ///////

  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getRecursoXID(id);
  }, [id]);

  if (!recursoXID) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <>
      <Container>
        <div className="segmento-producto">
          <div className="encabezado-descripcion">
            <div className="contenido-encabezado">
              <div className="encabezado">
                <h1 className="titulo-nombre-detalle">{recursoXID.nombre}</h1>
                <div onClick={() => navigate(-1)}>
                  <MdArrowBackIosNew className="flecha" />
                </div>
              </div>
              <h3 className="descripcion">{recursoXID.descripción}</h3>
            </div>
          </div>

          <div className="galeria-detalleservicios-compra">
            <div className="grid-container-galeria">
              <div className="item-grid-fotos1" onClick={handleOpenImage1}>
                <img
                  className="foto-producto block"
                  src={recursoXID.imagenURL}
                />
              </div>

              <div className="item-grid-fotos2" onClick={handleOpenImage2}>
                <img
                  className="foto-producto block"
                  src={recursoXID.imagenUrl01}
                />
              </div>

              <div className="item-grid-fotos3" onClick={handleOpenImage3}>
                <img
                  className="foto-producto block"
                  src={recursoXID.imagenUrl02}
                />
              </div>

              <div className="item-grid-fotos4" onClick={handleOpenImage4}>
                <img
                  className="foto-producto block"
                  src={recursoXID.imagenUrl03}
                />
              </div>

              <div className="item-grid-fotos5" onClick={handleOpenImage5}>
                <img
                  className="foto-producto block"
                  src={recursoXID.imagenUrl04}
                />
              </div>
            </div>

            <Modal
              open={openImage1}
              onClose={handleCloseImage1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img
                  className="item-grid-fotos1 foto-producto block"
                  src={recursoXID.imagenURL}
                />
              </Box>
            </Modal>

            <Modal
              open={openImage2}
              onClose={handleCloseImage2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img
                  className="item-grid-fotos2 foto-producto block"
                  src={recursoXID.imagenUrl01}
                />
              </Box>
            </Modal>
            <Modal
              open={openImage3}
              onClose={handleCloseImage3}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img
                  className="item-grid-fotos3 foto-producto block"
                  src={recursoXID.imagenUrl02}
                />
              </Box>
            </Modal>
            <Modal
              open={openImage4}
              onClose={handleCloseImage4}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img
                  className="item-grid-fotos4 foto-producto block"
                  src={recursoXID.imagenUrl03}
                />
              </Box>
            </Modal>
            <Modal
              open={openImage5}
              onClose={handleCloseImage5}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img
                  className="item-grid-fotos5 foto-producto block"
                  src={recursoXID.imagenUrl04}
                />
              </Box>
            </Modal>

            <div className="contenedor-detalle-producto">
              <h2 className="titulo-caracteristicas">Características</h2>

              <div className="descripcion-producto">
                <p className="descripcion-bullets">{recursoXID.descripción}</p>
                <div className="segmento-icon-detalle">
                  Rehacer esta parte
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Detail;
