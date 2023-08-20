import React from "react";
import "./PanelAdminUser.css";
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

const PanelAdminUser = () => {
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
          <ListItemButton>
            <ListItemDecorator>
              <Home />
            </ListItemDecorator>
            Home
          </ListItemButton>
        </ListItem>

        <ListDivider />
        <ListItemButton onClick={() => alert("You clicked")}>
          <ListItem>
            <ListItemButton>Administrar productos</ListItemButton>
          </ListItem>
        </ListItemButton>

        <ListItemButton onClick={() => alert("You clicked")}>
          <ListItem>
            <ListItemButton>Caracteristicas</ListItemButton>
          </ListItem>
        </ListItemButton>

        <Link to="/administrarcategorias/">
          <ListItem>
            <ListItemButton>Categorias</ListItemButton>
          </ListItem>
        </Link>

        <Link to="/administracionusers/">
          <ListItem>
            <ListItemButton>Usuarios</ListItemButton>
          </ListItem>
        </Link>

        <ListItemButton onClick={() => alert("You clicked")}>
          <ListItem>
            <ListItemDecorator>
              <SettingsIcon />
            </ListItemDecorator>
            <ListItemButton>Settings</ListItemButton>
          </ListItem>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default PanelAdminUser;
