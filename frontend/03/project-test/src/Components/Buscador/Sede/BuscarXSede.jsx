import { Autocomplete, TextField } from "@mui/material";
import { ContextGlobal } from "../../utils/global.context";
import React, { useEffect, useState, useContext } from "react";
import "./BuscarXSede.css";

const BuscarXSede = () => {
  // const { prodFiltrados, setProdFiltrados, idFilteredSedes, setIdFilteredSedes, filteredSedes, setFilteredSedes} = useContext(ContextGlobal);
  const {
    productosBKLista,
    idFilteredSedes,
    setIdFilteredSedes,
    filteredSedes,
    filteredName,
    setFilteredSedes,
    prodFiltrados,
    setProdFiltrados,
  } = useContext(ContextGlobal);

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
  };

  return (
    <div className="input-container">
      <input
        id="buscarXSede"
        list="paises"
        type="text"
        placeholder="Encontrá tu espacio aquí"
        onKeyUp={handleSearch}
        options={filteredSedes.map((sede) => sede.nombre)}
        style={{
          background: "none",
          border: "none",
          outline: 0,
          height: "98%",
          fontSize: "24px",
          width: "100%",
          color: "#717171",
        }}
      ></input>

      <datalist id="paises">
        <option value="Colombia"></option>
        <option value="Argentina"></option>
        <option value="Chile"></option>
      </datalist>
    </div>
  );
};

export default BuscarXSede;
