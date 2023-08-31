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


  const [selectedFilters, setSelectedFilter] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  let filters = categoriasLista.map((categoria) => categoria);
  console.log(filters);
  const handlefilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilter(filters);
    } else {
      setSelectedFilter([...selectedFilters, selectedCategory]);
    }
  };
  
  useEffect(() => {
    // Filtra la categoría correspondiente al id en selectedFilters
    if (id) {
      const categoriaSeleccionada = categoriasLista.find(
        (categoria) => categoria.categoria_id === parseInt(id)
      );
      if (categoriaSeleccionada) {
        setSelectedFilter([categoriaSeleccionada]);
      }
    }
  }, [id, categoriasLista]);



  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = productosBKLista.filter(
          (item) => item.categoria_id === selectedCategory.categoria_id
        );
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...productosBKLista]);
    }
  };

  return (
    <div className="administracion-fil">
      <div className="administracion-fil-titulo">
        <div className="fil-titulo">Encontra tu Espacio:</div>
        <div className="fila-busqueda">
          <div className="fil-frase">
            Tenés {filteredItems.length} espacios relacionados con tu busqueda.
          </div>

          <Stack direction={"horizontal"} spacing={3}>
            {filters.map((categoria, id) => (
              <div
                className={`button ${
                  selectedFilters?.includes(categoria) ? "active" : ""
                }`}
                onClick={() => handlefilterButtonClick(categoria)}
                key={`filter-${id}`}
                style={{ margin: "0 1rem 0 1rem" }}
              >
                {categoria.name}
              </div>
            ))}
          </Stack>
        </div>
        <Stack>
          <TablaXCategorias productos={filteredItems} />
        </Stack>
      </div>
    </div>
  );
};

export default PaginaFiltrado;
