import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const BuscarXSede = () => {
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
    setFilteredSedes(filtered);
    console.log(filteredSedes);
  };

  return (
    <div>
      {/* <TextFieldd
       id="buscarXSede"
       label="Sede"
       variant="standard"
       className="campo-formulario"
       type="email"
       placeholder="Ingresa tu password"
       value={usuario.password}
       onChange={onChangePass}
       required
       margin="normal"
       style={{ borderColor: passwordValido ? "" : "red" }}
      ></TextFieldd> */}

      <input
        id="buscarXSede"
        type="text"
        placeholder="Sede"
        onKeyUp={handleSearch}
        options={filteredSedes.map((sede) => sede.nombre)}
      ></input>

      <Autocomplete
        freeSolo
        id="buscadorSede"
        disableClearable
        variant="standard"
        options={sedesArray.map((sede) => sede.nombre)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      ></Autocomplete>
    </div>
  );
};

export default BuscarXSede;
