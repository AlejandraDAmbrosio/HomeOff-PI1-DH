import React, { useState, useEffect } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import { useContext } from "react";
import TablaXCategorias from "../Components/PaginaFiltrado/TablaXCategorias";
import PanelFiltrado from "../Components/PaginaFiltrado/PanelFiltrado";
import "../Components/PaginaFiltrado.css";
import { useParams } from "react-router-dom";
import buscadorXIDCategoria from "../Components/utils/BuscarXIDCategoria";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

//////////////////////////////
function obtenerNombreCategoriaPorId(idParam, listaCategorias) {
  const categoriaEncontrada = listaCategorias.find(
    (item) => item.categoria_id == idParam
  );

  if (categoriaEncontrada) {
    return categoriaEncontrada.name;
  } else {
    return "Categoría no encontrada";
  }
}
//////////////

const PaginaFiltrado = () => {
  const { id } = useParams();
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const {
    productosBKLista,
    setProductosBKLista,
    getDatosBKLista,
    categoriasLista,
    setCategoriasLista,
    getCategoriasLista,
  } = useContext(ContextGlobal);

  useEffect(() => {
    getDatosBKLista();
  }, []);
  console.log(
    " ---------------------------------- Impresion por pantalla de productosBKLista que trae el contexto a PaginaFiltrado"
  );
  console.log(productosBKLista);
  console.log(
    "/*-----------------------------  ID Categorias a buscar ----------------------"
  );
  console.log(id);

  useEffect(() => {
    setListaFiltrada(
      productosBKLista.filter(
        (producto) => producto.categoria_id === parseInt(id)
      )
    );
  }, [id, productosBKLista]);

  console.log(
    " ---------------------------------- listaFiltrada -----------------------------------------------"
  );
  console.log(listaFiltrada.length);
  ////////////////////////////////////////////////////////////////
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
    setListaFiltrada(productosBKLista);
  };

  const handleFiltrarPorSede = (idSede) => {
    setListaFiltrada(
      productosBKLista.filter((producto) => producto.idSede === idSede)
    );
  };


  return (
    <div className="administracion-fil">
      <div className="administracion-fil-titulo">
        <div className="fil-titulo">Encontra tu Espacio:</div>
        {/* <div className="fil-frase">Hay {productosBKLista.length} espacios esperandote.</div> */}

        <div className="fil-frase">
          Tenés {listaFiltrada.length} espacios relacionados con tu busqueda.
        </div>
        <Stack direction="row" spacing={2} >
          <Chip
            label={`Total productos ${productosBKLista.length}`}
            onClick={handleClick}
            onDelete={handleDelete}
            size="small"
          />

{listaFiltrada.length < productosBKLista.length && (
          <Chip
            label={`${obtenerNombreCategoriaPorId( id,categoriasLista)} - ${listaFiltrada.length} `}
            variant="outlined"
            onClick={handleClick}
            onDelete={handleDelete}
          />
          )}

<Chip
            label={`COLOMBIA (${productosBKLista.filter(
              (producto) => producto.idSede === 1
            ).length})`}
            onClick={() => handleFiltrarPorSede(1)}
            size="small"
          />

          <Chip
            label={`ARGENTINA (${productosBKLista.filter(
              (producto) => producto.idSede === 2
            ).length})`}
            onClick={() => handleFiltrarPorSede(2)}
            size="small"
          />

          <Chip
            label={`CHILE (${productosBKLista.filter(
              (producto) => producto.idSede === 3
            ).length})`}
            onClick={() => handleFiltrarPorSede(3)}
            size="small"
          />
        </Stack>
      </div>
      <div className="paneles-fil">
        <PanelFiltrado></PanelFiltrado>
        <TablaXCategorias productos={listaFiltrada} />
      </div>
    </div>
  );
};

export default PaginaFiltrado;
