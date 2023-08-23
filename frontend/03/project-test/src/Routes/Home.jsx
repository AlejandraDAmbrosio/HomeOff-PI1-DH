import React from "react";
import ListadoProductos from "../Components/ListadoDeProductos/ListadoProductos";
import BannerPrincipal from "../Components/BannerPrincipal/BannerPrincipal";
import TitularSection from "../Components/Genericos/TitularSection";

const Home = () => {
// const tituloSection1 = "Promociones";
// const tituloSection2= "Productos"

  return (
    <>
    <section style={{marginTop: "12rem"}}>
      <TitularSection titulo={"Promociones"}/>
    <BannerPrincipal/>
    </section>
    <section>
    <TitularSection titulo={"Productos"}/>
      <ListadoProductos CantidadCards={10} />
      </section>
    </>
  );
};

export default Home;