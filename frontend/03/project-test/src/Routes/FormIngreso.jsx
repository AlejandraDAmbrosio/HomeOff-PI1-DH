import React, { useState, useContext, useEffect } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import "../Components/FormIngreso.css";
import {
  Button,
  FormControl,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
  // Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import FormAltaUser from "./FormAltaUser";

const FormIngreso = () => {
  const {
    usuarioLogueado,
    realizarLogIn,
    iniciarSesion,
    userLogIn,
    errorLogueo,
    setErrorLogueo,
    setUserLogIn,
    loginSuccess,
    setLoginSuccess,
  } = useContext(ContextGlobal);

  // Repo de validaciones
  const [nombreValido, setNombreValido] = useState(true);
  const [emailValido, setEmailValido] = useState(true);
  const [passwordValido, setPasswordValido] = useState(true);

  ////////// Segmento modal   //////////
  const [modalTimeout, setModalTimeout] = useState(null); // Nuevo estado para controlar el cierre del modal por tiempo
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleOpen = () => {
  //   setOpen(true);
  //   if (modalTimeout) {
  //     console.log("clearTimeout(modalTimeout);")
  //     clearTimeout(modalTimeout);
  //   }
  // };

  // const handleClose = () => {
  //   if (!loginSuccess) {
  //     setOpen(false);
  //   }
  // };

  // const handleCloseWithTimeout = () => {

  //     setModalTimeout(
  //       setTimeout(() => {
  //         console.log("setTimeout")
  //         handleClose();
  //         clearTimeout(modalTimeout);
  //       }, 10000)
  //     );

  // };

  /////////// Definicion de User/Objeto
  const [usuario, setUsuario] = useState({
    // nombre: "",
    username: "",
    password: "",
  });

  // / Definicion de Form
  const [form, setForm] = useState(false);

  ////////////////OnChanges///////////////

  // const onChangeNombre = (e) => {
  //   const newValue = e.target.value;
  //   setUsuario({ ...usuario, nombre: newValue });

  //   validarNombre(newValue);
  // };

  const onChangeEmail = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, username: newValue });
    setUserLogIn({ ...usuario, username: newValue });
    setErrorLogueo("");
    // validarEmail(newValue);
    setEmailValido(true)
  };

  const onChangePass = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, password: newValue });
    setUserLogIn({ ...usuario, password: newValue });
    setErrorLogueo("");
    validarPassword(newValue);
  };

  //////////Validaciones ///////////////////

  // const validarNombre = (n) => {
  //   const regex = /^[A-Za-z\s]{3,30}$/;
  //   if (regex.test(n)) {
  //     setNombreValido(true);
  //     return true;
  //   } else {
  //     setNombreValido(false);
  //     return false;
  //   }
  // };

  const validarEmail = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{3}$/;
    if (regex.test(e)) {
      setEmailValido(true);
      return true;
    } else {
      setEmailValido(false);
      return false;
    }
  };

  const validarPassword = (p) => {
    const emSinEspacio = p.trim();

    const passRegexp = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])[\s\S]{8,}$/;
    if (passRegexp.test(emSinEspacio)) {
      setPasswordValido(true);
      return true;
    } else {
      setPasswordValido(false);
      return false;
    }
  };

  const validarFormulario = () => {
    return (
      // validarNombre(usuario.nombre) &&
      validarEmail(usuario.username) && validarPassword(usuario.password)
    );
  };

  ///////handleSubmit //////
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      setForm(true);
      console.log("Datos Enviados");
      console.log(usuario);

      setUserLogIn({
        username: usuario.username,
        password: usuario.password,
      });
      console.log("Que datos enviamos del user? ");
      console.log(userLogIn);

      realizarLogIn(userLogIn);
      setErrorLogueo("Logueando usuario...");
      handleOpen();

      //ENVIAR DATOS
    } else {
      setForm(false);
      console.log("Datos No Enviados");
      console.log(usuario);
      setErrorLogueo("Por favor, revise sus credenciales");
      handleOpen();
      setUsuario({
        nombre: "",
        username: "",
        password: "",
      });
    }
    // useEffect(() => {
    // if (usuarioLogueado) {
    //   setErrorLogueo(`Gracias por ingresar ${usuario.username}`);

    //   }
    // }, [usuarioLogueado]);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cerrar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errorLogueo && (
              <h5 className="msj-form-guardado">{errorLogueo}</h5>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Paper
          sx={{
            width: "320px",
            overflow: "hidden",
            position: "relative",
          }}
          style={{
            placeItems: "center",
            margin: "auto",
            justifyContent: "spaceBetween",
            height: "100px",
            marginTop: "10rem",
          }}
        >
       
          <IconButton
            aria-label="cerrar"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>

          <div>
            {errorLogueo && (
              <h5 className="msj-form-guardado">{errorLogueo}</h5>
            )}
          </div>
        </Paper>
      </Modal> */}

      {!usuarioLogueado ? (
        <Paper
          sx={{
            width: "auto",
            maxWidth: "320px",
            margin: "auto",
            overflow: "hidden",
            height: "fitContent",
            justifyContent: "spaceAround",
            padding: "1rem",
          }}
          style={{
            margin: "auto",
            justifyContent: "spaceBetween",
            marginTop: "5rem",
            height: "fitContent",
            alignContent: "center",
          }}
        >
          <div className="pagina-formulario-Ingreso">
            <Typography style={{ fontSize: "30px" }}>
              {" "}
              Inicia sesión ahora
            </Typography>

            <FormControl
              onSubmit={handleSubmit}
              sx={{
                overflow: "hidden",
                justifyContent: "spaceBetween",
                height: "fitContent",
              }}
            >
              <div className="formulario-inicio">
                {/* <TextField
                  id="nombre"
                  label="Nombre"
                  variant="standard"
                  className="campo-formulario"
                  type="text"
                  placeholder="Ingresa tu nombre "
                  value={usuario.nombre}
                  onChange={onChangeNombre}
                  required
                  margin="normal"
                  style={{ borderColor: nombreValido ? "" : "red" }}
                />

                {!nombreValido ? (
                  <p className="error-form-inicio">
                    Ingrese entre 3 y 30 caracteres y solo contener letras.
                  </p>
                ) : (
                  ""
                )} */}

                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  className="campo-formulario"
                  type="email"
                  placeholder="Ingresa tu email"
                  value={usuario.username}
                  onChange={onChangeEmail}
                  required
                  margin="normal"
                  style={{ borderColor: emailValido ? "" : "red" }}
                />
                {!emailValido ? (
                  <Typography variant="body2" style={{ color: "red" }}>
                    Ingrese un email válido. Debe contener al menos 3 caracteres antes del arroba.
                  </Typography>
                ) : (
                  ""
                )}

                <TextField
                  id="password"
                  label="Password *"
                  variant="standard"
                  className="campo-formulario"
                  type="password"
                  placeholder="Ingresa tu password"
                  value={usuario.password}
                  onChange={onChangePass}
                  required
                  margin="normal"
                  style={{ borderColor: passwordValido ? "" : "red" }}
                />
                {!passwordValido ? (
                  <p className="error-form-inicio">
                    La contraseña debe tener al menos 8 caracteres, incluir una
                    letra mayúscula y un carácter no alfanumérico.
                  </p>
                ) : (
                  ""
                )}

                <Button
                  className="boton-form-ini"
                  type="submit"
                  value="Acceso"
                  variant="outlined"
                  onClick={handleSubmit}
                  style={{
                    margin: "30px 0 15px 0",
                  }}
                >
                  Acceso
                </Button>
              </div>
            </FormControl>

            <div className="acceso-cuenta-o-usuarionuevo">
              <div onClick={() => window.location.replace("/formaltauser")}>
                No tenés cuenta?
              </div>
              {/* <div>No tenés cuenta?</div> */}
              <div>Se te olvidó tu contraseña?</div>
            </div>
          </div>
        </Paper>
      ) : (
        ""
      )}
    </>
  );
};

export default FormIngreso;
