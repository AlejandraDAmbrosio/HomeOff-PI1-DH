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

  ////////////////////////////// Actualizar Rol //////////////////////////////
  // 1) Indicar que usuario debemos modificar
  const handleClick = (e, idRecurso) => {
    setIdRecursoToDelete(idRecurso);
    setOpenDialog(true);
  };

  // 2) Traer info de todos los campos del usuario seleccionado y si tiene un valor el rol, cambiarlo

  const urlBaseActualizar = "http://44.231.66.124:8080/api/v1/usuarios/update";
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
