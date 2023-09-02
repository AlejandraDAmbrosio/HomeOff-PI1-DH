import React from "react";
import ListadoProductos from "../Components/ListadoDeProductos/ListadoProductos";
import BannerPrincipal from "../Components/BannerPrincipal/BannerPrincipal";
import TitularSection from "../Components/Genericos/TitularSection";
import { ContextGlobal } from "../Components/utils/global.context";
import { useState, useEffect, useContext } from "react";


const Home = () => {
 const {
    
    prodFiltrados,
   
  } = useContext(ContextGlobal);

  return (
    <>
    <section style={{marginTop: "12rem"}}>
      <TitularSection estilo={"titulo-section-banner"} titulo={"Oportunidades Únicas"}/>
    <BannerPrincipal/>
    </section>
    <section style={{marginTop: "1rem"}}>
    <TitularSection estilo={"titulo-section-productos"}   titulo={prodFiltrados.length > 0 ? "Resultados de tu búsqueda" : "Productos"}/>
      <ListadoProductos CantidadCards={10} />
      </section>
    </>
  );
};

export default Home;