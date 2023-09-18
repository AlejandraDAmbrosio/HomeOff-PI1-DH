import React, { useState, useMemo, useCallback, useContext } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { useEffect } from "react";
import { ContextGlobal } from "../../utils/global.context";
import obtenerFechasDeshabilitadas from "../../utils/obtenerFechasDeshabilitadas ";
import { Button, Divider, Stack, Typography } from "@mui/material";

// function tileDisabled({ date, view }) {
//   // Disable tiles in month view only
//   if (view === "month") {
//     // Check if a date React-Calendar wants to check is on the list of disabled dates
//     return fechasDeshabilitadas.includes(date.toLocaleDateString());
//   }
// }

const CalendarioBuscador = ({ id }) => {
  const [value, setValue] = useState(new Date());
  const [estadoFechas, setEstadoFechas] = useState([]);
  //   const [fechaInicio, setFechaInicio] = useState(new Date());
  //   const [fechaFin, setFechaFin] = useState(new Date());
  const arrayFechas = [];
  const {
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    cantidadDias,
    setCantidadDias,
    arrayFechasReservasXRecurso,
    getArrayFechasReservasXRecurso,
  } = useContext(ContextGlobal);

  if (id !== undefined) {
    getArrayFechasReservasXRecurso(id);
  }

  const fechasDeshabilitadas = obtenerFechasDeshabilitadas(
    arrayFechasReservasXRecurso
  );

  function tileDisabled({ date, view }) {
    // Disable tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      return fechasDeshabilitadas.some(
        (deshabilitada) =>
          date.toLocaleDateString() === deshabilitada.toLocaleDateString()
      );
    }
  }

  useEffect(() => {
    console.log("USEEFFECT ---> ", value);
    const inicio =
      new Date(value[0]).toDateString() !== "Invalid Date"
        ? new Date(value[0]).toDateString()
        : new Date(value).toLocaleDateString();
    const fin =
      new Date(value[1]).toDateString() !== "Invalid Date"
        ? new Date(value[1]).toDateString()
        : new Date(value).toLocaleDateString();
    console.log("USEEFFECT  inicio---> ", inicio);
    console.log("USEEFFECT  fin---> ", fin);
    setFechaInicio(inicio);
    setFechaFin(fin);
  }, [value]);

  const handleDateChange = (date) => {
    setValue(date);
  };

  const onSaveDates = useCallback(() => {
    // const inicio =
    //   new Date(value[0]).toDateString() !== "Invalid Date"
    //     ? new Date(value[0]).toDateString()
    //     : new Date(value).toLocaleDateString();
    const inicio =
      new Date(value[0]).toDateString() !== "Invalid Date"
        ? new Date(value[0])
        : new Date(value);
    const fin =
      new Date(value[1]).toDateString() !== "Invalid Date"
        ? new Date(value[1])
        : new Date(value);
    // const fin =
    //   new Date(value[1]).toDateString() !== "Invalid Date"
    //     ? new Date(value[1]).toDateString()
    //     : new Date(value).toLocaleDateString();

    if (inicio.toLocaleString() === fin.toLocaleString()) {
      const fechaUnica =
        new Date(value[0]).toDateString() === "Invalid Date"
          ? new Date(value).toLocaleDateString()
          : new Date(value[0]).toLocaleDateString();

      arrayFechas.push(fechaUnica);
      arrayFechas.push(fechaUnica);
    } else {
      // if the user selects a range of days
      const date_1 = new Date(value[0]);
      const date_2 = new Date(value[1]);

      // formula of total days selected for the range
      const totalDays = (date_1, date_2) => {
        const difference = date_1.getTime() - date_2.getTime();
        const days = Math.ceil((difference / (1000 * 3600 * 24)) * -1);
        setCantidadDias(days);
        // console.log("CantidadDias", cantidadDias)
        return days;
      };

      // total days selected to loop and save in the database
      const td = totalDays(date_1, date_2);

      for (let i = 0; i < td; i++) {
        const date = new Date(value[0]);
        date.setDate(date.getDate() + i);
        arrayFechas.push(date.toLocaleDateString());
      }
    }
    console.log(arrayFechas);
    console.log("Fechas INICIO guardada en onSaveDates", inicio);
    console.log("Fechas FIN guardada en onSaveDates", fin);
    setFechaInicio(inicio);
    setFechaFin(fin);
    // Aquí puedes ver las fechas seleccionadas en el array `arrayFechas`.
  }, [value]);
  return (
    <div>
      <Calendar
        calendarType="gregory"
        returnValue="range"
        showDoubleView={true}
        selectRange={true}
        // onChange={(date) => setValue(date)}
        // onChange={setValue}
        onChange={handleDateChange}
        value={value}
        onClickDay={handleDateChange}
        style={{ backgroundColor: "red" }}
        // tileDisabled={tileDisabled}
      />
      <Stack>
        <Button
          sx={{
            width: "100%",
            color: "white",
            backgroundColor: "#7cc598",
            ":hover": {
              backgroundColor: "#3c9960",
            },
          }}
          onClick={onSaveDates}
        >
          Buscar
        </Button>
        {/* <Stack
          flexDirection={{ lg: "row" }}
          style={{justifyContent:"space-around", alignItems:"center"}}>
          <Typography>
            {" "}
            {new Date(value[0]).toDateString() !== "Invalid Date" && (
              <p>Inicio de reserva:  {new Date(value[0]).toDateString()}</p>
            )}
          </Typography>
          <Divider></Divider>
          <Typography>
            {new Date(value[0]).toDateString() !== "Invalid Date" && (
              <p>Fin de reserva: {new Date(value[1]).toDateString()}</p>
            )}
          </Typography>
        </Stack> */}
      </Stack>
    </div>
  );
};
export default CalendarioBuscador;

