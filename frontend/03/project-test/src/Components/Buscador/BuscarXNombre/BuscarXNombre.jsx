import { Autocomplete, TextField } from "@mui/material";
import { ContextGlobal } from "../../utils/global.context";
import React, { useEffect, useState, useContext } from "react";

const BuscarXNombre = () => {
  const {
    prodFiltrados,
    setProdFiltrados,
    idFilteredSedes,
    setIdFilteredSedes,
    filteredSedes,
    setFilteredSedes,
    productosBKLista,
    idFilteredName,
    setIdFilteredName,
    filteredName,
    setfilteredName,
  } = useContext(ContextGlobal);

  const nombres = productosBKLista.map((producto) => producto.nombre);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (filteredName.length === 1) {
        e.target.value = filteredName[0].nombre;
      }
    }

    const searchText = e.target.value;
    //////// 
    const filtered =
      prodFiltrados.length > 0
        ? prodFiltrados.filter((producto) =>
            producto.nombre.toLowerCase().includes(searchText.toLowerCase())
          )
        : productosBKLista.filter((producto) =>
            producto.nombre.toLowerCase().includes(searchText.toLowerCase())
          );


 //////////
    setfilteredName(filtered);
    console.log("-------------------- filteredName 5");
    console.log(filteredName);

    const filteredIds = filtered.map((producto) => producto.idRecurso);

    setfilteredName(filteredIds);

    setProdFiltrados(filteredName);
    console.log("--------------------ProdFiltrados 6");
    console.log(prodFiltrados);
  };

  return (
    <div>
      <input
        id="buscarXNombre"
        type="text"
        placeholder="Nombre"
        onKeyUp={handleSearch}
        options={filteredName.map((producto) => producto.nombre)}
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
    </div>
  );
};

export default BuscarXNombre;
