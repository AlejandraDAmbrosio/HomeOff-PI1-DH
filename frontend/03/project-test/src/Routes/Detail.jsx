import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { ContextGlobal } from "../Components/utils/global.context";
import {
  Container,
  Box,
  Paper,
  Modal,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "../Components/Detail.css";
import { MdArrowBackIosNew, MdShare, MdFacebook } from "react-icons/md";
import Compartir from "../Components/CompartirEnRedes/Compartir";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import CardProductoSimulado from "../Components/Genericos/CardProductoSimulado";
import buscadorSedeXIDSede from "../Components/utils/buscadorSedeXIDSede";
import obtenerNombreCategoriaPorId from "../Components/utils/obtenerNombreCategoriaPorId";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import CalendarioXId from "../Components/Genericos/Fecha/CalendarioXId";
import Puntuacion from "../Components/Genericos/Puntuaciones/Puntuacion.jsx";
import Comentarios from "../Components/Genericos/Comentarios/Comentarios";
import Politicas from "../Components/Genericos/PoliticasXProducto/Politicas";




const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "40%",
  bgcolor: "background.paper",
  border: "2px solid grey",
  boxShadow: 24,
  p: 1,
};

const Detail = () => {
  const navigate = useNavigate();
  const [publicacionRedes, setPublicacionRedes] = useState("");

  const onChangeCopy = (event) => {
    setPublicacionRedes(event.target.value);
  };

  const { id } = useParams();
  const location = useLocation();
  const {
    recursoXID,
    getRecursoXID,
    caracteristicasLista,
    productosBKLista,
    categoriasLista,
    getCaracteristicasLista,
  } = useContext(ContextGlobal);

  const [openShareModal, setOpenShareModal] = useState(false);

  const handleOpenShare = () => {
    setOpenShareModal(true);
  };

  const handleCloseShareModal = () => {
    setOpenShareModal(false);
  };

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

  useEffect(() => {
    getRecursoXID(id);
  }, [id]);

  if (!recursoXID) {
    return <div>Producto no encontrado</div>;
  }

  /////////////////////////

  ///////////////

  return (
    <>
      <Modal
        open={openShareModal}
        onClose={handleCloseShareModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            margin="1rem"
            justifyContent="center"
            textAlign="center"
            flexItem
            alignContent="center"
          >
            Comparti este espacio en
          </Typography>
          <Stack
            justifyContent="center"
            direction="row"
            spacing={2}
            flexItem
            alignContent="center"
          >
            <a
              href={`https://www.facebook.com/sharer.php?u=${
                location.pathname
              }&quote=${encodeURIComponent(publicacionRedes)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdFacebook style={{ fontSize: "50px" }} />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                publicacionRedes
              )}&url=${location.pathname}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter style={{ fontSize: "50px" }} />
            </a>

            <a
              href={`https://www.instagram.com/sharer.php?u=${
                location.pathname
              }&caption=${encodeURIComponent(publicacionRedes)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram style={{ fontSize: "50px" }} />
            </a>
          </Stack>

          <hr />
          <div className="">
            <CardProductoSimulado
              id={id}
              className="card-simulada"
              title={recursoXID.nombre}
              descripcion={recursoXID.descripción}
              url={recursoXID.imagenURL}
              precio={recursoXID.precioUnitario}
              sede={buscadorSedeXIDSede(recursoXID.idSede)}
              categoria={obtenerNombreCategoriaPorId(
                recursoXID.categoria_id,
                productosBKLista,
                categoriasLista
              )}
            />

            <Divider style={{ margin: "1rem" }} flexItem />
                <Typography>{publicacionRedes}</Typography>
            <TextField
              id="copy"
              label="Ingresá tu comentario"
              multiline
              rows={1}
              defaultValue="Mirá el espacio que encontré!"
              variant="standard"
              value={publicacionRedes} // Corrected variable name
              onChange={onChangeCopy} // Corrected function name
              required
              style={{ fontSize:"10px", width: "200px", margin: "1rem", maxHeight:"40px", paddingBottom:"2rem" }}
            />
          </div>
        </Box>
      </Modal>

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
                <div style={{ display: "flex", gap: "2.5rem" }}>
                  <Button
                    variant="text"
                    onClick={handleOpenShare}
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    {" "}
                    {/* Agrega el onClick */}
                    {/* <Typography variant="body1">Compartí</Typography> */}
                    Compartí <MdShare style={{ fontSize: "25px" }} />
                  </Button>
                  <div onClick={() => navigate(-1)}>
                    <MdArrowBackIosNew className="flecha" />
                  </div>
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
                />
              </Box>
            </Modal>

            <div className="contenedor-detalle-producto">
              <h2 className="titulo-caracteristicas">Características</h2>
            </div>

            <div className="segmento-icon-detalle">
              {caracteristicasLista.map((caracteristica, idCaracteristica) => (
                <div
                  key={idCaracteristica}
                  className="container-icono-caracteristica-texto"
                >
                  <div className="icono-caracteristica-texto">
                    {" "}
                    {caracteristica.logoCaracteristica != "" ? (
                      <Paper
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "3px 10px",
                          justifyContent: "center",
                          gap: "15px",
                          borderRadius: " 11px 11px 11px 11px",
                          boxShadow: "1px 1px 6px #979797",
                        }}
                      >
                        <img
                          className="icono-caracteristica"
                          src={caracteristica.logoCaracteristica}
                          style={{ width: "25px", height: "25px" }}
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



        <CalendarioXId></CalendarioXId>
        
        <Puntuacion/>
                        
        <Comentarios></Comentarios>
        
        <Politicas></Politicas>
      </Container>
    </>
  );
};

export default Detail;
