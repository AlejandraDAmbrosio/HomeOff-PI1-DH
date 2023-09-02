import React, { useState, useContext } from "react";
import "./Buscador.css";
import { MdSearch } from "react-icons/md";
import { ContextGlobal } from "../utils/global.context";
import { Box, TextField, Popover, Button } from "@mui/material";
import Calendario from "./Fecha/Calendario";
import Divider from "@mui/material/Divider";



const Buscador = () => {
  const { fechasBusqueda } = useContext(ContextGlobal);

  const [anchorEl, setAnchorEl] = useState(null);
  const isDateDropdownOpen = Boolean(anchorEl);

  const handleDateDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateDropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="segmento-buscador">
      <div className="boton-buscador">
        <div className="espaciado-centrado">
         
          <Divider orientation="vertical" flexItem />
         
        </div>
        <div className="icono-lupa-contenedor">
          <MdSearch className="icono-lupa" />
        </div>
      </div>
    </div>
  );
};

export default Buscador;
