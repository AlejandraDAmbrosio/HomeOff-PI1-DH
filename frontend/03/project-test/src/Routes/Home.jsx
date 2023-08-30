import React from "react";
import ListadoProductos from "../Components/ListadoDeProductos/ListadoProductos";
import BannerPrincipal from "../Components/BannerPrincipal/BannerPrincipal";
import TitularSection from "../Components/Genericos/TitularSection";

const Home = () => {


  return (
    <>
    <section style={{marginTop: "12rem"}}>
      <TitularSection estilo={"titulo-section-banner"} titulo={"Oportunidades Únicas"}/>
    <BannerPrincipal/>
    </section>
    <section>
    <TitularSection estilo={"titulo-section-productos"}  titulo={"Productos"}/>
      <ListadoProductos CantidadCards={10} />
      </section>
    </>
  );
};

export default Home;