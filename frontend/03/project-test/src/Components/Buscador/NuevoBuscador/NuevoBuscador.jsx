import {
  Autocomplete,
  TextField,
  Popover,
  Button,
  Divider,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { ContextGlobal } from "../../utils/global.context";
import React, { useEffect, useState, useContext } from "react";
import Calendario from "../Fecha/Calendario";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BuscarXSede from "../Sede/BuscarXSede";

const NuevoBuscador = () => {
  const { fechasBusqueda, productosBKLista } = useContext(ContextGlobal);
  ////////// Segmento visual Calendario ///////////////
  const [anchorEl, setAnchorEl] = useState(null);
  const isDateDropdownOpen = Boolean(anchorEl);

  const handleDateDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateDropdownClose = () => {
    setAnchorEl(null);
  };
  /////////////////////////////////////////////////////////

  const [idFilteredSedes, setIdFilteredSedes] = useState([]);
  const [filteredSedes, setFilteredSedes] = useState([]);
  const [idFilteredName, setIdFilteredName] = useState([]);
  const [filteredName, setfilteredName] = useState([]);
  const [prodFiltrados, setProdFiltrados] = useState([]);

  const sedesArray = [
    {
      id: 1,
      nombre: "Colombia",
      direccion: "CARRERA 100 # 15",
    },
    {
      id: 2,
      nombre: "Argentina",
      direccion: "Calle 1 y 60 La Plata",
    },
    {
      id: 3,
      nombre: "Chile",
      direccion: "Av. Libertador Bernardo O'Higgins 1449, Torre",
    },
  ];
  ///////////// Filtrado

  const shouldFilterProducts = prodFiltrados.length > 0;

  /////////////////////////

  const handleSearchNombre = (e) => {};

  const handleSearchSede = (e) => {};
  ///////////////////////////

  return (
    <Stack
      direction="row"
      spacing={2}
      style={{
        width: "400px",
        border: "1px solid grey",
        alignContent: "center",
        justifyContent: "space-between",
        height: "42px",
        padding: "0 5px 0 10px",
        borderRadius: "20px",
        borderColor:"white",
        color:"white",
      }}
    >
      <Stack>
        <BuscarXSede></BuscarXSede>
      </Stack>
      {/* <datalist id="buscarXSede">
        <option value="Colombia"></option>
        <option value="Argentina"></option>
        <option value="Chile"></option>
      </datalist> */}

      <Stack direction="row" spacing={2} style={{ marginBottom: "2rem" }}>
        <div
          onClick={handleDateDropdownOpen}
          style={{ placeItems: "center", width: "100%" }}
        >
          {" "}
          {fechasBusqueda[0] && fechasBusqueda[1] ? (
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              <div>
                {fechasBusqueda[0].$d.toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                })}{" "}
              </div>
              <Divider orientation="vertical" flexItem />
              <div>
                {fechasBusqueda[1].$d.toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                })}{" "}
              </div>
            </div>
          ) : (
            <CalendarMonthIcon style={{ fontSize: "40px" }} />
          )}
        </div>
        <Popover
          open={isDateDropdownOpen}
          onClose={handleDateDropdownClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box p={2}>
            <Calendario
              value={fechasBusqueda}
              onChange={(newValue) => {
                if (Array.isArray(newValue) && newValue.length === 2) {
                  setFechasBusqueda(newValue.map((date) => date || null));
                } else {
                  setFechasBusqueda([null, null]);
                }
              }}
            />
          </Box>
        </Popover>
      </Stack>
    </Stack>
  );
};

export default NuevoBuscador;
