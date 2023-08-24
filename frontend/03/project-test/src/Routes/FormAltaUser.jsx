import React, { useState } from "react";
import { Boton } from "../Components/Genericos/Boton";
import "../Components/FormAltaUser.css";
import Error from "../Components/Error";
import axios from "axios";
import { ContextGlobal } from "../Components/utils/global.context";
import { useEffect, useContext } from "react";


const FormAltaUser = () => {
  const { usersLista, setUsersLista, getDatosUsers } =
  useContext(ContextGlobal);
  const textoBotonGuardarForm = "Crear Cuenta";
  const urlBase = "http://52.32.210.155:8080/api/v1/usuarios/save";

  //Repo de validaciones
  const [nombreValido, setNombreValido] = useState(true);
  const [apellidoValido, setApellidoValido] = useState(true);
  const [emailValido, setEmailValido] = useState(true);
  const [confirmacionEmailValido, setConfirmacionEmailValido] = useState(true);
  const [passwordValido, setPasswordValido] = useState(true);
  const [confirmacionPasswordValido, setConfirmacionPasswordValido] =
    useState(true);

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
      console.log("Datos Enviados");
      console.log(usuario);
      // Paquete de datos a enviar

      const nuevoUserData = {
        nombreCompleto: usuario.nombre,
        correo: usuario.email,
        contraseña: usuario.password,
        celular: "",
        rol: "ADMINISTRADOR",
        dirección: "Falsa",
        permisoEdición: "EDITAR",
        id_Rol: 2,
        idUsuario: 0,
      };

      /////////////////////////////ENVIO DE DATOS
      try {
        const jsonData = JSON.stringify(nuevoUserData);
        const response = await axios.post(urlBase, jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Respuesta:", response.data);
        getDatosUsers();
        console.log(usersLista)
      } catch (error) {
        console.error("Error:", error);
      }
      useEffect(() => {
        if (form) {
          getDatosUsers(); // Actualiza el estado jsonData después de enviar la petición POST
        }
      }, [form]);






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
    <div className="pagina-formulario-alta">
      <div className="encabezado-formulario">
        <div className="titulo-form-inicio-sesion">Crea tu cuenta</div>
      </div>

      <form onSubmit={handleSubmitCrearCuenta}>
        <div className="formularioAltaUser">
          <div className="form-control">
            <label for="nombre">Nombre *</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={usuario.nombre}
              onChange={onChangeNombre}
              id="nombre"
              style={{ borderColor: nombreValido ? "" : "red" }}
            />
            {!nombreValido ? (
              <p className="error-form">
                Ingrese entre 3 y 30 caracteres y solo contener letras.
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="form-control">
            <label for="apellido">Apellido *</label>
            <input
              type="text"
              placeholder="Ingresa tu apellido"
              value={usuario.apellido}
              onChange={onChangeApellido}
              id="apellido"
              style={{ borderColor: apellidoValido ? "" : "red" }}
            />
            {!apellidoValido ? (
              <p className="error-form">
                Ingrese entre 3 y 30 caracteres y solo contener letras.
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="form-control">
            <label for="email">Email *</label>
            <input
              type="email"
              placeholder="ejemplo@gmail.com"
              value={usuario.email}
              onChange={onChangeEmail}
              id="email"
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
          </div>

          <div className="form-control">
            <label for="confirmaremail">Confirma Email *</label>
            <input
              type="email"
              placeholder="Confirmar Email"
              value={usuario.confirmacionEmail}
              onChange={onChangeConfirmacionEmail}
              id="confirmaremail"
              style={{ borderColor: confirmacionEmailValido ? "" : "red" }}
            />
            {!confirmacionEmailValido ? (
              <p className="error-form">Los emails no coinciden.</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-control">
            <label for="Password">Password *</label>
            <input
              type="password"
              placeholder="********"
              value={usuario.password}
              onChange={onChangePassword}
              id="password"
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
          </div>

          <div className="form-control">
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
          </div>

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
      <div className="acceso-cuenta-o-usuarionuevo">
        <p>¿No tenés cuenta?</p>
        <p>¿Se te olvidó tu contraseña?</p>
      </div>
    </div>
  );
};

export default FormAltaUser;
