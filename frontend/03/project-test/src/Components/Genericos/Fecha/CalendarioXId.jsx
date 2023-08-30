import React, { useState, useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ContextGlobal } from "../../utils/global.context";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { borderBottom } from "@mui/system";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';


const renderDay = (day) => {
  const marcasDia = marcas[day.toDateString()];
  return marcasDia ? (
    <div style={{ backgroundColor: "lightgray" }}>{day}</div>
  ) : (
    day
  );
};

const CalendarioXId = () => {
  const { fechasBusqueda, setFechasBusqueda } = useContext(ContextGlobal);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15, 30]);

  console.log({ fechasBusqueda });
  console.log(fechasBusqueda[0]);

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const inicioFechas = () => {
    if (fechaInicio == null) {
      setFechaInicio(dayjs());
    }
  };

  inicioFechas();
  console.log(
    "----------------------------- Fechas asignadas en Date Picker -------------------------------------"
  );

  const marcas = [
    "2023-09-05" -
      "2023-09-06" -
      "2023-09-07" -
      "2023-10-15 - 2023-10-25" -
      ["2023-11-01" - "2023-11-02"],
  ];

  console.log(fechaInicio);

  // const diasDeshabilitados = highlightedDays.map((dayIndex) =>
  //   dayjs().add(dayIndex, "days").toDate()
  // );


  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        vertical='bottom'
        horizontal='center'
        badgeContent={isSelected ? "X" : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          disabled= {isSelected &&( true)}
          disableNavigation={true}
          style={{
            textDecorationLine: isSelected ? "1px solid red" : undefined,
            // color: isSelected ? "red" : undefined,
          }}
        />
      </Badge>
    );
  }

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <div style={{ width: "315px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            
            <StaticDatePicker
              label="Inicio"
              value={fechaInicio}
              onChange={(newValue) => setFechaInicio(newValue)}
              showDaysOutsideCurrentMonth={false}
              minDate={dayjs()}
              maxDate={dayjs().add(60, "days")}
              disableNavigation={true}
               disablePast={true}
              format="DD-MM-YY"
              slotProps={{
                textField: { size: "small" },
                day: {
                  highlightedDays,
                },
              }}
              slots={{
                day: ServerDay,
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div style={{ width: "315px" }}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          style={{ height: "20px" }}
        >
          <DemoContainer components={["DatePicker"]} style={{ height: "20px" }}>
            <StaticDatePicker 
              label="Fin"
              value={fechaInicio}
              onChange={(newValue) => setFechaFin(newValue)}
              showDaysOutsideCurrentMonth={false}
              minDate={dayjs()}
              maxDate={dayjs().add(60, "days")}
              disableNavigation={true}
              format="DD-MM-YY"
              disablePast={true}
              slotProps={{ textField: { size: "small" } }}
              slots={{
                day: ServerDay,
              }}
              s
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </Stack>
  );
};

export default CalendarioXId;

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
