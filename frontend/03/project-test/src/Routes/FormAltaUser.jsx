import React, { useState } from "react";
import { Boton } from "../Components/Genericos/Boton";
import "../Components/FormAltaUser.css";
import Error from "../Components/Error";
import axios from "axios";
import { ContextGlobal } from "../Components/utils/global.context";
import { useEffect, useContext } from "react";
import { Container, Input, Stack, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";

const FormAltaUser = () => {
  const { usersLista, setUsersLista, getDatosUsers } =
    useContext(ContextGlobal);
  const textoBotonGuardarForm = "Crear Cuenta";
  const urlBase = "http://52.32.210.155:8080/auth/register";

  //Repo de validaciones
  const [nombreValido, setNombreValido] = useState(true);
  const [apellidoValido, setApellidoValido] = useState(true);
  const [emailValido, setEmailValido] = useState(true);
  const [confirmacionEmailValido, setConfirmacionEmailValido] = useState(true);
  const [passwordValido, setPasswordValido] = useState(true);
  const [confirmacionPasswordValido, setConfirmacionPasswordValido] =
    useState(true);

  ////// Visualizacion Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmarPassword, setShowConfirmarPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmarPassword = () =>
    setShowConfirmarPassword((show) => !show);

  const handleMouseDownConfirmarPassword = (event) => {
    event.preventDefault();
  };

  /// Definicion de User/Objeto
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    confirmacionEmail: "",
    password: "",
    confirmarPassword: "",
  });

  /// Definicion de Form

  const [form, setForm] = useState(false);

  //////////////////OnChanges///////////////

  const onChangeNombre = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, nombre: newValue });
    validarNombre(newValue);
  };

  const onChangeApellido = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, apellido: newValue });
    validarApellido(newValue);
  };

  const onChangeEmail = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, email: newValue });
    validarEmail(newValue);
  };

  const onChangeConfirmacionEmail = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, confirmacionEmail: newValue });
    validarConfirmacionEmail(newValue);
  };

  const onChangePassword = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, password: newValue });
    validarPassword(newValue);
  };

  const onChangeConfirmacionPassword = (e) => {
    const newValue = e.target.value;
    setUsuario({ ...usuario, confirmarPassword: newValue });
    validarConfirmacionPassword(newValue);
  };

  ///////////////Validaciones ///////////////////

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

  const validarApellido = (n) => {
    const regex = /^[A-Za-z\s]{2,30}$/;
    if (regex.test(n)) {
      setApellidoValido(true);
      return true;
    } else {
      setApellidoValido(false);
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

  const validarConfirmacionEmail = (e) => {
    const confirmarConfEmailRecortado = e.trim();
    if (confirmarConfEmailRecortado === usuario.email) {
      setConfirmacionEmailValido(true);
      return true;
    } else {
      setConfirmacionEmailValido(false);
      return false;
    }
  };

  const validarPassword = (p) => {
    const emSinEspacio = p.trim();
    const passRegexp = new RegExp(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(.{8,})$/);
    if (passRegexp.test(emSinEspacio)) {
      setPasswordValido(true);
      return true;
    } else {
      setPasswordValido(false);
      return false;
    }
  };

  const validarConfirmacionPassword = (e) => {
    const confirmarConfirmacionPassword = e.trim();
    if (confirmarConfirmacionPassword == usuario.password.trim()) {
      setConfirmacionPasswordValido(true);
      return true;
    } else {
      setConfirmacionPasswordValido(false);
      return false;
    }
  };

  ////// Validacion Form /////
  const validarFormulario = () => {
    return (
      validarNombre(usuario.nombre) &&
      validarApellido(usuario.apellido) &&
      validarEmail(usuario.email) &&
      validarConfirmacionEmail(usuario.confirmacionEmail) &&
      validarPassword(usuario.password) &&
      validarConfirmacionPassword(usuario.confirmarPassword)
    );
  };

  /////////handleSubmit //////
  const handleSubmitCrearCuenta = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setForm(true);

      // Paquete de datos a enviar

      const nuevoUserData = {
        nombrecompleto: usuario.nombre,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        username: usuario.email,
        password: usuario.password,
        celular: "0000000",
        direccion: "Falsa",
        permisoedicion: "EDITAR",
      };

      // const nuevoUserData = {
      //   nombrecompleto: "PadreNuestroHard",
      //   nombre: "PadreNuestroHard",
      //   apellido: "PadreNuestroHard",
      //   username: "PadreNuestroHrd@gmail.com",
      //   password: "Papanatas.1",
      //   celular: "256321548",
      //   direccion: "siempre viva",
      //   permisoedicion: "EDITAR"
      // }

      console.log("Datos Enviados");
      console.log(nuevoUserData);

      /////////////////////////////ENVIO DE DATOS

      try {
        const response = await axios.post(
          "http://52.32.210.155:8080/auth/register",
          nuevoUserData
        );

        if (response.status === 200) {
          console.log("Solicitud POST exitosa");
          console.log("Datos Enviados");
          console.log(nuevoUserData);
          console.log(urlBase);
          console.log("Respuesta:", response.data);
        } else {
          console.error(
            "La solicitud POST falló con el código de estado:",
            response.status
          );
          console.error("Respuesta del servidor:", response.data);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud POST:", error);
      }

      // const options = {
      //   method: 'POST',
      //   url: urlBase,
      //   headers: {"Content-Type": "application/json"},
      //   data:nuevoUserData,
      // }

      // try {
      // 	const response = await axios.request(options);
      // 	console.log(response.data);
      //   console.log(response);
      // } catch (error) {
      // 	console.error(error);
      // }

      // const jsonData = JSON.stringify(nuevoUserData);

      // try {
      //   const response = await fetch(urlBase, {
      //     method: "POST",
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: jsonData,
      //   });

      //   if (!response.ok) {
      //     throw new Error(`HTTP error! Status: ${response.status}`);
      //   }

      // } catch (error) {
      //   console.error("Error al realizar la solicitud:", error);
      // }

      // try {
      //   const jsonData = JSON.stringify(nuevoUserData);
      //   const response = await axios.post(urlBase, jsonData, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   console.log("Datos Enviados");
      //   console.log(nuevoUserData);
      //   console.log(urlBase);
      //   console.log("Respuesta:", response.data);

      //   getDatosUsers();
      //   console.log(usersLista);
      // } catch (error) {
      //   console.error("Error:", error);
      // }

      ///////////////////////////////////////////

      setUsuario({
        nombre: "",
        apellido: "",
        email: "",
        confirmacionEmail: "",
        password: "",
        confirmarPassword: "",
      });
    } else {
      console.log("Datos NO Enviados");
      console.log(usuario);
      setForm(false);
      setUsuario({
        nombre: "",
        apellido: "",
        email: "",
        confirmacionEmail: "",
        password: "",
        confirmarPassword: "",
      });
    }
  };

  return (
    <Container
      style={{ marginTop: "7rem", minHeight: "1000px", maxWidth: "330px" }}
    >
      <Stack
        style={{
          placeItems: "center",
          gap: "1rem",
          paddingBottom: "2rem",
          minHeight: "1000px",
        }}
      >
        <Typography variant="h4" style={{ color: "#9dd6b3" }}>
          Crea tu cuenta
        </Typography>

        <form onSubmit={handleSubmitCrearCuenta}>
          <div className="formularioAltaUser">
            <Input
              id="nombre"
              label="Nombre *"
              variant="standard"
              className="campo-formulario"
              type="text"
              placeholder="Ingresa tu nombre"
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

            {/* <div className="form-control"> */}
            <Input
              id="apellido"
              label="Apellido *"
              variant="standard"
              className="campo-formulario"
              type="text"
              placeholder="Ingresa tu apellido"
              value={usuario.apellido}
              onChange={onChangeApellido}
              required
              margin="normal"
              style={{ borderColor: apellidoValido ? "" : "red" }}
              sx={{ color: "black" }}
            />
            {!apellidoValido ? (
              <p className="error-form">
                Ingrese entre 3 y 30 caracteres y solo contener letras.
              </p>
            ) : (
              ""
            )}

          
              <Input
                id="email"
                label="Email *"
                variant="standard"
                className="campo-formulario"
                type="email"
                placeholder="ejemplo@gmail.com"
                value={usuario.email}
                onChange={onChangeEmail}
                required
                margin="normal"
                style={{ borderColor: emailValido ? "" : "red" }}
                />
                {!emailValido ? (
                  <p className="error-form">
                    Ingresar al menos 3 caracteres antes del @ y tener un formato
                    válido.
                  </p>
                ) : (
                  ""
                )}


            <Input
                id="confirmaremail"
                label="Confirma Email *"
                variant="standard"
                className="campo-formulario"
                type="email"
                placeholder="Confirmar Email"
                value={usuario.confirmacionEmail}
                onChange={onChangeConfirmacionEmail}
                required
                margin="normal"
                style={{ borderColor: confirmacionEmailValido ? "" : "red" }}
              />
              {!confirmacionEmailValido ? (
                <p className="error-form">Los emails no coinciden.</p>
              ) : (
                ""
              )}




           
            <Input
              id="password"
              label="Password *"
              variant="standard"
              className="campo-formulario"
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu password"
              value={usuario.password}
              onChange={onChangePassword}
              required
              margin="normal"
              style={{ borderColor: passwordValido ? "" : "red" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!passwordValido ? (
              <p className="error-form-inicio">
                La contraseña debe tener al menos 8 caracteres, incluir una
                letra mayúscula y un carácter no alfanumérico.
              </p>
            ) : (
              ""
            )}
{/* 
            <InputLabel htmlFor="standard-adornment-password">
              Confirmar password
            </InputLabel> */}
            <Input
              id="password"
              label="Password *"
              variant="standard"
              className="campo-formulario"
              type={showConfirmarPassword ? "text" : "password"}
              placeholder="Confirma tu password"
              value={usuario.confirmarPassword}
              onChange={onChangeConfirmacionPassword}
              required
              margin="normal"
              style={{ borderColor: passwordValido ? "" : "red" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmarPassword}
                    onMouseDown={handleMouseDownConfirmarPassword}
                  >
                    {showConfirmarPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!confirmacionPasswordValido ? (
              <p className="error-form-inicio">
                La contraseña debe tener al menos 8 caracteres, incluir una
                letra mayúscula y un carácter no alfanumérico.
              </p>
            ) : (
              ""
            )}

            {/* 
            <TextField
              id="password"
              label="Password *"
              variant="standard"
              className="campo-formulario"
              type="password"
              placeholder="Ingresa tu password"
              value={usuario.confirmarPassword}
              onChange={onChangeConfirmacionPassword}
              required
              margin="normal"
              style={{ borderColor: confirmacionPasswordValido ? "" : "red" }}
            />
            {!confirmacionPasswordValido ? (
              <p className="error-form-inicio">
                La contraseña debe tener al menos 8 caracteres, incluir una
                letra mayúscula y un carácter no alfanumérico.
              </p>
            ) : (
              ""
            )} */}

            {/* <div className="form-control">
              <label for="confirmarpassword">Confirma Password *</label>
              <input
                type="password"
                placeholder="********"
                value={usuario.confirmarPassword}
                id="confirmarpassword"
                style={{ borderColor: confirmacionPasswordValido ? "" : "red" }}
                onChange={onChangeConfirmacionPassword}
              />
              {!confirmacionPasswordValido ? (
                <p className="error-form">Los passwords no coinciden.</p>
              ) : (
                ""
              )}
            </div> */}

            {/* //////////////-----------------------------////////////// */}
            <button className="boton-alta-user" type="submit" value="Acceso">
              Crear Cuenta
            </button>
          </div>
          {form && (
            <h5 className="msj-form-guardado">
              Gracias !! Te has registrado como usuario de HomeOFF!!
            </h5>
          )}
        </form>
        <Stack style={{ width: "350px", placeItems: "center", gap: "1rem" }}>
          {/* <div className="acceso-cuenta-o-usuarionuevo-alta"> */}
          <p>¿No tenés cuenta?</p>
          <p>¿Se te olvidó tu contraseña?</p>
          {/* </div> */}
        </Stack>
      </Stack>
    </Container>
  );
};

export default FormAltaUser;
