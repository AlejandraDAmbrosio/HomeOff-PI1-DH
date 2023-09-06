import React, { useState, useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ContextGlobal } from "../../utils/global.context";
import { TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { borderBottom } from "@mui/system";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { red } from "@mui/material/colors";

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

  // console.log({ fechasBusqueda });
  // console.log(fechasBusqueda[0]);

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const inicioFechas = () => {
    if (fechaInicio == null) {
      setFechaInicio(dayjs());
    }
  };

  inicioFechas();
  // console.log(
  //   "----------------------------- Fechas asignadas en Date Picker -------------------------------------"
  // );

  const marcas = [
    "2023-09-05",
    "2023-09-06",
    "2023-09-07",
    "2023-10-15",
    "2023-10-16",
    "2023-10-17",
    "2023-10-18",
    "2023-10-19",
    "2023-10-20",
    "2023-10-21",
    "2023-10-22",
    "2023-10-23",
    "2023-10-24",
    "2023-10-25",
    "2023-11-01",
    "2023-11-02",
  ];

  // console.log(fechaInicio);

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    function isPastDay() {
      return day.isBefore(dayjs(), "day"); // Compara si el día es anterior al día actual
    }

    return (
      <Badge
        key={props.day.toString()}
        vertical="bottom"
        horizontal="left"
        aria-label="reduce"
        color="error"
        badgeContent={isSelected ? "" : undefined}
        variant={isSelected ? "dot" : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          disabled={isPastDay() || (isSelected && true)}
          disableNavigation={true}
          style={{
            textDecorationLine: isSelected ? "1px solid red" : undefined,
          }}
        />
      </Badge>
    );
  }

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
      margin={"auto"}
      
    >
      <Divider style={{ margin: "1rem 0rem 1rem 0rem" }} flexItem />

      <Typography variant="h4">Fechas disponibles</Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        useFlexGap flexWrap="wrap"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DateCalendar
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

        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          style={{ height: "20px" }}
        >
          <DemoContainer components={["DatePicker"]} style={{ height: "20px" }}>
            <DateCalendar
              label="Fin"
              value={fechaInicio}
              onChange={(newValue) => setFechaFin(newValue)}
              showDaysOutsideCurrentMonth={false}
              minDate={dayjs()}
              maxDate={dayjs().add(60, "days")}
              disableNavigation={true}
              format="DD-MM-YY"
              disablePast={true}
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
      </Stack>
      <Divider style={{ margin: "2rem 0rem 2rem 0rem" }} flexItem />
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
