import React from "react";
import "./TablaCaracteristicas.css";
import { ContextGlobal } from "../../utils/global.context";
import axios from "axios";

import { useState, useEffect, useContext } from "react";

function nombreExiste(nombre, data) {
  return data.find((objeto) => objeto.nombre === nombre) !== undefined;
}

const TablaCaracteristicas = () => {
  const urlBaseGuardar = "http://52.32.210.155:8080/api/v1/categorias/save";
  const urlBaseEliminar = "http://52.32.210.155:8080/api/v1/categorias/delete/";
  const urlBaseListar = "http://52.32.210.155:8080/api/v1/categorias/list";
  
  const {
    caracteristicasLista,
    setCaracteristicasLista,
    getCaracteristicasLista,
  } = useContext(ContextGlobal);

  useEffect(() => {
    getCaracteristicasLista();
  }, []);


  console.log(" ----------------   Console Tabla Caracteristicas          -------------");
  console.log(caracteristicasLista);


  return (
    <div>
      <div>TablaCaracteristicas</div>
    </div>
  );
};

export default TablaCaracteristicas;
