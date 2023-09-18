import React, { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from "../../utils/global.context";
import axios from "axios";
import {
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableHead,
  TableCell,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ButtonBase,
} from "@mui/material";
import Chip from "@mui/joy/Chip";
import Button from "@mui/joy/Chip";
import EditIcon from "@mui/icons-material/Edit";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import nombreExiste from "../../utils/nombreExiste.js";

const TableroPoliticas = () => {
    const {
        politicas, setPoliticas,
        getPoliticas,
      } = useContext(ContextGlobal);

    //   const handleOpenEditDialog = (item) => {
    //     setEditedItem(item);
    //     setEditDialogOpen(true);
    //   };
    //   const [openDialog, setOpenDialog] = useState(false);




      useEffect(() => {
        getPoliticas();
      }, []);

    console.log(politicas);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <div
      className="lista-caracteristicas"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
         </div>



         {/* <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Editar </DialogTitle>
        <DialogContent> */}
          {/* <TextField
            autoFocus
            margin="dense"
            id="edit-imagen"
            label="Imagen"
            type="text"
            fullWidth
            value={editedItem.logoCaracteristica}
            onChange={(e) =>
              setEditedItem({ ...editedItem, logoCaracteristica: e.target.value })
            }
          /> */}
          {/* <TextField
            autoFocus
            margin="dense"
            id="edit-nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={editedItem.nombre}
            onChange={(e) =>
              setEditedItem({ ...editedItem, nombre: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleGuardarEdicion}>Guardar</Button>
        </DialogActions>
      </Dialog> */}
    <div>TableroPoliticas</div>
    <Paper
    sx={{ width: "100%", overflow: "hidden" }}
    style={{ margin: "0 20px 0 0" }}
  >
    <TableContainer
      sx={{ maxHeight: 500, width: "100%" }}
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
              // padding: "10px",
              width: "100%",
            }}
          >
            <TableCell>IdRecurso</TableCell>
            <TableCell>idPoliticas</TableCell>
            <TableCell>Politica de cambio de fecha</TableCell>
            <TableCell>politica de cancelacion</TableCell>
            <TableCell>politica de uso y conducta</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Eliminar</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {politicas.map((politicas, idPoliticas) => (
            <TableRow key={idPoliticas} style={{ height: "30px" }}>
              <TableCell style={{ width: "110px" }}>
               {politicas.idRecurso}
              </TableCell>
              <TableCell style={{width: "110px" }}>
               {politicas.idPoliticas}
              </TableCell>
              <TableCell style={{ width: "400px" }}>
              {politicas.politica_cambio_fecha}
              </TableCell>
              <TableCell style={{ width: "400px" }}>
              {politicas.politica_cancelacion}
              </TableCell>
              <TableCell style={{ width: "400px" }}>
              {politicas.politica_uso_conducta}
              </TableCell>
          
              <TableCell>
                {/* <Button
                  style={{
                    backgroundColor: "#9dd6b3",
                  }}
                  size="md"
                  variant="soft"
                  color="primary"
                  endDecorator={<EditIcon />}
                  onClick={() => handleOpenEditDialog(politicas)}
                >
                  {" "}
                </Button> */}
              </TableCell>

              <TableCell>
                {/* <Chip
                  color="danger"
                  size="lg"
                  variant="solid"
                  startDecorator={<DeleteForeverIcon />}
                  onClick={(e) =>
                    handleClickEliminar(e, politicas.idPoliticas)
                  }
                ></Chip> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
  </div>
  )
}

export default TableroPoliticas