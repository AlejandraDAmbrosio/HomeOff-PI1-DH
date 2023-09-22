import React from "react";
import ListadoProductos from "../Components/ListadoDeProductos/ListadoProductos";
import BannerPrincipal from "../Components/BannerPrincipal/BannerPrincipal";
import TitularSection from "../Components/Genericos/TitularSection";
import { ContextGlobal } from "../Components/utils/global.context";
import { useState, useEffect, useContext } from "react";
import NuevoBuscador from "../Components/Buscador/NuevoBuscador/NuevoBuscador";
import { Modal, Typography } from "@mui/material";
import { SegmentoBuscador } from "../Components/Buscador/SegmentoBuscador";
import FormIngreso from "./FormIngreso";

const Home = () => {
  const { prodFiltrados } = useContext(ContextGlobal);
  const [tituloListadoProductos, setTituloListadoProductos] = useState("Productos");


  useEffect(() => {
    async function actualizarTitulo() {
      if (prodFiltrados.length > 0) {
        setTituloListadoProductos(
          `Resultados de tu búsqueda ${prodFiltrados.length} productos`
        );
      } else if (
        prodFiltrados.length ==
        0 
      ) {
        setTituloListadoProductos("Productos");
      }
    }

    actualizarTitulo();
  }, [prodFiltrados.length]);

 
  return (
    <>
      <section style={{ marginTop: "12rem" }}>
        <h2 className="titulo-section-banner">Oportunidades Únicas</h2>

        <BannerPrincipal />
      </section>
      <SegmentoBuscador />
      <section style={{ marginTop: "1rem" }}>
        <TitularSection
          estilo={"titulo-section-productos"}
          // titulo={prodFiltrados.length > 0 ? tituloListadoProductos : "Productos"}
          titulo={prodFiltrados? tituloListadoProductos :"Productos"}

        />
        
        <ListadoProductos CantidadCards={10} />
      </section>
     
    </>
  );
};

export default Home;
