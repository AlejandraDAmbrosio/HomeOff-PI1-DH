import { Autocomplete, TextField } from "@mui/material";
import { ContextGlobal } from "../../utils/global.context";
import React, { useEffect, useState, useContext } from "react";
import "./BuscarXSede.css"

const BuscarXSede = () => {
  // const { prodFiltrados, setProdFiltrados, idFilteredSedes, setIdFilteredSedes, filteredSedes, setFilteredSedes} = useContext(ContextGlobal);
  const { idFilteredSedes, setIdFilteredSedes, filteredSedes, setFilteredSedes, prodFiltrados, setProdFiltrados} = useContext(ContextGlobal);


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

    setProdFiltrados(filteredSedes);
    
    

  };

  return (
    <div className="input-container">
       {/*  OPCION AUTOCOMPLETE MUI
       <Autocomplete
      id="buscarXSede"
      options={filteredSedes.map((sede) => sede.nombre)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Sede"
          style={{
            background: "none",
            border: "none",
            outline: 0,
            height: "98%",
            fontSize: "24px",
            width: "100%",
            color: "#717171",
          }}
        />
      )}
      onKeyUp={handleSearch}
    /> */}
       <input
        id="buscarXSede"
        list="paises"
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

      <datalist id="paises" >
        <option value="Colombia"></option>
        <option value="Argentina"></option>
        <option value="Chile"></option>

      </datalist>
     
    </div>
  );
};

export default BuscarXSede;
