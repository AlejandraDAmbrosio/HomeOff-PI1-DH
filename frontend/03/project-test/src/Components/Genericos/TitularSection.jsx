import React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { ContextGlobal } from "../utils/global.context";
import { useContext } from "react";
import { MdClose } from "react-icons/md";

const TitularSection = ({ titulo, estilo }) => {
  const { busquedaCero, resultadoBusqueda } = useContext(ContextGlobal);
  return (
    <div className={estilo} >
      <div>{titulo}</div>{" "}
      <div>
        {(busquedaCero || (resultadoBusqueda == false)) ?  (
          <div
            style={{
              fontSize: "22px",
              padding: "5px 20px 5px 10px",
              borderRadius:"20px",
              border:"1px solid #979797",
              margin: "0 2rem 5px 3rem",
              backgroundColor: "white",
              alignItems: "center",
              display:"flex",
              flexDirection:"row",
              justifyContent:"flex-start"
            }}
          >

            <MdClose
              style={{
                fontSize: "30px",
                margin: "0rem 1rem 0 0rem",
                color: "red",
              }}
            />
            No se encontraron productos relacionados con su búsqueda.
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TitularSection;
