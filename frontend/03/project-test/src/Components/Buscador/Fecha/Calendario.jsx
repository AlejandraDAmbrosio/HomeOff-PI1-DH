import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
// import DateRangePicker from "@mui/lab/DateRangePicker";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Calendario = () => {
  const [value, setValue] = useState([null, null]);
  console.log({ value });

  return (
    <div>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box width={'500px'} textAlign="center">
          Calendario
        </Box>
        <DateRangePicker
          startText='Check inn'
          endText='Check out'
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
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