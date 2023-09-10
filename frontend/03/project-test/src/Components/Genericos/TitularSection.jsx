import React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { ContextGlobal } from "../utils/global.context";
import { useContext } from "react";

const TitularSection = ({ titulo, estilo }) => {
  const { busquedaCero } = useContext(ContextGlobal);
  return (
    <div className={estilo}>
      <div>{titulo}</div>{" "}
      <div style={{fontSize:"22px", paddingLeft:"2rem", paddingBottom:"5px"}}>
        {busquedaCero
          ? "No se encontraron productos relacionados con su busqueda."
          : ""}
      </div>
    </div>
  );
};

export default TitularSection;
