import React from "react";
import { ContextGlobal } from "../../utils/global.context";
import CardInfoUser from "./CardInfoUser";
import { useState, useEffect, useContext } from "react";
import obtenerIniciales from "../../utils/iniciales";
import "./Users.css";
import Paper from "@mui/material/Paper";

import axios from "axios";
import Box from "@mui/joy/Box";
import ChipDelete from "@mui/joy/ChipDelete";
import Chip from "@mui/joy/Chip";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/joy/Avatar";

import {
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableHead,
  TableCell,
  //   Chip,
} from "@mui/material";

const Users = () => {
  const [open, setOpen] = React.useState(false);
  const [usuarioXEliminar, setUsuarioXEliminar] = useState(null);

  const [usuarioXEditar, setUsuarioXEditar] = useState({
    nombreCompleto: "",
    correo: "",
    contraseña: "",
    celular: "",
    rol: "",
    dirección: "Falsa",
    permisoEdición: "",
    id_Rol: 0,
    idUsuario: 2,
  });

  const { usersLista, setUsersLista, getDatosUsers } =
    useContext(ContextGlobal);

  useEffect(() => {
    getDatosUsers();
  }, []);

  // const eliminarUsuario = async (idUsuario) => {
  //   try {
  //     await axios.get(
  //       `http://52.32.210.155:8080/api/v1/usuarios/delete/${idUsuario}`
  //     );

  //     const updatedUsers = usersLista.filter(
  //       (user) => user.idUsuario !== idUsuario
  //     );
  //     setUsersLista(updatedUsers);
  //   } catch (error) {
  //     console.error("Error al eliminar el usuario:", error);
  //   }
  // };

  // const handleClick = (e) => {
  //   setUsuarioXEliminar(e.target.idUsuario);
  //   setOpen(true);
  //   console.log(e.target.idUsuario);
  // };

  ////////////////////////////// Actualizar Rol //////////////////////////////
  // 1) Indicar que usuario debemos modificar
  const handleClick = (e, idRecurso) => {
    setIdRecursoToDelete(idRecurso);
    setOpenDialog(true);
  };

  // 2) Traer info de todos los campos del usuario seleccionado y si tiene un valor el rol, cambiarlo

  //////////////////////////////////
  const urlBaseActualizar = "http://52.32.210.155:8080/api/v1/usuarios/update";
  const handleUpdateUser = async (usuarioXEditar) => {
    console.log(usuarioXEditar.idUsuario);
    if (usuarioXEditar.idUsuario) {
      const updatedUser = {
        nombreCompleto: usuarioXEditar.nombreCompleto,
        correo: usuarioXEditar.correo,
        contraseña: usuarioXEditar.contraseña,
        celular: usuarioXEditar.celular,
        rol:
          usuarioXEditar.rol === "ADMINISTRADOR" ? "CLIENTE" : "ADMINISTRADOR",
        dirección: "Falsa",
        permisoEdición:
          usuarioXEditar.permisoEdición === "EDITAR" ? "" : "EDITAR",
        id_Rol: usuarioXEditar.id_Rol === 1 ? "2" : "1",
        idUsuario: usuarioXEditar.idUsuario,
      };

      try {
        const response = await axios.post(urlBaseActualizar, updatedUser, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Respuesta:", response.data);
        getDatosUsers(); // Actualizar la lista de usuarios
        setUsuarioXEditar(null); // Limpiar el usuario seleccionado
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    }
  };

  /////////////////////////////////////

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden" }}
      style={{ margin: "0 20px 0 0" }}
    >
      <TableContainer   sx={{ maxHeight: 400 }}
          style={{
            borderRadius: ":var(--bRadiusButton)",
            padding: "10px",
          }}>
        <Table stickyHeader aria-label="sticky table">
          {/* <div className="encabezado-tabla"> */}
          <TableHead>
            {/* <thead> */}

            <TableRow
              style={{
                backgroundColor: "lightgray",
                borderRadius: ":var(--bRadiusButton)",
                padding: "10px",
                width: "100%",
              }}
            >
              <TableCell>Imagen</TableCell>
              <TableCell>IdUsuario</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Rol</TableCell>
            </TableRow>

            {/* </thead> */}
          </TableHead>
          {/* </div> */}
          <TableBody>
            {/* <tbody> */}

            {usersLista.map((user, idUsuario) => (
              <TableRow
                key={idUsuario}
                style={{
                  height: "100px",
                  width: "100%",
                  borderRadius: ":var(--bRadiusButton)",
                }}
              >
                <TableCell>
                  {/* <Button
                  style={{
                    backgroundColor: "#9dd6b3",
                    fontSize: "20px",
                    borderRadius: "50%",
                    margin: "0",
                    display: "flex",
                    justifyContent: "center",
                    aligItems: "center",
                    textAlign: "center",
                    padding: "30px",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  {obtenerIniciales(user.nombreCompleto)}
                </Button> */}
                  <Avatar
                    variant="solid"
                    size="lg"
                    style={{
                      backgroundColor: "#9dd6b3",
                      color: "black",
                    }}
                  >
                    {obtenerIniciales(user.nombreCompleto)}
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="info-item">{user.idUsuario}</div>
                </TableCell>
                <TableCell
                  style={{
                    width: "600px",
                  }}
                >
                  <div className="info-item">{user.nombreCompleto}</div>
                </TableCell>
                <TableCell
                  style={{
                    width: "600px",
                  }}
                >
                  <div className="info-item">{user.correo}</div>
                </TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    gap: "1rem",
                    width: "250px",
                    aligItems: "center",
                    textAlign: "center",
                    padding: "30px 0 30px 0",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "#9dd6b3",
                    }}
                    size="md"
                    variant="soft"
                    color="primary"
                    endDecorator={<EditIcon />}
                    onClick={() => handleUpdateUser(user)}
                  >
                    {user.rol}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Users;
