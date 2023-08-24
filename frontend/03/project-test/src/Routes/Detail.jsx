import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextGlobal } from "../Components/utils/global.context";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "../Components/Detail.css";
// import Grid from '@mui/material/GridV5';
import {
  MdArrowBackIosNew,
  MdPerson,
  MdWifi,
  MdApartment,
  MdAcUnit,
  MdLocationOn,
} from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid grey",
  boxShadow: 24,
  p: 1,
};

const Detail = () => {
  const navigate = useNavigate();
  const {
    recursoXID,
    getRecursoXID,
    caracteristicasLista,
    getCaracteristicasLista,
  } = useContext(ContextGlobal);

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
      <Container
        style={{
          paddingTop: "3rem",
        }}
      >
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
                  className="foto-producto block"
                  src={recursoXID.imagenURL}
                  style={{height:"50vh"}}
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
                  className="foto-producto block"
                  src={recursoXID.imagenUrl01}
                  style={{height:"50vh"}}
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
                  className="foto-producto block"
                  src={recursoXID.imagenUrl02}
                  style={{height:"50vh"}}
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
                  className="foto-producto block"
                  src={recursoXID.imagenUrl03}
                  style={{height:"50vh"}}
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
                  className="foto-producto block"
                  src={recursoXID.imagenUrl04}
                  style={{height:"50vh"}}
                />
              </Box>
            </Modal>

            <div className="contenedor-detalle-producto">
              <h2 className="titulo-caracteristicas">Características</h2>

              <div className="descripcion-producto">
                <p className="descripcion-bullets">{recursoXID.descripción}</p>
              </div>
            </div>
            <div className="segmento-icon-detalle">
              {caracteristicasLista.map((caracteristica, idCaracteristica) => (
                <div className="container-icono-caracteristica-texto">
                  <div className="icono-caracteristica-texto">
                    {" "}
                    {caracteristica.logoCaracteristica != "" ? (
                      <Paper
                        sx={{
                          display: "flex", // Usar flexbox
                          alignItems: "center", // Centrar verticalmente
                          padding: "3px 10px", // Ajustar padding
                          justifyContent: "center",
                          gap:"15px"
                        }}
                      >
                        <img
                          className="icono-caracteristica"
                          src={caracteristica.logoCaracteristica}
                          style={{width:"25px", height:"25px", }}
                        />
                        <div>{caracteristica.nombre}</div>
                      </Paper>
                    ) : (
                      <Paper
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "3px 10px",
                          justifyContent: "center",
                        }}
                      >
                        <CheckOutlinedIcon style={{ color: "green" }} />

                        <div>{caracteristica.nombre}</div>
                      </Paper>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Detail;
