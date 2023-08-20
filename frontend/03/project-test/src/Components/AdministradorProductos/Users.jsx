import React from "react";
import { ContextGlobal } from "../utils/global.context";
import CardInfoUser from "./CardInfoUser";
import { useState, useEffect, useContext } from "react";
import obtenerIniciales from "../utils/iniciales";
import "./Users.css";
import axios from "axios";
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';

import {
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableHead,
  TableCell,
  Chip,
} from "@mui/material";

const Users = () => {
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
  return (
    <TableContainer>
      <Table>
        <TableHead>
          {/* <thead> */}
          <tr>
            <th>Imagen</th>
            <th>IdUsuario</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Eliminar</th>
            <th>Editar</th>
          </tr>
          {/* </thead> */}
        </TableHead>
        <TableBody>
          {/* <tbody> */}

          {usersLista.map((user, idUsuario) => (
            <TableRow key={idUsuario}>
              {/* <tr key={idUsuario}> */}
              <TableCell>
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
                {/* <div
                // className="eliminar-button"
               
                > */}
                <Chip  size="lg"
                  variant="solid"
                  color="danger"
                  endDecorator={<ChipDelete onDelete={() => alert("Delete")} />}
               ></Chip>
                <Chip
                  size="lg"
                  variant="solid"
                  color="danger"
                  endDecorator={<ChipDelete onDelete={() => alert("Delete")} />}
                >
                  Delete
                </Chip>
                {/* <img
                    src="./images/Eliminar.svg"
                    alt="Eliminar"
                    className="eliminar-button"
                    onClick={() => eliminarUsuario(user.idUsuario)}
                /> */}
                {/* </div> */}
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
