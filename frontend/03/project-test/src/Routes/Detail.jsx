import React, { useState, useEffect, useContext } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  Link,
  useResolvedPath,
} from "react-router-dom";
import { ContextGlobal } from "../Components/utils/global.context";
import {
  Container,
  Box,
  Paper,
  Modal,
  Button,
  Stack,
  Typography,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "../Components/Detail.css";
import { MdArrowBackIosNew, MdShare, MdFacebook } from "react-icons/md";
import Compartir from "../Components/CompartirEnRedes/Compartir";
import { BsInstagram, BsTwitter, BsLink45Deg } from "react-icons/bs";
import CardProductoSimulado from "../Components/Genericos/CardProductoSimulado";
import buscadorSedeXIDSede from "../Components/utils/buscadorSedeXIDSede";
import obtenerNombreCategoriaPorId from "../Components/utils/obtenerNombreCategoriaPorId";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import CalendarioXId from "../Components/Genericos/Fecha/CalendarioXId";
import Puntuacion from "../Components/Genericos/Puntuaciones/Puntuacion.jsx";
import Comentarios from "../Components/Genericos/Comentarios/Comentarios";
import Politicas from "../Components/Genericos/PoliticasXProducto/Politicas";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import CloseIcon from "@mui/icons-material/Close";
import logoXIDCaracteristica from "../Components/utils/logoXIDCaracteristica";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  Width: "320px",
  bgcolor: "background.paper",
  border: "12px solid white",
  boxShadow: 24,
  p: 1,
};

