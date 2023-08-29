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
          <div className="buscar-por">Localidad</div>
          <Divider orientation="vertical" flexItem />
          <div className="buscar-por">
            <Button
              onClick={handleDateDropdownOpen}
              style={{ placeItems: "center", width: "100%" }}
            >
              {" "}
              {fechasBusqueda[0] && fechasBusqueda[1] ? (
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                >
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
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="buscar-por">Precio</div>
          {/* <div className="separador">|</div> */}
        </div>
        <div className="icono-lupa-contenedor">
          <MdSearch className="icono-lupa" />
        </div>
      </div>
    </div>
  );
};

export default Buscador;
