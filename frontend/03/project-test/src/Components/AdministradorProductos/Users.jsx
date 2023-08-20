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
    <TableContainer >
      <Table>
        {/* <div className="encabezado-tabla"> */}
        <TableHead>
          {/* <thead> */}

          <TableRow
            style={{
              backgroundColor: "lightgray",
              borderRadius: ":var(--bRadiusButton)",
              padding:"10px",
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
            <TableRow key={idUsuario}>
              {/* <tr key={idUsuario}> */}
              <TableCell   style={{
              backgroundColor: "#9dd6b3",
              fontSize:"20px",
              borderRadius: "50%",
              margin:"0",
              textAlign: "center",
              width: "20px",
            }}>
                <div className="user-initials">
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
                  Remove
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
                <div className="editar-button">Editar</div>
              </TableCell>
              {/* </tr> */}
            </TableRow>
          ))}

          {/* </tbody> */}
        </TableBody>
      </Table>
      {/* </table> */}
    </TableContainer>
  );
};

export default Users;

// 2opcion CARDS
// <div className="users-container">
//       {usersLista.map((user, idUsuario) => (
//         <div key={idUsuario} className="user-card">
//           <div className="user-initials">
//             {obtenerIniciales(user.nombreCompleto)}
//           </div>
//           <div className="user-info">
//             <div className="info-item">IdUsuario: {user.idUsuario}</div>
//             <div className="info-item">Nombre: {user.nombreCompleto}</div>
//             <div className="info-item">Correo: {user.correo}</div>
//             <div className="info-item">Rol: {user.rol}</div>
//             <div className="info-item">
//               <button className="editar-button">Editar</button>
//               <img
//                 src="./images/Eliminar.svg"
//                 alt="Eliminar"
//                 className="eliminar-button"
//                 onClick={() => eliminarUsuario(user.idUsuario)}
//               />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>

// 1era OPCION tabla///////////////////////////////////////////////////
// <table className="tabla">
// <thead>
//   <tr>
//     <th>Imagen</th>
//     <th>IdUsuario</th>
//     <th>Nombre</th>
//     <th>Correo</th>
//     <th>Rol</th>
//     <th>Eliminar</th>
//     <th>Editar</th>
//   </tr>
// </thead>
// <tbody>
//   {usersLista.map((user, idUsuario) => (
//     <tr key={idUsuario}>
//       <th> {obtenerIniciales(user.nombreCompleto)} </th>
//       <td>{user.idUsuario}</td>
//       <td>{user.nombreCompleto}</td>
//       <td>{user.correo}</td>
//       <td>{user.rol}</td>
//       <th className="boton-eliminar">Editar</th>
//       <th
//         className="boton-eliminar"
//         onClick={() => eliminarUsuario(user.idUsuario)}
//       >
//         <img
//           src="./images/Eliminar.svg"
//           alt="Eliminar"
//           className="imagen-eliminar"
//         />
//       </th>

//     </tr>
//   ))}
// </tbody>
// </table>
