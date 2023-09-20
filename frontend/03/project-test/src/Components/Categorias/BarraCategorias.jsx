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
    <div style={{ width: "100%" }}>
      <Carousel
        containerProps={{
          style: {
         width: "100%",
         maxWidth:"1300px",
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
            width: 40,
            height: 60,
            minWidth: 60,
            alignSelf: "center",
          },
        }}
        backwardBtnProps={{
          children: "<",
          style: {
            width: 40,
            height: 60,
            minWidth: 60,
            alignSelf: "center",
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

          <div /*className="card-categoria"*/ style={{
            // background: "yellow",
            width: 170,
            height: 120,
            border: "5px solid white",
            textAlign: "center",
            lineHeight: "90px",
            boxSizing: "border-box",
          }}>
          
              <img
                src={buscadorIconoCategoria(categoria.categoria_id)}
                alt={`Imagen de ${categoria.name}`}
                style={{overflow:"covers", maxWidth:"80px", maxHeight:"50px"}}

              />
         
            <Typography variant="body1">{categoria.name}</Typography>
          </div>
        </Link>

      ))}

        {/* Los demás divs de los slides van aquí */}
      </Carousel>
    </div>
  );
};

export default BarraCategorias;
