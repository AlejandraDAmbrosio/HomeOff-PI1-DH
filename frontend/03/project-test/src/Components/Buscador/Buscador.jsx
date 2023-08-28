import React, { useState } from "react";
import "./Buscador.css";
import { MdSearch } from "react-icons/md";
// import {
//   DateRangePicker,
// } from "@mui/x-date-pickers";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Buscador = () => {
  const [isDateDropdownOpen, setDateDropdownOpen] = useState(false);

  return (
    <div className="segmento-buscador">
      <div className="boton-buscador">
        <div className="espaciado-centrado">
          <div className="buscar-por">Localidad</div>
          <div className="separador">|</div>
          <div
            className="buscar-por"
            onClick={() => setDateDropdownOpen(!isDateDropdownOpen)}
          >
            Fecha
          </div>
          <div className="separador">|</div>
          <div className="buscar-por">Precio</div>
          <div className="separador">|</div>
        </div>
        <div className="icono-lupa-contenedor">
          <MdSearch className="icono-lupa" />
        </div>
      </div>
      {isDateDropdownOpen && (
        <div className="date-dropdown">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker"]}>
              {/* <DateRangePicker localeText={{ start: "Check-in", end: "Check-out" }} /> */}
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}
    </div>
  );
};

export default Buscador;