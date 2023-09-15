import React, { useState, useEffect, useContext } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  useResolvedPath,
} from "react-router-dom";
import { ContextGlobal } from "../Components/utils/global.context";
import {
  Container,
  Box,
  Paper,
  Modal,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "../Components/ReservarXIDRecurso.css";
import { MdArrowBackIosNew } from "react-icons/md";
import Politicas from "../Components/Genericos/PoliticasXProducto/Politicas";
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

const ReservarXIDRecurso = () => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath();

  const { id } = useParams();
  const location = useLocation();
  const {
    recursoXID,
    getRecursoXID,
    caracteristicasLista,
    getPuntosComentXIDRecurso,
    caracteristicasXID,
    getCaracteristicasXID,
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

  // const handleCopyClick = (e) => {
  //   e.preventDefault();
  //   navigator.clipboard
  //     .writeText(currentURL)
  //     .then(() => {
  //       setCopied(true);
  //       handleClickSnack();
  //     })
  //     .catch((error) => {
  //       console.error("Error al copiar la URL: ", error);
  //     });
  // };
  ///////////////
  console.log(
    " resolvedPath.pathname --------------------",
    resolvedPath.pathname
  );

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
            </Stack>
          </div>

          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            style={{
              display: "flex",

              justifyContent: "space-between",
              alignItems: "center",
              placeItems: "center",
              padding: "1rem",
              border: "1px solid #dfdfdf",
              flexWrap: "wrap",
              width: "100%",
              // height:"220px",
              // border: "1px solid red",
            }}
          >
            <Stack
              direction={{
                xs: "column",
                sm: "column",
                md: "column",
                lg: "row",
                xl: "row",
              }}
            >
              {/* <div className="grid-container-galeria-reserva"> */}
              <div
                className="item-grid-fotos-reserva-1"
                onClick={handleOpenImage1}
              >
                <img
                  className="/*foto-reserva1*/ foto block"
                  src={recursoXID.imagenURL}
                />
              </div>

              <Divider
                style={{ margin: "1rem" }}
                orientation={{
                  xs: "horizontal",
                  sm: "horizontal",
                  md: "vertical",
                  lg: "vertical",
                  xl: "vertical",
                }}
              />
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
                <Stack
                  item
                  xs={12}
                  md={5}
                  lg={5}
                  xl={5}
                  style={{ placeItems: "center", margin: "auto" }}
                >
                  {/* <Paper style={{ display: "flex", padding: "1rem " }} > */}
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
                      direction={{
                        xs: "column",
                        sm: "row",
                        md: "row",
                        lg: "row",
                      }}
                      style={{
                        justifyContent: "space-between",
                        width: "100%" /* border:"1px solid red"*/,
                      }}
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
                            width: "335px",
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
                        style={{
                          alignItems: "center",
                          width: "65px" /* border:"1px solid red"*/,
                        }}
                        direction={{
                          xs: "row",
                          sm: "row",
                          md: "row",
                          lg: "row",
                        }}
                      >
                        <ArrowForwardIosIcon
                          sx={{
                            fontSize: "45px",
                            color: "#b6b5b5",
                            margin: "-0.7rem",
                          }}
                        />
                        <ArrowForwardIosIcon
                          sx={{
                            fontSize: "45px",
                            color: "#979797",
                            margin: "-0.7rem",
                          }}
                        />
                        <ArrowForwardIosIcon
                          sx={{
                            fontSize: "45px",
                            color: "#424242",
                            margin: "-0.7rem",
                          }}
                        />
                      </Stack>
                      <Stack
                        direction={{ lg: "column" }}
                        style={{
                          justifyContent: "space-between",
                          width: "230px" /* border:"1px solid red"*/,
                        }}
                      >
                        <Stack
                          spacing={3}
                          direction={"row"}
                          style={{ justifyContent: "space-between" }}
                        >
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
                  {/* </Paper> */}
                </Stack>
              </Stack>

              {/* 
              <div
                className="item-grid-fotos-reserva-2"
                onClick={handleOpenImage2}
              >
                <img
                  className="foto-reserva block"
                  src={recursoXID.imagenUrl01}
                />
              </div>

              <div
                className="item-grid-fotos-reserva-3"
                onClick={handleOpenImage3}
              >
                <img
                  className="foto-reserva block"
                  src={recursoXID.imagenUrl02}
                  style={{ borderRadius: "12px" }}
                />
              </div>

              <div
                className="item-grid-fotos-reserva-4"
                onClick={handleOpenImage4}
              >
                <img
                  className="foto-reserva block"
                  src={recursoXID.imagenUrl03}
                />
              </div>

              <div
                className="item-grid-fotos-reserva-5"
                onClick={handleOpenImage5}
              >
                <img
                  className="foto-reserva block"
                  src={recursoXID.imagenUrl04}
                />
              </div> */}
            </Stack>

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
          </Stack>
        </Stack>
        <Paper
          spacing={0}
          style={{
            padding: "0.5rem",
            /* border:"1px solid red"*/ height: "100%",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            style={{ textAlign: "center", margin: "0.5rem 0 1rem 0" }}
          >
            Características
          </Typography>
          <Stack spacing={2} style={{ alignItems: "center" }}>
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
            ))}
          </Stack>
        </Paper>

        <Divider style={{ margin: "2rem 2rem 2rem 2rem" }} flexItem />
        <Politicas id={id}></Politicas>
      </Stack>
    </Container>
  );
};

export default ReservarXIDRecurso;
