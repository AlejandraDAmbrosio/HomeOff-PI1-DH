import React from "react";
import ListadoProductos from "../Components/ListadoDeProductos/ListadoProductos";
import BannerPrincipal from "../Components/BannerPrincipal/BannerPrincipal";

const Home = () => {
  return (
    <>
    <BannerPrincipal/>
      <ListadoProductos CantidadCards={10} />
   
    </>
  );
};

export default Home;