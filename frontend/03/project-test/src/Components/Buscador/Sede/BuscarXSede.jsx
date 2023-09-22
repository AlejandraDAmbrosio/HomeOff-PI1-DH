import { ContextGlobal } from "../../utils/global.context";
import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
// import { Divider, Popover, Stack } from "@mui/material";
import "../Fecha/Calendar.css";
import Calendar from "react-calendar";
import {
  Divider,
  Popover,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Autocomplete,
  TextField,
  
} from "@mui/material";

import "./BuscarXSede.css";
// import CalendarioBuscador from "../Fecha/CalendarioBuscador";
import formatearFecha from "../../utils/formatearFecha";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const BuscarXSede = () => {
  const {
    productosBKLista,
    idFilteredSedes,
    setIdFilteredSedes,
    filteredSedes,
    filteredName,
    setFilteredSedes,
    prodFiltrados,
    setProdFiltrados,
    busquedaCero,
    setBusquedaCero,
    fechasBusqueda,
    fechaInicioBusqueda,
    setFechaInicioBusqueda,
    fechaFinBusqueda,
    setFechaFinBusqueda,
    cantidadDiasBusqueda,
    setCantidadDiasBusqueda,
    resultadoBusqueda, setResultadoBusqueda
  } = useContext(ContextGlobal);
  /////////////////////////////States para Buscar por fecha
  const [value, setValue] = useState(new Date());
  const [estadoFechas, setEstadoFechas] = useState([]);
  const arrayFechas = [];
  //////////////////////////////////////////////////////////
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  ////////// Segmento visual Calendario ///////////////
  const [anchorEl, setAnchorEl] = useState(null);
  const isDateDropdownOpen = Boolean(anchorEl);

  const handleDateDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateDropdownClose = () => {
    setAnchorEl(null);
  };

  const sedesArray = [
    {
      id: 1,
      nombre: "Colombia",
      direccion: "CARRERA 100 # 15",
    },
    {
      id: 2,
      nombre: "Argentina",
      direccion: "Calle 1 y 60 La Plata",
    },
    {
      id: 3,
      nombre: "Chile",
      direccion: "Av. Libertador Bernardo O'Higgins 1449, Torre",
    },
  ];

  const combineNames = () => {
    const sedeNames = sedesArray.map((sede) => sede.nombre.toLowerCase());
    const productoNames = productosBKLista.map((producto) =>
      producto.nombre.toLowerCase()
    );
    return [...sedeNames, ...productoNames];
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (filteredSedes.length === 1) {
        e.target.value = filteredSedes[0].nombre;
      }
    }

    const searchText = e.target.value.toLowerCase();
    const combinedNames = combineNames();

    const filtered = combinedNames.filter((name) => name.includes(searchText));

    const filteredSedesAndProductos = [];
    const seenIds = new Set();

    filtered.forEach((name) => {
      const sedeFiltrada = sedesArray.filter((sede) =>
        sede.nombre.toLowerCase().includes(searchText.toLowerCase())
      );

      const sedeXID = sedeFiltrada.map((sede) => sede.id);

      const producto = productosBKLista.find(
        (producto) => producto.nombre.toLowerCase() === name
      );

      if (sedeXID) {
        const productosFiltradosPorSede = productosBKLista.filter((producto) =>
          sedeXID.includes(producto.idSede)
        );

        productosFiltradosPorSede.forEach((producto) => {
          if (!seenIds.has(producto.idRecurso)) {
            seenIds.add(producto.idRecurso);
            filteredSedesAndProductos.push(producto);
          }
        });
      }

      if (producto) {
        if (!seenIds.has(producto.idRecurso)) {
          seenIds.add(producto.idRecurso);
          filteredSedesAndProductos.push(producto);
        }
      }
    });

    setFilteredSedes(filteredSedesAndProductos);

    const filteredIds = filteredSedesAndProductos.map((item) => item.id);
    setIdFilteredSedes(filteredIds);

    setProdFiltrados(filteredSedesAndProductos);

    if (filteredSedesAndProductos.length === 0) {
      //  setOpenModal(true);
      setBusquedaCero(true);

    }

    if (inputValue.length === 0) {
      setProdFiltrados([]);
      setBusquedaCero(false);
      
    }
  };

  const handleDateChange = (date) => {
    setValue(date);
  };

  ///////////////////////////////////////////////////////////
  const handleSearchButtonClick = async () => {
 
    setBusquedaCero(false);
    // Llama a onSaveDates primero
    onSaveDates();

    // Llama a hendleSearchFechas después de onSaveDates
    handleSearchFechas();
  };

  //////////////////////////////

  const onSaveDates = useCallback(() => {
    const inicio =
      new Date(value[0]).toDateString() !== "Invalid Date"
        ? new Date(value[0])
        : new Date(value);
    const fin =
      new Date(value[1]).toDateString() !== "Invalid Date"
        ? new Date(value[1])
        : new Date(value);

    if (inicio.toLocaleString() === fin.toLocaleString()) {
      const fechaUnica =
        new Date(value[0]).toDateString() === "Invalid Date"
          ? new Date(value).toLocaleDateString()
          : new Date(value[0]).toLocaleDateString();
    } else {
      // if the user selects a range of days
      const date_1 = new Date(value[0]);
      const date_2 = new Date(value[1]);

      // formula of total days selected for the range
      const totalDays = (date_1, date_2) => {
        const difference = date_1.getTime() - date_2.getTime();
        const days = Math.ceil((difference / (1000 * 3600 * 24)) * -1);
        setCantidadDiasBusqueda(days);
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

    const inicioFormateado = formatearFecha(inicio);
    const finFormateado = formatearFecha(fin);

    console.log("inicioFormateado", inicioFormateado);
    console.log("finFormateado", finFormateado);

    setFechaInicioBusqueda(inicioFormateado);
    setFechaFinBusqueda(finFormateado);
    // Aquí puedes ver las fechas seleccionadas en el array `arrayFechas`.
  }, [value]);
  ////////////////////////////////////////////

  let estaDisponible = true;
  const getFechasHabilitadasXIDRecurso = async (id) => {
    try {
      const response = await axios.get(
        `http://52.32.210.155:8080/auth/recurso/${id}/estadoFechas?fechaInicialBusqueda=${fechaInicioBusqueda}&fechaFinalBusqueda=${fechaFinBusqueda}`
      );
      const data = response.data;
      // Realiza acciones con los datos obtenidos
      console.log(`Datos para recurso ${id}:`, data);

      for (const fecha in data.estadoPorFechas) {
        // Accede al valor "DISPONIBLE"
        if (data.estadoPorFechas[fecha] !== "DISPONIBLE") {
          // console.log(`Fecha: ${fecha}, Estado: DISPONIBLE`);
          estaDisponible = false;
          setResultadoBusqueda(False)
          break;
        } else {
          setResultadoBusqueda(true)
          estaDisponible = true;
        }
      }
      if(resultadoBusqueda == False){
        setProdFiltrados([]);
      }
      console.log(` el producto ${id}  estaDiponible? ${estaDisponible}`);
    } catch (error) {
      // Maneja los errores adecuadamente
      console.error("Error al obtener datos:", error);
    }
  };

  let filteredProducts = [];
  const handleSearchFechas = async () => {
    if (prodFiltrados.length > 0) {
      // console.log("prodFiltrados", prodFiltrados);
      // Si hay productos filtrados, enviar solicitudes para cada idRecurso//// OK
      // Si no tienes productos filtrados, realiza la búsqueda y filtro aquí

      prodFiltrados.map(async (producto) => {
        // Realiza la llamada a getFechasHabilitadasXIDRecurso para cada producto
        await getFechasHabilitadasXIDRecurso(producto.idRecurso);

        // Verifica si el producto está disponible
        if (estaDisponible) {
          // Puedes agregar cualquier otra lógica de filtro aquí si es necesario
          console.log("estaDisponible", producto);
          filteredProducts.push(producto);
          setResultadoBusqueda(true);
          return producto;
        } else {
          setResultadoBusqueda(false);
            setProdFiltrados([]);
          return null; // No agregues el producto si no está disponible
        }
      });

      // Filtra los productos no nulos (es decir, disponibles)
      filteredProducts = filteredProducts.filter(
        (producto) => producto !== null
      );

      if (filteredProducts.length == 0) {
        setProdFiltrados([]);
        setBusquedaCero(false);
        setResultadoBusqueda(false);
      }

      console.log("filteredProducts", filteredProducts);
      setProdFiltrados(filteredProducts);

      // Realiza acciones con los productos filtrados
      console.log(
        "Productos filtrados por fechas  if (prodFiltrados.length > 0):",
        filteredProducts
      );
    } else {
      // Si no tienes productos filtrados, realiza la búsqueda y filtro aquí
      filteredProducts = await Promise.all(
        productosBKLista.map(async (producto) => {
          // Realiza la llamada a getFechasHabilitadasXIDRecurso para cada producto
          await getFechasHabilitadasXIDRecurso(producto.idRecurso);

          // Verifica si el producto está disponible
          if (estaDisponible) {
          
            return producto;
          } else {
            setResultadoBusqueda(false);

            return null;
          }
        })
      );

      // Filtra los productos no nulos (es decir, disponibles)
      filteredProducts = filteredProducts.filter(
        (producto) => producto !== null
      );

      setProdFiltrados(filteredProducts);
      if((filteredProducts == 0 )|| (filteredProducts == []) ||(filteredProducts == undefined)){
        setResultadoBusqueda(false);
      }
      // Realiza acciones con los productos filtrados
      console.log(
        "Productos filtrados por fechas   } else {:",
        filteredProducts
      );
      console.log("prodFiltrados.length", prodFiltrados.length);
    }
    console.log(prodFiltrados);
    console.log("prodFiltrados.length", prodFiltrados.length);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      style={{
        width: "400px",
        border: "1px solid grey",
        alignContent: "center",
        justifyContent: "space-between",
        height: "42px",
        padding: "0 5px 0 10px",
        borderRadius: "20px",
        borderColor: "white",
        color: "white",
      }}
    >
      <Stack>
        <div className="input-container">
          <input
            className="busqueda"
            id="buscarXSede"
            list="paises"
            type="text"
            placeholder="Sede o nombre"
            onKeyUp={handleSearch}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setBusquedaCero(false);
            }}
            options={filteredSedes.map((sede) => sede.nombre)}
            sx={{ color: "white" }}
          ></input>

          <datalist id="paises">
            {combineNames().map((valores, index) => (
              <option key={index} value={valores}></option>
            ))}
          </datalist>

          <Dialog
            open={openModal}
            onClose={() => {
              setOpenModal(false);
              setInputValue(""); // Establecer el valor del input en blanco
            }}
            onKeyDown={(e) => {
              setOpenModal(false);
            }}
          >
            <DialogTitle>
              No se encontraron productos asociados a su búsqueda
            </DialogTitle>
            <DialogContent></DialogContent>
            <Button variant="contained" onClick={() => setOpenModal(false)}>
              Cerrar
            </Button>
          </Dialog>
        </div>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        style={{ marginBottom: "1rem" /*, height:"40px"*/ }}
      >
        <div onClick={handleDateDropdownOpen}>
          {fechasBusqueda[0] && fechasBusqueda[1] ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
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
            <CalendarMonthIcon style={{ fontSize: "38px" }} />
          )}
        </div>

        <Popover
          sx={{
            borderRadius: "20px",
            style: {
              overflowY: "auto",
            },
          }}
          open={isDateDropdownOpen}
          onClose={handleDateDropdownClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {/* <CalendarioBuscador></CalendarioBuscador> */}
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
                onClick={handleSearchButtonClick}
              >
                Buscar
              </Button>
              <Stack
                flexDirection={{ lg: "row" }}
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <Typography>
                  {" "}
                  {new Date(value[0]).toDateString() !== "Invalid Date" && (
                    <p>
                      Inicio de reserva: {new Date(value[0]).toDateString()}
                    </p>
                  )}
                </Typography>
                <Divider></Divider>
                <Typography>
                  {new Date(value[0]).toDateString() !== "Invalid Date" && (
                    <p>Fin de reserva: {new Date(value[1]).toDateString()}</p>
                  )}
                </Typography>
              </Stack>
            </Stack>
          </div>
        </Popover>
      </Stack>
    </Stack>
  );
};

export default BuscarXSede;
