import { ContextGlobal } from "../../utils/global.context";
import React, { useEffect, useState, useContext } from "react";
import {} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";

import "./BuscarXSede.css";

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
    busquedaCero, setBusquedaCero,
  } = useContext(ContextGlobal);

  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

  // console.log("Nombres en combineNames");
  // console.log(combineNames());

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
   setBusquedaCero("No se encontraron resultados")
} else {
      
//   setBusquedaCero("No se encontraron resultados")
//   setOpenModal(false);
 }

    if (inputValue.length === 0) {
      setProdFiltrados([]);
    }
  };

  return (
    <div className="input-container">
      <input
        className="busqueda"
        id="buscarXSede"
        list="paises"
        type="text"
        placeholder="Sede o nombre"
        onKeyUp={handleSearch}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        options={filteredSedes.map((sede) => sede.nombre)}
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
  );
};

export default BuscarXSede;
