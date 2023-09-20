import React, { useState, useMemo, useCallback, useContext } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { useEffect } from "react";
import { ContextGlobal } from "../../utils/global.context";
import obtenerFechasDeshabilitadas from "../../utils/obtenerFechasDeshabilitadas ";
import { Button, Divider, Stack, Typography, Paper } from "@mui/material";
import formateoFechas from "../../utils/formateoFechas";
// function tileDisabled({ date, view }) {
//   // Disable tiles in month view only
//   if (view === "month") {
//     // Check if a date React-Calendar wants to check is on the list of disabled dates
//     return fechasDeshabilitadas.includes(date.toLocaleDateString());
//   }
// }
import obtenerPrecioXIdRecurso from "../../utils/obtenerPrecioXIdRecurso";

const CalendarioPrueba = ({ id, precio, capacidad }) => {
  const [value, setValue] = useState(new Date());
  const [estadoFechas, setEstadoFechas] = useState([]);
  const [textoDia, setTextoDia] = useState(false);
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
    productosBKLista,
  } = useContext(ContextGlobal);

  if (id != undefined) {
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
    getArrayFechasReservasXRecurso(id);
  }, []);

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
    setTextoDia(true);
    setFechaInicio(inicio);
    setFechaFin(fin);
    // Aquí puedes ver las fechas seleccionadas en el array `arrayFechas`.
  }, [value]);
  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <Stack style={{ borderRadius: "20px" }} spacing={2}>
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
            tileDisabled={tileDisabled}
            next2Label=""
            prev2Label=""
          />
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{ margin: "auto", width: "370px" }}
        >
          <Stack sx={{ height: "90%" }}>
            {textoDia ? (
              <Stack >
                <Stack
                  flexDirection={{
                    xs: "column",
                    sm: "row",
                    md: "row",
                    lg: "row",
                  }}
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    padding: "0.8rem 0.5rem",
                    alignItems: "center",
                    width: "370px",
                    border: "1px solid #b6b5b5",
                    boxShadow:"3px 3px 3px #b6b5b5"
                  }}
                >
                  <Stack>
                    {new Date(value[0]).toDateString() !== "Invalid Date" ? (
                      <Typography>
                        Check-in :{" "}
                        {formateoFechas(new Date(value[0]).toDateString())}
                      </Typography>
                    ) : (
                      <Typography> Fecha de inicio</Typography>
                    )}
                  </Stack>

                  <Stack>
                    {new Date(value[0]).toDateString() !== "Invalid Date" ? (
                      <Typography>
                        Check-out :{" "}
                        {formateoFechas(new Date(value[1]).toDateString())}
                      </Typography>
                    ) : (
                      <Typography> Fecha de fin</Typography>
                    )}
                  </Stack>
                </Stack>
                <Stack
                  style={{ margin: "0.5rem 0rem 0.5rem 0rem" }}
                  sx={{ textAlign: "center", color: "#424242" }}
                >
                  {textoDia ? (
                    cantidadDias > 1 ? (
                      <Typography>Tiempo: {cantidadDias} días</Typography>
                    ) : (
                      <Typography>Tiempo: {cantidadDias} día</Typography>
                    )
                  ) : null}
                </Stack>
              </Stack>
            ) : null}

            <Stack
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "370px",
                maxWidth: "370px",
                justifyContent: "center",
                borderRadius: "28px 28px 28px 28px",
                boxShadow:"3px 3px 3px #b6b5b5"

              }}
            >
              <Stack
                direction={"row"}
                spacing={1}
                style={{
                  padding: "0.2rem 1rem",
                  alignItems: "center",
                  lineHeight: "15px",
                  border: "1px solid #dfdfdf",
                  borderRadius: "28px 28px 0px 0px",
                  width: "370px",
                  // c
                }}
              >
                <Typography
                  style={{
                    fontSize: "1.8rem",
                    color: "#424242",
                    fontWeight: "600",
                  }}
                >
                  ${precio}
                </Typography>
                <Typography> /por día</Typography>
              </Stack>

              <Stack
                direction={"row"}
                sx={{
                  padding: "0.2rem 1rem",
                  border: "1px solid #dfdfdf",
                  borderRadius: "0px 0px 0px 0px",
                  width: "370px",
                }}
              >
                {/* <Typography>Precio total</Typography> */}
                <Typography style={{ fontSize: "1.6rem", color: "#424242" }}>
                  Precio total ${precio * cantidadDias}
                </Typography>{" "}
              </Stack>
              <Stack
                sx={{
                  padding: "0.2rem 1rem",
                  border: "1px solid #dfdfdf",
                  borderRadius: "0px 0px 28px 28px",
                  width: "370px",
                }}
              >
                {cantidadDias > 1 ? (
                  <Typography style={{ fontSize: "0.8rem", color: "#979797" }}>
                    Capacidad maxima{capacidad} personas
                  </Typography>
                ) : (
                  <Typography style={{ fontSize: "0.8rem", color: "#979797" }}>
                    Capacidad {capacidad} persona
                  </Typography>
                )}
                <Stack direction={"row"} spacing={1}>
                  {/* <Typography>Precio total</Typography> */}
                  <Typography style={{ fontSize: "0.8rem", color: "#979797" }}>
                    Precio por dia por persona ${precio / capacidad}
                  </Typography>{" "}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* </Stack> */}
          <Button
            sx={{
              width: "100%",
              color: "white",
              backgroundColor: "#b6b5b5",
              ":hover": {
                backgroundColor: "#3c9960",
              },
            }}
            onClick={onSaveDates}
          >
            Consultar Fechas
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default CalendarioPrueba;
