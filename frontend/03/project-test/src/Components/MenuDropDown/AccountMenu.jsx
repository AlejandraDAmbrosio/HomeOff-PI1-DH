import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AvatarNav from "../Navbar/AvatarNav";
import { ContextGlobal } from "../utils/global.context";
import obtenerIniciales from "../utils/iniciales";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BsHeart, BsCalendarEvent } from "react-icons/bs";
import FormIngreso from "../../Routes/FormIngreso";
import Modal from "@mui/material/Modal";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";

export default function AccountMenu() {
  const {
    isAdmin,
    usuarioLogueado,
    iniciarSesion,
    cerrarSesion,
    nombreCompleto,
    userIdLogIn,
  } = useContext(ContextGlobal);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [openLogIn, setOpenLogIn] = useState(false);

  const handleOpenLogIn = () => {
    setOpenLogIn(true);
  };

  const handleCloseLogIn = () => {
    setOpenLogIn(false);
  };
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AvatarNav></AvatarNav>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            maxWidth: "320px",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",

            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 5,
              width: 13,
              height: 15,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {!usuarioLogueado && (
          <MenuItem
            onClick={() => {
              handleOpenLogIn(); // Cierra el menú
            }}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            Iniciar sesión
          </MenuItem>
        )}

        {usuarioLogueado && (
          <MenuItem onClick={handleClose}>
            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                height: "40px",
              }}
            >
              <AvatarNav />
              <Stack
                spacing={0.3}
                alignItems={"flex-start"}
                justifyContent={"space-between"}
              >
                <div
                  style={{
                    fontSize: "7px",
                    lineHeight: "8px",
                    color: "#424242",
                  }}
                >
                  Conectado como
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    lineHeight: "20px",
                    fontWeight: "600",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    maxWidth: "180px",
                  }}
                >
                  {usuarioLogueado}
                </div>
              </Stack>
            </Stack>
          </MenuItem>
        )}

        <Divider />

        {!usuarioLogueado && (
          <MenuItem>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <Link to="/formaltauser/">Crear Cuenta</Link>
          </MenuItem>
        )}

        {usuarioLogueado && (
          <Link to={`/favoritos/${userIdLogIn}`}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <BsHeart fontSize="24"  style={{textAlign:"center"}}/>
              </ListItemIcon>
              Favoritos
            </MenuItem>
          </Link>
        )}

        {usuarioLogueado && (
          <Link to={`/verreservas/${userIdLogIn}`}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <BsCalendarEvent fontSize="21" />
              </ListItemIcon>
              Historial Reservas
            </MenuItem>
          </Link>
        )}




        {isAdmin && (
          /*usuarioLogueado.rol == "ADMINISTRADOR" &&*/ <Link to="/administradorproductos/">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Panel Administrador
            </MenuItem>
          </Link>
        )}


        {usuarioLogueado && (
          <MenuItem
            onClick={() => {
              handleOpenDialog(); // Abre el diálogo de confirmación
            }}
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            Cerrar sesión
          </MenuItem>
        )}
      </Menu>

      <Modal open={openLogIn} onClose={handleCloseLogIn} BackdropClick={true}>
        <div onClick={handleModalClick} onMouseDown={handleModalClick}>
          <FormIngreso />
        </div>
      </Modal>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar cierre de sesión"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Desea cerrar la sesión actual?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              cerrarSesion(); // Cierra la sesión
              handleCloseDialog(); // Cierra el diálogo
            }}
            color="primary"
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
