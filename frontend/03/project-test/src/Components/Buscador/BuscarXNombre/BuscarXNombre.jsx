import { ContextGlobal } from "../../utils/global.context";
import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";

const BuscarXNombre = () => {
  const {
    idFilteredName,
    setIdFilteredName,
    filteredName,
    setfilteredName,
    productosBKLista,
  } = useContext(ContextGlobal);

  // const handleSearch = (e) => {
  //   if (e.key === "Enter") {
  //     if (filteredName.length === 1) {
  //       e.target.value = filteredName[0].nombre;
  //     }
  //   }

  //   const searchText = e.target.value;
  //   const filtered = sedesArray.filter((sede) =>
  //     sede.nombre.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setfilteredName(filtered);

  //   const filteredIds = filtered.map((sede) => sede.id);
  //   setIdFilteredName(filteredIds);
  // };
  
  const handleSearch = (searchText) => {
    const filtered = productosBKLista.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
    setfilteredName(filtered);

    const filteredIds = filtered.map((producto) => producto.id);
    setIdFilteredName(filteredIds);
  };


  return (
    <div>
      <Autocomplete
        id="buscarXNombre"
        freeSolo
        options={filteredName.map((producto) => producto.nombre)}
        onInputChange={(event, newValue) => {
          handleSearch(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Buscar por nombre"
            style={{
              fontSize: "24px", // Ajusta el tamaño de fuente
              color: "#717171", // Ajusta el color del texto
              width: "100%", // Ajusta el ancho
              // Agrega más estilos personalizados aquí según tus preferencias
            }}
          />
        )}
      />
      {/* <input
        id="buscarXNombre"
        type="text"
        placeholder="Sede"
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
      ></input> */}
    </div>
  );
};

export default BuscarXNombre;