const Detail = () => {
  const [copied, setCopied] = useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const navigate = useNavigate();
  const resolvedPath = useResolvedPath();
  const [publicacionRedes, setPublicacionRedes] = useState("");

  const currentURL = window.location.href;

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
    getPuntosComentXIDRecurso,
    puntosComentXIDRecurso, 
    categoriasLista,
    caracteristicasXID,
    getCaracteristicasXID,
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
    getCaracteristicasXID(id);
    getPuntosComentXIDRecurso(id)
  }, [id]);

  if (!recursoXID) {
    return <div>Producto no encontrado</div>;
  }




  /////////////////////////

  const handleCopyClick = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setCopied(true);
        handleClickSnack();
      })
      .catch((error) => {
        console.error("Error al copiar la URL: ", error);
      });
  };
  ///////////////
  console.log(
    " resolvedPath.pathname --------------------",
    resolvedPath.pathname
  );
  console.log("URL completa:", currentURL);

  return (
    <>
      <Modal
        open={openShareModal}
        onClose={handleCloseShareModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <IconButton
              aria-label="close"
              onClick={handleCloseShareModal}
              sx={{
                position: "relative",
                marginBottom: "0.2rem",
                float: "right",
              }}
            >
              {" "}
              <CloseIcon sx={{}} />
            </IconButton>
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
            <TextField
              id="copy"
              label="Editá tu comentario"
              multiline
              rows={1}
              defaultValue="Mirá el espacio que encontré!"
              variant="standard"
              value={
                publicacionRedes.length === 0
                  ? "Mirá el espacio que encontré!"
                  : publicacionRedes
              }
              onChange={onChangeCopy}
              required
              style={{
                fontSize: "10px",
                width: "280px",
                margin: "1.5rem 0rem 1rem 0rem",
                maxHeight: "40px",
                paddingBottom: "2rem",
              }}
            />
          </div>

          <Divider
            orientation="horizontal"
            style={{ margin: "1.5rem 0rem" }}
          ></Divider>

          <Typography
            margin="1rem"
            justifyContent="center"
            textAlign="center"
            flexItem
            alignContent="center"
          >
            Comparti esta publicación en
          </Typography>
          <Stack
            justifyContent="center"
            direction="row"
            spacing={5}
            flexItem
            alignItems="center"
           
          >
            <FacebookShareButton
              url={`"${currentURL}"`}
              quote={`"${recursoXID.nombre}"`}
              hashtag={`#${obtenerNombreCategoriaPorId(
                recursoXID.categoria_id,
                productosBKLista,
                categoriasLista
              )}`}
              description={`${publicacionRedes} `}
              className=""
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            {/* Alternativa comentada */}
            {/* <a
              href={`https://www.facebook.com/sharer.php?u=${currentURL}&quote=${encodeURIComponent(
                publicacionRedes
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdFacebook style={{ fontSize: "50px" }} />
            </a> */}

            <TwitterShareButton
              title={`"${recursoXID.nombre}"`}
              url={`"${currentURL}"`}
              hashtags={[
                `${obtenerNombreCategoriaPorId(
                  recursoXID.categoria_id,
                  productosBKLista,
                  categoriasLista
                )}`,
              ]}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            {/* Alternativa comentada */}
            {/* <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                publicacionRedes
              )}&url=${currentURL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter style={{ fontSize: "50px" }} />
            </a> */}

            <a
              href={`https://www.instagram.com/sharer.php?u=${currentURL}&caption=${encodeURIComponent(
                publicacionRedes
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="Instagram"
                src="/images/instagram.png"
                alt="Instagram"
                width={"42px"}
              />
            </a>

            <a
              href={currentURL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCopyClick}
            >
              <BsLink45Deg style={{ fontSize: "50px" }} />
            </a>
          </Stack>

          {/* <hr /> */}
        </Box>
      </Modal>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          Link copiado en portapapeles!
        </Alert>
      </Snackbar>

      <Stack
        style={{
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          placeItems: "center",
          paddingLeft: "0",
          paddingRight: "0",
        }}
      >
        {/* <Paper> */}
        <div className="segmento-producto">
          <div className="encabezado-descripcion">
            <div className="contenido-encabezado">
              <Stack
                direction={{ xs: "column", sm: "row" }}
                useFlexGap
                flexWrap="wrap"
                spacing={2}
                justifyContent="space-between"
              >
                <div className="titulo-detail">{recursoXID.nombre}</div>
                <Stack
                  direction="row"
                  spacing={3}
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignSelf: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="text"
                    onClick={handleOpenShare}
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    Compartí <MdShare style={{ fontSize: "25px" }} />
                  </Button>
                  <div onClick={() => navigate(-1)}>
                    <MdArrowBackIosNew className="flecha" />
                  </div>
                </Stack>
              </Stack>

              <Typography
                variant="body2"
                style={{ width: "98%", margin: "1rem 0rem 1.5rem 0rem" }}
              >
                {recursoXID.descripción}{" "}
              </Typography>
            </div>
          </div>

          <Stack
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              placeItems: "center",
              paddingLeft: "0",
              paddingRight: "0",
            }}
          >
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
              {caracteristicasXID.map((caracteristica, idCaracteristica) => (
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
                          width: "250px",
                          padding: "7px 5px",
                          justifyContent: "center",
                          gap: "15px",
                          borderRadius: " 11px 11px 11px 11px",
                          boxShadow: "1px 1px 6px #979797",
                        }}
                      >
                        <img
                          className="icono-caracteristica"
                          src={ logoXIDCaracteristica(caracteristica.idCaracteristica, caracteristicasLista)}
                          style={{ width: "25px", height: "25px" }}
                        />
                        <div>{caracteristica.nombreCaracteristica}</div>
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
          </Stack>
          {/* </div> */}
        </div>
        {/* </Paper> */}
        <CalendarioXId></CalendarioXId>

        <Divider style={{ margin: "2rem 2rem 2rem 2rem" }} flexItem />
        <Comentarios id={id}></Comentarios>
        <Divider style={{ margin: "2rem 2rem 2rem 2rem" }} flexItem />
        <Politicas id={id}></Politicas>
      </Stack>
    </>
  );
};

export default Detail;
