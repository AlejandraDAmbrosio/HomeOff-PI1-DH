import React, { useState, useMemo, useCallback, useContext } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { useEffect } from "react";
import { ContextGlobal } from "../../utils/global.context";

const fechasDeshabilitadas = [
  "30/10/2023",
  "31/10/2023",
  "1/11/2023",
  "2/11/2023",
  "30/10/2023",
  "31/10/2023",
  "1/11/2023",
  "2/11/2023",
];

function tileDisabled({ date, view }) {
  // Disable tiles in month view only
  if (view === "month") {
    // Check if a date React-Calendar wants to check is on the list of disabled dates
    return fechasDeshabilitadas.includes(date.toLocaleDateString());
  }
}

const CalendarioPrueba = () => {
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
  } = useContext(ContextGlobal);

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
        tileDisabled={tileDisabled}
      />
      <button
        style={{
          padding: "0.5rem 1.5rem",
          backgroundColor: "black",
          color: "white",
        }}
        onClick={onSaveDates}
      >
        Guardar
      </button>
      {new Date(value[0]).toDateString() !== "Invalid Date" && (
        <p>Fechas inicio {new Date(value[0]).toDateString()}</p>
      )}
      {new Date(value[0]).toDateString() !== "Invalid Date" && (
        <p>Fechas fin {new Date(value[1]).toDateString()}</p>
      )}
    </div>
  );
};
export default CalendarioPrueba;

// import React, { useState, useMemo, useCallback } from "react";
// import Calendar from "react-calendar";
// import "./Calendar.css";

// const CalendarioReactCalendar = () => {
//   const [value, onChange] = useState(new Date());
//   const [estadoFechas, setEstadoFechas] = useState([]);
//   const arrayFechas = [];

//   const onSaveDates = useCallback(() => {
//     // const initialDateDay = new Date(value[0]).getDate();
//     // const endDateDay = new Date(value[1]).getDate();
//     const initialDateDay = new Date(value[0]);
//     const endDateDay = new Date(value[1]);

//     // if the user selects only one day
//     if (initialDateDay.toLocaleString() === endDateDay.toLocaleString()) {
//       const fechaUnica =
//         new Date(value[0]).toDateString() === "Invalid Date"
//           ? new Date(value).toLocaleDateString()
//           : new Date(value[0]).toLocaleDateString();

//       arrayFechas.push(fechaUnica);
//       arrayFechas.push(fechaUnica);
//       setEstadoFechas(arrayFechas);
//     } else {
//       // if the user selects a range of days
//       const date_1 = new Date(value[0]);
//       const date_2 = new Date(value[1]);

//       // formula of total days selected for the range
//       const totalDays = (date_1, date_2) => {
//         const difference = date_1.getTime() - date_2.getTime();
//         const days = Math.ceil((difference / (1000 * 3600 * 24)) * -1);
//         return days;
//       };

//       // total days selected to loop and save in the database
//       const td = totalDays(date_1, date_2);

//       for (let i = 0; i < td; i++) {
//         const date = new Date(value[0]);
//         date.setDate(date.getDate() + i);
//         arrayFechas.push(date.toLocaleDateString());
//       }
//     }

//     if (initialDateDay.toLocaleString() === endDateDay && value.length === 0) {
//       alert("Debe seleccionar al menos un registro");
//       return;
//     }
//     setEstadoFechas(arrayFechas);
//     console.log(estadoFechas);
//     console.log(initialDateDay);
//     console.log(endDateDay);
//     // Aquí puedes ver las fechas seleccionadas en el array `arrayFechas`.
//   }, [value]);
//   return (
//     <div>
//       <Calendar
//         calendarType="gregory"
//         returnValue="range"
//         showDoubleView={true}
//         selectRange={true}
//         onChange={onChange}
//         value={value}
//         style={{ backgroundColor: "red" }}
//       />
//       <button
//         style={{
//           padding: "0.5rem 1.5rem",
//           backgroundColor: "black",
//           color: "white",
//         }}
//         onClick={onSaveDates}
//       >
//         Guardar
//       </button>
//       {new Date(value[0]).toDateString() !== "Invalid Date" && (
//         <p>Fechas inicio {new Date(value[0]).toDateString()}</p>
//       )}
//       {new Date(value[0]).toDateString() !== "Invalid Date" && (
//         <p>Fechas inicio {new Date(value[1]).toDateString()}</p>
//       )}
//     </div>
//   );
// };

// export default CalendarioReactCalendar;
