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
  Grid,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
import CalendarioXIdReserva from "../Components/Genericos/Fecha/CalendarioXIdReserva";

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

const ReservarXIDRecurso = () => {
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
    usuarioLogueado,
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
    getPuntosComentXIDRecurso(id);
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
    <Container>
      <Stack
        style={{
          marginTop: "5.5rem",
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          placeItems: "center",
          paddingLeft: "0",
          paddingRight: "0",
          width: "100%",
          gap: "2rem",
        }}
      >
        {/* <Paper> */}
        {/* <div className="segmento-producto"> */}
        <Stack direction={{ xs: "column", sm: "column" }} style={{}}>
          <div className="encabezado-descripcion">
            <Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                useFlexGap
                flexWrap="wrap"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction={"column"}>
                  <Typography variant="h5">Resumen de reservas</Typography>
                  <Typography variant="h4">{recursoXID.nombre}</Typography>
                </Stack>
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
                  <div onClick={() => navigate(-1)}>
                    <MdArrowBackIosNew className="flecha" />
                  </div>
                </Stack>
              </Stack>
              {/* 
              <Typography
                variant="body2"
                style={{ width: "98%", margin: "1rem 0rem 1.5rem 0rem" }}
              >
                {recursoXID.descripción}{" "}
              </Typography> */}
            </Stack>
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
                  style={{ borderRadius: "12px" }}
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
            
            {/* <Stack style={{ margin: "1rem 0rem 2rem 0rem" }}> */}
            <Paper spacing={2} style={{padding:"0.5rem"}}>
              
              <Typography variant="h5" style={{textAlign:"center", margin:"0.5rem 0 1rem 0"}}>Características</Typography>
              <Stack spacing={2} style={{alignItems:"center"}}>
                {/* <div className="segmento-icon-detalle"> */}
                  {caracteristicasXID.map(
                    (caracteristica, idCaracteristica) => (
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
                                width: "200px",
                                padding: "7px 5px",
                                justifyContent: "center",
                                gap: "15px",
                                borderRadius: "8px",
                                boxShadow: "1px 1px 6px #979797",
                              }}
                            >
                              <img
                                className="icono-caracteristica"
                                src={logoXIDCaracteristica(
                                  caracteristica.idCaracteristica,
                                  caracteristicasLista
                                )}
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
                    )
                  )}
                {/* </div> */}
              </Stack>
              </Paper>
            {/* </Stack> */}
          </Stack>
          {/* </div> */}
        </Stack>
        {/* </div> */}

        <Stack
          spacing={2}
          flexDirection={{ lg: "row" }}
          style={{
            display: "flex",

            gap: "3rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            justifyItems: "center",
          }}
        >
          {/* <Stack
            item
            xs={12}
            md={5}
            lg={5}
            xl={5}
            style={{ placeItems: "center", margin: "auto" }}
          >
            <CalendarioXIdReserva style={{ placeItems: "center" }} />
          </Stack> */}

          <Stack
            item
            xs={12}
            md={5}
            lg={5}
            xl={5}
            style={{ placeItems: "center", margin: "auto" }}
          >
            {/* <Comentarios id={id} style={{ placeItems: "center" }} /> */}

            <Paper
              style={{ /*width: "95%",*/ display: "flex", padding: "1rem " }}
            >
              <Stack
                spacing={2}
                style={{
                  width: "95%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" style={{ textAlign: "center" }}>
                  Confirmá tu reserva
                </Typography>
                <Stack
                  spacing={10}
                  direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
                  style={{ justifyContent: "space-between" }}
                >
                  <Stack spacing={2}>
                    <Stack
                      spacing={3}
                      direction={"row"}
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "#DDDDDD",
                        padding: "0.5rem 1rem",
                        alignItems: "center",
                      }}
                    >
                      <Stack spacing={1} direction={{ lg: "row" }}>
                        <Typography>Check-in</Typography>
                        <Typography style={{ fontWeight: "800" }}>
                          23-nov
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" />
                      <Stack spacing={1} direction={{ lg: "row" }}>
                        <Typography>Check-in</Typography>
                        <Typography style={{ fontWeight: "800" }}>
                          27-nov
                        </Typography>
                      </Stack>
                    </Stack>

                    <Typography>5 dias totales</Typography>
                  </Stack>

                  <Stack
                    style={{ alignItems: "center", width: "140px" }}
                    direction={{ xs: "row", sm: "row", md: "row", lg: "row" }}
                  >
                    <ArrowForwardIosIcon
                      sx={{ fontSize: "45px", color: "#b6b5b5" }}
                    />
                    <ArrowForwardIosIcon
                      sx={{ fontSize: "45px", color: "#979797" }}
                    />
                    <ArrowForwardIosIcon
                      sx={{ fontSize: "45px", color: "#424242" }}
                    />
                  </Stack>
                  <Stack
                    direction={{ lg: "column" }}
                    style={{ justifyContent: "space-between" }}
                  >
                    <Stack spacing={3} direction={"row"}>
                      <Typography variant="h6">Precio x día</Typography>
                      <Typography variant="h6">$300</Typography>
                    </Stack>
                    <Stack
                      spacing={3}
                      direction={"row"}
                      style={{ justifyContent: "space-between" }}
                    >
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6">$1500</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              
            </Paper>
          </Stack>
        </Stack>

        <Divider style={{ margin: "2rem 2rem 2rem 2rem" }} flexItem />
        <Politicas id={id}></Politicas>
      </Stack>
    </Container>
  );
};

export default ReservarXIDRecurso;
