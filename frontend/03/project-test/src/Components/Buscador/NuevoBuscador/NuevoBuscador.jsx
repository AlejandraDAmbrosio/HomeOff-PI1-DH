import { Stack, Typography } from "@mui/material";
import {
  Autocomplete,
  TextField,
  Popover,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { ContextGlobal } from "../../utils/global.context";
import React, { useEffect, useState, useContext } from "react";
import Calendario from "../Fecha/Calendario";

const NuevoBuscador = () => {
  const { fechasBusqueda, productosBKLista } = useContext(ContextGlobal);

  const [idFilteredSedes, setIdFilteredSedes] = useState([]);
  const [filteredSedes, setFilteredSedes] = useState([]);
  const [idFilteredName, setIdFilteredName] = useState([]);
  const [filteredName, setfilteredName] = useState([]);
  const [prodFiltrados, setProdFiltrados] = useState([]);

  console.log("---------------------------- console.log(filteredProducts)");
  console.log(prodFiltrados);

  const [anchorEl, setAnchorEl] = useState(null);
  const isDateDropdownOpen = Boolean(anchorEl);

  const handleDateDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateDropdownClose = () => {
    setAnchorEl(null);
  };

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

  const handleSearch = (e) => {
    console.log("handleSearch llamado");

    console.log("filteredSedes:", filteredSedes); // Agrega esta línea
    console.log("idFilteredSedes:", idFilteredSedes);

    const searchText = e.target.value.toLowerCase();

    const filteredSedesSearch = sedesArray.filter((sede) =>
      sede.nombre.toLowerCase().includes(searchText)
    );

    setFilteredSedes(filteredSedesSearch);
    if (filteredSedesSearch.length === 1) {
      setIdFilteredSedes([filteredSedesSearch[0].id]);
    } else {
      setIdFilteredSedes([]);
    }

    const filteredProducts = productosBKLista.filter(
      (producto) =>
        idFilteredSedes.length === 0 ||
        idFilteredSedes.includes(producto.idSede)
    );

    setProdFiltrados(filteredProducts);

    console.log("---------------------------- console.log(filteredProducts)");
    console.log(filteredProducts);
  };

  return (
    <Stack direction="row" spacing={2} style={{ width: "500px" }}>
      <Stack>
        <Autocomplete
          id="buscarXNombre"
          options={sedesArray.map((sede) => sede.nombre)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Sedes"
              style={{
                background: "none",
                border: "none",
                outline: 0,
                height: "98%",
                fontSize: "24px",
                width: "200px",
                color: "#717171",
              }}
            />
          )}
          onKeyUp={handleSearch}
        />
      </Stack>

      <Stack direction="row" spacing={2} style={{ marginBottom: "2rem" }}>
        <Button
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
            <div>Fecha</div>
          )}
        </Button>
        <Popover
          open={isDateDropdownOpen}
          onClose={handleDateDropdownClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
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
      <Stack direction="row">
        <Autocomplete
          id="buscarXSede"
          options={productosBKLista.map((producto) => producto.nombre)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Nombre"
              style={{
                background: "none",
                border: "none",
                outline: 0,
                height: "98%",
                fontSize: "24px",
                width: "200px",
                color: "#717171",
              }}
            />
          )}
          onKeyUp={handleSearch}
        />
      </Stack>
    </Stack>
  );
};

export default NuevoBuscador;
