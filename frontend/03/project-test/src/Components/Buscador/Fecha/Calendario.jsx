import React, { useState, useContext } from "react";
import { Box, TextField } from "@mui/material";
// import DateRangePicker from "@mui/lab/DateRangePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ContextGlobal } from "../../utils/global.context";

const Calendario = () => {
  const { fechasBusqueda, setFechasBusqueda } = useContext(ContextGlobal);

  console.log({ fechasBusqueda });
  console.log(fechasBusqueda[0]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box width={"500px"} textAlign="center">
            Calendario
          </Box>
          <DateRangePicker
            startText="Check inn"
            endText="Check out"
            value={fechasBusqueda}
            onChange={(newValue) => {
              setFechasBusqueda(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default Calendario;
