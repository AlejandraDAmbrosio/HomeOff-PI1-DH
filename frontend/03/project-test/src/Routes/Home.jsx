import React from "react";
import ListadoProductos from "../Components/ListadoDeProductos/ListadoProductos";
import Recomendaciones from "../Components/Recomendaciones/Recomendaciones";
import ProductList from "../Components/ListadoDeProductos/ProductList";
import BannerPrincipal from "../Components/BannerPrincipal/BannerPrincipal";
import FiltroCategorias from "../Components/Genericos/FiltroCategorias";
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