import React, { useState, useEffect, useContext } from "react";
import Carousel from "react-simply-carousel";

import { ContextGlobal } from "../utils/global.context";
import { Link } from "react-router-dom";
import buscadorIconoCategoria from "../AdministradorProductos/Categorias/iconoXCategoria";
import "./Categorias.css";
import "./CardCategoria.css";
import { Typography } from "@mui/material";

const BarraCategorias = ({ NombreCategoria }) => {
    const { categoriasLista, setCategoriasLista, getCategoriasLista } =
    useContext(ContextGlobal);
    useEffect(() => {
        getCategoriasLista();
      }, []);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleSlideChange = (newActiveSlideIndex) => {
    setActiveSlideIndex(newActiveSlideIndex);
  };

  return (
    <div style={{ width: "100%", marginRight:"1rem" }}>
      <Carousel
        containerProps={{
          style: {
         width: "100%",
         maxWidth:"1400px",
         maxHeight:"120px",
         margin:"auto",
            justifyContent: "space-between",
            userSelect: "none",
            flexWrap: "nowrap",
          },
        }}
        preventScrollOnSwipe
        swipeThreshold={60}
        activeSlideIndex={activeSlideIndex}
        onRequestChange={handleSlideChange}
        forwardBtnProps={{
          children: ">",
          style: {
            width: 20,
            height: 50,
            minWidth: 60,
            alignSelf: "center",
            backgroundColor:"white",
            border:"1px solid #dfdfdf",
            borderRadius:"28px"
          },
        }}
        backwardBtnProps={{
          children: "<",
          style: {
            width: 20,
            height: 50,
            minWidth: 60,
            alignSelf: "center",
            backgroundColor:"white",
            border:"1px solid #dfdfdf",
            borderRadius:"28px"
          },
        }}
        width="90%"
        maxWidth="1400"
        itemsToShow={6}
        speed={400}
        centerMode
        infinite="false"
       
        
      >
        {/* Aquí he corregido la estructura de tus divs para que estén dentro del Carousel */}
        {categoriasLista.map((categoria, id) => (
        <Link
          to={`/paginafiltrado/${categoria.categoria_id}`}
          key={categoria.categoria_id}

        >

          <div /*className="card-categoria"*/ 
          className="card-categoria"
          style={{
            // background: "yellow",
            width: 190,
            height: 90,
            border: "1px solid white",
            textAlign: "center",
            // lineHeight: "90px",
            boxSizing: "border-box",
          }}>
          
              <img
                src={buscadorIconoCategoria(categoria.categoria_id)}
                alt={`Imagen de ${categoria.name}`}
                style={{overflow:"covers", maxWidth:"70px", maxHeight:"50px"}}

              />
         
            <Typography sx={{fontWeight:"500", color:"#424242", fontSize:"1.1rem" }}>{categoria.name}</Typography>
          </div>
        </Link>

      ))}

        {/* Los demás divs de los slides van aquí */}
      </Carousel>
    </div>
  );
};

export default BarraCategorias;
