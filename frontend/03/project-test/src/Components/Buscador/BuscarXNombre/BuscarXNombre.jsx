import { Autocomplete, TextField } from "@mui/material";
import { ContextGlobal } from "../../utils/global.context";
import React, { useEffect, useState, useContext } from "react";

const BuscarXNombre = () => {
  const { idFilteredName, setIdFilteredName, filteredName, setfilteredName, productosBKLista} = useContext(ContextGlobal);

  

 
  
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (filteredSedes.length === 1) {
        e.target.value = filteredSedes[0].nombre;
      }
    }
  
    const searchText = e.target.value;
    const filtered = sedesArray.filter((sede) =>
      sede.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSedes(filtered);
  
    const filteredIds = filtered.map((sede) => sede.id);
    setIdFilteredSedes(filteredIds);
  };

  return (
    <div>
      <input
        id="buscarXSede"
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
      ></input>
    </div>
  );
};

export default BuscarXNombre;
