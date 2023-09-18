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
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "../Components/ReservarXIDRecurso.css";
import { MdArrowBackIosNew } from "react-icons/md";
import Politicas from "../Components/Genericos/PoliticasXProducto/Politicas";
import logoXIDCaracteristica from "../Components/utils/logoXIDCaracteristica";
import formateoFechas from "../Components/utils/formateoFechas";
import obtenerPrecioXIdRecurso from "../Components/utils/obtenerPrecioXIdRecurso";
import calculoDiasEntreFechas from "../Components/utils/calculoDiasEntreFechas";
import formatearFechaParaEnvioBE from "../Components/utils/formatearFechaParaEnvioBE";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "320px",
  bgcolor: "background.paper",
  border: "12px solid white",
  boxShadow: 24,
  p: 1,
};

const ReservarXIDRecurso = () => {
  const userId = localStorage.getItem("idUsuario");
  const eMailLocal = localStorage.getItem("username");
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath();
  const [emailValido, setEmailValido] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const {
    recursoXID,
    getRecursoXID,
    caracteristicasLista,
    getPuntosComentXIDRecurso,
    caracteristicasXID,
    getCaracteristicasXID,
    email,
    infoRecursoAReservar,
    productosBKLista,
    postReserva,
    getDatosUsersXID,
    usersXID,
    userIdLogIn,
    // userNameStorage,
    setGuardarReserva,
    guardarReserva,
    cantidadDias,
    setCantidadDias,
    // fechasInicioDetalle, setFechasInicioDetalle,  fechasFinDetalle, setFechasFinDetalle,
  } = useContext(ContextGlobal);

  const [usuario, setUsuario] = useState({
    username: "",
  });
  const [mensaje, setInfoMensaje] = useState({
    cuerpo:"",
    idReserva:"",
    error:"",
    final:"",
  });
  const idUserParse = parseInt(userIdLogIn);

  // console.log("usersXID", usersXID);
  const [openShareModal, setOpenShareModal] = useState(false);

  const handleOpenShare = () => {
    setOpenShareModal(true);
  };

  const handleCloseShareModal = () => {
    setOpenShareModal(false);
  };

  /////////////////Config para modales
  const [openImage1, setOpenImage1] = useState(false);
  const handleOpenImage1 = () => setOpenImage1(true);
  const handleCloseImage1 = () => setOpenImage1(false);
  ///////

  useEffect(
    () => {
      getRecursoXID(id);
      getCaracteristicasXID(id);
      getPuntosComentXIDRecurso(id);
      getDatosUsersXID(idUserParse);
    },
    [infoRecursoAReservar],
    { max: 2 }
  );

  if (!recursoXID) {
    return <div>Producto no encontrado</div>;
  }

  const onChangeEmail = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, username: newValue });
    setEmailValido(true);
  };

  ///////////////

  const validarEmailReg = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{3}$/;
    if (regex.test(e)) {
      setEmailValido(true);
      return true;
    } else {
      setEmailValido(false);
      return false;
    }
  };

  ///////////
  const validarFormulario = () => {
    return (
      // validarNombre(usuario.nombre) &&
      validarEmailReg(usuario.username)
    );
  };
  ////////////////////////////////////

  const nombreReserva = usersXID.nombre;
  const inicio = infoRecursoAReservar.fechaInicio;
  const fin = infoRecursoAReservar.fechaFin;
  const emailReserva = usersXID.username == "" ? eMailLocal : usersXID.username;
  const apellidoReserva = usersXID.apellido;
  const idRecursoReserva = recursoXID.idRecurso;
  const fechaReserva = infoRecursoAReservar.fechaRealizacionReserva;
  const estadoRes = 1;
  const userIdVariable = parseInt(
    infoRecursoAReservar.idUser == 0 ? userId : infoRecursoAReservar.idUser
  );
  ////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();

    const guardarReserva = {
      nombre: nombreReserva,
      apellido: apellidoReserva,
      idUsuario: userIdVariable,
      idRecurso: idRecursoReserva,
      inicioReserva: formatearFechaParaEnvioBE(inicio),
      estadoReserva: estadoRes,
      email: emailReserva,
      finalizacionReserva: formatearFechaParaEnvioBE(fin),
      fechaRealizacionReserva: formatearFechaParaEnvioBE(fechaReserva),
    };
    console.log("guardarReserva", guardarReserva);
    // setGuardarReserva(guardarReserva);

    // postReserva(guardarReserva);

    try {
      const urlReserva = "http://44.231.66.124:8080/auth/reserva/save"; // Reemplaza esto con tu URL real
      const jsonDataReserva = JSON.stringify(guardarReserva);
      console.log("jsonDataReserva", jsonDataReserva)
      console.log("datosReserva", jsonDataReserva);
      const response = await fetch(urlReserva, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonDataReserva,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Respuesta:", responseData);
        setInfoMensaje({cuerpo:" Ha realizado una reserva con éxito",idReserva:`Su numero de reserva es el ${responseData.idReserva} .`, final:"Gracias por reservar con HomeOff" })

      } else {
        console.error(
          "Error en la respuesta:",
          response.status,
          response.statusText
        );
        setInfoMensaje(
          {
            cuerpo:"No se ha podido realizar la reserva. Por favor revise los datos:",
            error:` - Nombre: ${nombreReserva}. - Apellido: ${apellidoReserva}.`,
            final:`Disculpe las molestias`,
          }
         
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }

    handleOpenShare();
  };

  console.log(
    " ------------ infoRecursoAReservar  -----------------> ",
    infoRecursoAReservar
  );
  return (
    <><Modal
    open={openShareModal}
    onClose={handleCloseShareModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <box sx={style}>  
      <Paper>
        <Typography> {mensaje.cuerpo}</Typography>
      <Typography>
        {mensaje.idReserva}
        {mensaje.error}
        </Typography>
        <Typography>
          {mensaje.final}
        <Button onClick={() =>
           navigate("/")}>
          Volver a la página de inicio
        </Button>
      </Typography>
      </Paper>
    </box>
    </Modal>
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
        
        <Stack direction={{ xs: "column", sm: "column" }}>
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
                  {/* <Typography variant="h5">Resumen de reservas</Typography> */}
                  <Typography variant="h4" style={{ textAlign: "center" }}>
                    Confirmá tu reserva
                  </Typography>
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
              style={{ alignItems: "center" }}
            >
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
                  direction={{
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                  }}
                  sx={{ height: "100%" }}
                  style={{
                    placeItems: "center",
                    margin: "auto",
                  }}
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
                    <Typography variant="h4">{recursoXID.nombre}</Typography>
                    {/* <Typography variant="h4" style={{ textAlign: "center" }}>
                      Confirmá tu reserva
                    </Typography> */}
                    <Stack
                      spacing={4}
                      direction={{
                        xs: "column",
                        sm: "column",
                        md: "row",
                        lg: "row",
                      }}
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%" /* border:"1px solid red"*/,
                      }}
                    >
                      <Stack spacing={1} style={{ alignItems: "center" }}>
                        <Stack
                          spacing={2}
                          direction={"row"}
                          style={{
                            borderRadius: "12px",
                            backgroundColor: "#DDDDDD",
                            padding: "0.5rem 0.5rem",
                            alignItems: "center",
                            width: "370px",
                          }}
                        >
                          <Stack
                            spacing={1}
                            direction={{
                              lg: "row",
                              xs: "row",
                              sm: "row",
                              md: "row",
                            }}
                          >
                            <Typography>Check-in</Typography>
                            <Typography style={{ fontWeight: "800" }}>
                              {formateoFechas(infoRecursoAReservar.fechaInicio)}
                            </Typography>
                          </Stack>
                          <Divider orientation="vertical" />
                          <Stack
                            spacing={1}
                            direction={{
                              lg: "row",
                              xs: "row",
                              sm: "row",
                              md: "row",
                            }}
                          >
                            <Typography>Check-out</Typography>
                            <Typography style={{ fontWeight: "800" }}>
                              {formateoFechas(infoRecursoAReservar.fechaFin)}
                            </Typography>
                          </Stack>
                        </Stack>

                        {/* <Typography>Tiempo reservado:  {calculoDiasEntreFechas( (formateoFechas(infoRecursoAReservar.fechaInicio)),  (formateoFechas(infoRecursoAReservar.fechaFin))  )} día/s</Typography> */}
                        <Typography>
                          Tiempo reservado: {cantidadDias} día/s
                        </Typography>
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
                          {/* <Typography variant="h6">$300</Typography> */}
                          <Typography variant="h6">
                            $ {infoRecursoAReservar.precioProducto}
                          </Typography>
                        </Stack>
                        <Stack
                          spacing={3}
                          direction={"row"}
                          style={{ justifyContent: "space-between" }}
                        >
                          <Typography variant="h6">Total</Typography>
                          <Typography variant="h6">
                            $
                            {obtenerPrecioXIdRecurso(
                              recursoXID.idRecurso,
                              productosBKLista,
                              calculoDiasEntreFechas(
                                formateoFechas(
                                  infoRecursoAReservar.fechaInicio
                                ),
                                formateoFechas(infoRecursoAReservar.fechaFin)
                              )
                            )}{" "}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
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
          </Stack>
          <Button
            sx={{
              width: "100%",
              color: "white",
              backgroundColor: "#7cc598",
              ":hover": {
                backgroundColor: "#3c9960",
              },
            }}
            onClick={handleSubmit}
          >
            Reservar
          </Button>
          <Paper
            spacing={0}
            style={{
              padding: "0.5rem 1rem",
              /* border:"1px solid red"*/ height: "100%",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2rem",
              gap: "1rem",
            }}
          >
            <Stack>
              <Typography>Tus datos</Typography>
              <FormControl sx={{ gap: "1rem" }}>
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  className="campo-formulario"
                  type="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={onChangeEmail}
                  required
                  margin="normal"
                  style={{ borderColor: emailValido ? "" : "red" }}
                />
                {!emailValido ? (
                  <Typography variant="body2" style={{ color: "red" }}>
                    Ingresar al menos 3 caracteres antes del arroba y tener un
                    formato válido.
                  </Typography>
                ) : (
                  ""
                )}
              </FormControl>
            </Stack>
            <Typography>
              Vamos a enviarte un mensaje para confirmar tu reservación
            </Typography>
          </Paper>

          <Paper
            spacing={0}
            style={{
              padding: "0.5rem 1rem",
              /* border:"1px solid red"*/ height: "100%",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "2rem",
              gap: "1.5rem",
            }}
          >
            <Typography
              variant="h4"
              style={{ textAlign: "center", margin: "0.5rem 0 1rem 0" }}
            >
              Características
            </Typography>
            <Stack
              spacing={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "1rem",
                width: "100%",
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
            >
              {caracteristicasXID.map((caracteristica, idCaracteristica) => (
                <div
                  key={idCaracteristica}
                  className="container-icono-caracteristica-texto-reserva"
                >
                  {/* <div className="icono-caracteristica-texto-reserva"> */}{" "}
                  {caracteristica.logoCaracteristica != "" ? (
                    <Paper
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "190px",
                        padding: "7px 5px",
                        justifyContent: "center",
                        gap: "15px",
                        borderRadius: "10px",
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
                  {/* </div> */}
                </div>
              ))}
            </Stack>
          </Paper>

          <Divider style={{ margin: "2rem 2rem 2rem 2rem" }} flexItem />
          <Politicas id={id}></Politicas>
        </Stack>
      </Stack>
    </Container>
    </>
  );
};

export default ReservarXIDRecurso;
