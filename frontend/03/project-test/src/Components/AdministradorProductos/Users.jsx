import React from "react";
import { ContextGlobal } from "../utils/global.context";
import CardInfoUser from "./CardInfoUser";
import { useState, useEffect, useContext } from "react";
import obtenerIniciales from "../utils/iniciales";
import "./Users.css";
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
  const [usuarioXEliminar, setUsuarioXEliminar] = useState("");
  const { usersLista, setUsersLista, getDatosUsers } =
    useContext(ContextGlobal);

  useEffect(() => {
    getDatosUsers();
  }, []);

  const eliminarUsuario = async (idUsuario) => {
    try {
      await axios.delete(
        `http://52.32.210.155:8080/api/v1/usuarios/delete/${idUsuario}`
      );

      const updatedUsers = usersLista.filter(
        (user) => user.idUsuario !== idUsuario
      );
      setUsersLista(updatedUsers);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleClick = (e) => {
    setUsuarioXEliminar(e.target.idUsuario);
    setOpen(true);
    console.log(e.target.idUsuario);
  };

  return (
    <TableContainer>
      <Table>
        {/* <div className="encabezado-tabla"> */}
        <TableHead>
          {/* <thead> */}

          <TableRow
            style={{
              backgroundColor: "lightgray",
              borderRadius: ":var(--bRadiusButton)",
              padding: "10px",
            }}
          >
            <TableCell>Imagen</TableCell>
            <TableCell>IdUsuario</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Eliminar</TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>

          {/* </thead> */}
        </TableHead>
        {/* </div> */}
        <TableBody>
          {/* <tbody> */}

          {usersLista.map((user, idUsuario) => (
            <TableRow key={idUsuario} style={{ height: "100px" }}>
              <TableCell>
                <div
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
                </div>
              </TableCell>
              <TableCell>
                <div className="info-item">{user.idUsuario}</div>
              </TableCell>
              <TableCell>
                <div className="info-item">{user.nombreCompleto}</div>
              </TableCell>
              <TableCell>
                <div className="info-item">{user.correo}</div>
              </TableCell>
              <TableCell>
                <div className="info-item">{user.rol}</div>
                <Chip
                  color="neutral"
                  size="lg"
                  variant="solid"
                  endDecorator={<EditIcon />}
                  onClick={(e) => {
                    setUsuarioXEliminar(e.target.id);
                    setOpen(true);
                  }}
                ></Chip>

              </TableCell>
              <TableCell>
                <Chip
                  color="danger"
                  size="lg"
                  variant="solid"
                  endDecorator={<DeleteForever />}
                  onClick={(e) => {
                    setUsuarioXEliminar(e.target.id);
                    setOpen(true);
                  }}
                >
                 
                </Chip>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <ModalDialog
                    variant="outlined"
                    role="alertdialog"
                    aria-labelledby="alert-dialog-modal-title"
                    aria-describedby="alert-dialog-modal-description"
                  >
                    <Typography
                      id="alert-dialog-modal-title"
                      level="h2"
                      startDecorator={<WarningRoundedIcon />}
                    >
                      Confirmación!!
                    </Typography>
                    <Divider />
                    <Typography
                      id="alert-dialog-modal-description"
                      textColor="text.tertiary"
                    >
                      Está seguro que desea eliminar el usuario{" "}
                      {usuarioXEliminar.nombreCompleto}?
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-end",
                        pt: 2,
                      }}
                    >
                      <Button
                        variant="plain"
                        color="neutral"
                        onClick={() => setOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="solid"
                        color="danger"
                        onClick={() => eliminarUsuario(usuarioXEliminar)}
                      >
                        Eliminar Usuario
                      </Button>
                    </Box>
                  </ModalDialog>
                </Modal>
              </TableCell>
              <TableCell>
                <Chip
                  color="neutral"
                  size="lg"
                  variant="solid"
                  endDecorator={<EditIcon />}
                  onClick={(e) => {
                    setUsuarioXEliminar(e.target.id);
                    setOpen(true);
                  }}
                ></Chip>
                
              </TableCell>
              
            </TableRow>
          ))}

         
        </TableBody>
      </Table>
     
    </TableContainer>
  );
};

export default Users;
