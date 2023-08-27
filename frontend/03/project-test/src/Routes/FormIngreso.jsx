import React, { useState, useEffect, useContext } from "react";
import "../Components/FormIngreso.css";
import Error from "../Components/Error";
import { MdCheckCircleOutline, MdHighlightOff } from "react-icons/md";
import axios from "axios";
import { ContextGlobal } from "../Components/utils/global.context";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from '@mui/material/Typography';

// import { AuthContext } from "../Components/utils/global.contextauth";

const FormIngreso = () => {
  const { usuarioLogueado, iniciarSesion, cerrarSesion } =
    useContext(ContextGlobal);

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
          sx={{ width: "315px", overflow: "hidden" }}
          style={{
            placeItems: "center",
            margin: "auto",
            justifyContent: "spaceBetween",
            height: "100px",
            marginTop:"10rem" 
          }}
        >
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

      <Paper
        sx={{ width: "315px", overflow: "hidden", height: "fitContent"}}
        style={{ margin: "auto", justifyContent: "spaceBetween", marginTop:"5rem" }}
      >
        <div className="pagina-formulario-Ingreso">
        <Typography variant="h4"> Inicia sesión ahora</Typography>
     
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
                  <p className="error-form">
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
                  <p className="error-form">
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
                  <p className="error-form">
                    La contraseña debe tener al menos 8 caracteres, incluir una
                    letra mayúscula y un carácter no alfanumérico.
                  </p>
                ) : (
                  ""
                )}
              

              <Button
                className="boton-form-inicio"
                type="submit"
                value="Acceso"
                variant="outlined"
                onClick={handleSubmit}
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
    </>
  );
};

export default FormIngreso;
