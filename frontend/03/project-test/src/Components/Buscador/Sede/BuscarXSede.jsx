import { Autocomplete, TextField } from "@mui/material";
import { ContextGlobal } from "../../utils/global.context";
import React, { useEffect, useState, useContext } from "react";

const BuscarXSede = () => {
  const { idFilteredSedes, setIdFilteredSedes } = useContext(ContextGlobal);


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

  const [filteredSedes, setFilteredSedes] = useState([]);
 
  
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filtered = sedesArray.filter((sede) =>
      sede.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    // Actualizar el estado directamente aquí
    setFilteredSedes(filtered);
    const filteredIds = filtered.map((sede) => sede.id);
    setIdFilteredSedes(filteredIds);

    // Los console.log mostrarán los valores correctos aquí
    console.log(filtered);
    console.log(filteredIds);
    if (filtered.length === 1) {
      e.target.value = filtered[0].nombre;
    }
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

export default BuscarXSede;
