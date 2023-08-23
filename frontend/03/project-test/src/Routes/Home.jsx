import React from "react";
import ListadoProductos from "../Components/ListadoDeProductos/ListadoProductos";
import BannerPrincipal from "../Components/BannerPrincipal/BannerPrincipal";

const Home = () => {
  return (
    <>
    <BannerPrincipal/>
      {/* <Recomendaciones CantidadCards={3} /> */}
      <ListadoProductos CantidadCards={10} />
   
    </>
  );
};

export default Home;