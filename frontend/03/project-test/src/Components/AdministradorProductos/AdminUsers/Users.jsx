import React, { useState, useEffect, useContext } from "react";
import { ContextGlobal } from "../../utils/global.context";
import obtenerIniciales from "../../utils/iniciales";
import "./Users.css";
import EditIcon from "@mui/icons-material/Edit";
import  Button from "@mui/joy/Button";
import  Avatar  from "@mui/joy/Button";

import {
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableHead,
  TableCell,
  Paper,
} from "@mui/material";
import axios from "axios";

const Users = () => {
  const { usersLista, setUsersLista, getDatosUsers, tokenUserState, getDatosUsersXID, usersXID } =
  useContext(ContextGlobal);

console.log("-------------- > getTokenUser", tokenUserState);

  const [open, setOpen] = React.useState(false);
  const [usuarioXEliminar, setUsuarioXEliminar] = useState(null);

  const [usuarioXEditar, setUsuarioXEditar] = useState({
    nombrecompleto: "",   //
    nombre: "",
    apellido: "",
    username: "",     //
    password: "",
    celular: "",
    dirección: "Falsa",
    permisoedición: "EDITAR",
    rol: "",
    idUsuario:0,
});

  useEffect(() => {
    getDatosUsers();
  }, []);

  ////////////////////////////// Actualizar Rol //////////////////////////////
  // 1) Indicar que usuario debemos modificar
  const handleClick = (e, idRecurso) => {
    setIdRecursoToDelete(idRecurso);
    setOpenDialog(true);
  };
  // 2) Traer info de todos los campos del usuario seleccionado y si tiene un valor el rol, cambiarlo

  const urlBaseActualizar = "http://52.32.210.155:8080/auth/usuario/update";
  const handleUpdateUser = async (usuarioXEditar) => {

    getDatosUsersXID(usuarioXEditar.idUsuario)
    console.log("usersXID", usersXID);
    console.log(usuarioXEditar.idUsuario);
    if (usuarioXEditar.idUsuario) {
      const updatedUser = {
        nombre: usersXID.nombre,
        apellido: usersXID.apellido,
        nombrecompleto: usuarioXEditar.nombrecompleto,
        username: usuarioXEditar.username,
        celular: usuarioXEditar.celular,
        password:usersXID.password,
        rol:
          usuarioXEditar.rol === "ADMINISTRADOR" ? "CLIENTE" : "ADMINISTRADOR",
        direccion: "Falsa",
        idUsuario: usuarioXEditar.idUsuario,
        permisoedicion: "EDITAR"
      };

      try {
        console.log("........... -updatedUser" , updatedUser)
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
      <TableContainer
        sx={{maxHeight: 500,  width: "100%" }}
        style={{
          borderRadius: ":var(--bRadiusButton)",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
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

          </TableHead>
          <TableBody>

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
                  <Avatar
                    variant="solid"
                    size="lg"
                    style={{
                      backgroundColor: "#9dd6b3",
                      color: "black",
                    }}
                  >
                    {obtenerIniciales(user.nombrecompleto)}
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
                  <div className="info-item">{user.nombrecompleto}</div>
                </TableCell>
                <TableCell
                  style={{
                    width: "600px",
                  }}
                >
                  <div className="info-item">{user.username}</div>
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
