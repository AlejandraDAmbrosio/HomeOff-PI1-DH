import React, { useState, useContext } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const FormIngreso = () => {
  const { usuarioLogueado, iniciarSesion } = useContext(ContextGlobal);

  //////////////////////////////////////
  // Repo de validaciones
  const [nombreValido, setNombreValido] = useState(true);
  const [emailValido, setEmailValido] = useState(true);
  const [passwordValido, setPasswordValido] = useState(true);

  ////////// Segmento modal   //////////
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Cambia "/"" por la ruta correcta hacia la página de inicio
  };

  //////////////////////
  // / Definicion de User/Objeto
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  // / Definicion de Form
  const [form, setForm] = useState(false);

  ////////////////OnChanges///////////////

  const onChangeNombre = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, nombre: newValue });
    validarNombre(newValue);
  };

  const onChangeEmail = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, email: newValue });
    validarEmail(newValue);
  };

  const onChangePass = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, password: newValue });
    validarPassword(newValue);
  };

  //////////Validaciones ///////////////////

  const validarNombre = (n) => {
    const regex = /^[A-Za-z\s]{3,30}$/;
    if (regex.test(n)) {
      setNombreValido(true);
      return true;
    } else {
      setNombreValido(false);
      return false;
    }
  };

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
      validarNombre(usuario.nombre) &&
      validarEmail(usuario.email) &&
      validarPassword(usuario.password)
    );
  };

  ///////handleSubmit //////
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setForm(true);
      console.log("Datos Enviados");
      console.log(usuario);

      //ENVIAR DATOS
      iniciarSesion(usuario.nombre, usuario.email, usuario.password);

      setUsuario({
        nombre: "",
        email: "",
        password: "",
      });
    } else {
      setForm(false);
      console.log("Datos No Enviados");
      console.log(usuario);
      setUsuario({
        nombre: "",
        email: "",
        password: "",
      });
    }
    handleOpen();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Paper
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
          {/* Botón de cerrar */}
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
            {form && usuarioLogueado ? (
              <h5 className="msj-form-guardado">
                Gracias!! Has ingresado como usuario{" "}
                {usuarioLogueado.nombreCompleto} a HomeOFF !
              </h5>
            ) : (
              <h5 className="msj-form-guardado">
                Por favor, revise las credenciales.
              </h5>
            )}
          </div>
        </Paper>
      </Modal>

      {!usuarioLogueado ? (
        <Paper
          sx={{
            width: "auto",
            maxWidth:"400px",
            margin:"auto",
            overflow: "hidden",
            height: "fitContent",
             justifyContent: "spaceAround",
            padding:"1rem"
          }}
          style={{
            margin: "auto",
            justifyContent: "spaceBetween",
            marginTop: "5rem",
            height: "fitContent",
            alignContent:"center"
          }}
        >
          <div className="pagina-formulario-Ingreso">
            <Typography style={{fontSize:"30px"}}> Inicia sesión ahora</Typography>

            <FormControl
              onSubmit={handleSubmit}
              sx={{
                overflow: "hidden",
                justifyContent: "spaceBetween",
                height: "fitContent",
              }}
            >
              <div className="formulario-inicio">
                <TextField
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
                )}

                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  className="campo-formulario"
                  type="email"
                  placeholder="Ingresa tu email"
                  value={usuario.email}
                  onChange={onChangeEmail}
                  required
                  margin="normal"
                  style={{ borderColor: emailValido ? "" : "red" }}
                />
                {!emailValido ? (
                  <p className="error-form-inicio">
                    Ingresar al menos 3 caracteres antes del arroba y tener un
                    formato válido.
                  </p>
                ) : (
                  ""
                )}

                <TextField
                  id="password"
                  label="Password *"
                  variant="standard"
                  className="campo-formulario"
                  type="email"
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
              <div>No tenés cuenta?</div>
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
