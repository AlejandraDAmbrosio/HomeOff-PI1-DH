import React, { useState, useContext } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ContextGlobal } from "../../utils/global.context";

const Calendario = () => {
  const { fechasBusqueda, setFechasBusqueda } = useContext(ContextGlobal);
 

  console.log({ fechasBusqueda });
  console.log(fechasBusqueda[0]);

  const [fechaInicio, setFechaInicio] = useState(null)
  const [fechaFin, setFechaFin] = useState(null)
  console.log("----------------------------- Fechas asignadas en Date Picker -------------------------------------");

  

  console.log(fechaInicio)

  return (
    <div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Inicio"
              value={fechaInicio}
              onChange={(newValue) => setFechaInicio(newValue)}
              showDaysOutsideCurrentMonth={false}
              minDate={dayjs()}
              maxDate={dayjs().add(60, 'days')}
              disableNavigation={true}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Fin" 
            value={fechaInicio}
            onChange={(newValue) => setFechaFin(newValue)}
            showDaysOutsideCurrentMonth={false}
              minDate={dayjs()}
              maxDate={dayjs().add(60, 'days')}
              disableNavigation={true}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Calendario;

// import React, { useState, useContext } from "react";
// import { Box, TextField } from "@mui/material";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { ContextGlobal } from "../../utils/global.context";

// const Calendario = () => {
//   const { fechasBusqueda, setFechasBusqueda } = useContext(ContextGlobal);

//   console.log({ fechasBusqueda });
//   console.log(fechasBusqueda[0]);

//   return (
//     <div>
//       <LocalizationProvider dateAdapter={AdapterDayjs} >
//         <Box display="flex" flexDirection="column" alignItems="center" >
//           <Box style={{with:"300px"}} textAlign="center">
//           </Box>
//           <DateRangePicker
//             startText="Ingreso"
//             endText="Egreso"
//             value={fechasBusqueda}
//             onChange={(newValue) => {
//               setFechasBusqueda(newValue);
//             }}
//             renderInput={({ startInputProps, endInputProps }) => (
//               <>
//                 <TextField {...startInputProps}  />
//                 <Box sx={{ mx: 2 }}> to </Box>
//                 <TextField {...endInputProps} />
//               </>
//             )}
//           />
//         </Box>
//       </LocalizationProvider>
//     </div>
//   );
// };

// export default Calendario;
