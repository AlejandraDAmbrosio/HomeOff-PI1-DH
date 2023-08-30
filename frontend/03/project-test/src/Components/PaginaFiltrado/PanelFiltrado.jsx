import React from "react";
import "./PanelFiltrado.css";
import { Button } from "@mui/material";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Home from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ListDivider from "@mui/joy/ListDivider";
import { Link } from "react-router-dom";

// import { NextLinkComposed } from '../src/Link';

const PanelFiltrado = () => {
  return (
    <Box
      width={350}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "left",
      }}
    >
      <List
        size="lg"
        variant="outlined"
        sx={{
          maxWidth: 350,
          borderRadius: "sm",
        }}
      >
        <ListItem>
          <ListItemButton>Buscar por:</ListItemButton>
        </ListItem>

        <ListDivider />
        <Link>
          <ListItem>
            <ListItemButton>Categorias</ListItemButton>
          </ListItem>
        </Link>

        <Link>
          <ListItem>
            <ListItemButton>Sedes</ListItemButton>
          </ListItem>
        </Link>

        <Link>
          <ListItem>
            <ListItemButton>Características</ListItemButton>
          </ListItem>
        </Link>

        <Link>
          <ListItem>
            <ListItemButton>Capacidad Máxima</ListItemButton>
          </ListItem>
        </Link>

        <Link>
          <ListItem>
            <ListItemButton>Tipo de espacio</ListItemButton>
          </ListItem>
        </Link>

        <ListItem>
          <ListItemButton>Precio</ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default PanelFiltrado;
