import React from "react";
import buscadorIconoCategoria from "../AdministradorProductos/Categorias/iconoXCategoria";
import "./Categorias.css";
import "./CardCategoria.css";
import { ContextGlobal } from "../utils/global.context";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const Categorias = ({ NombreCategoria }) => {
  const { categoriasLista, setCategoriasLista, getCategoriasLista } =
    useContext(ContextGlobal);

  useEffect(() => {
    getCategoriasLista();
  }, []);

  const handleScrollLeft = () => {
    console.log("left")
    // const slider = document.getElementById('slider');
  
    // slider.scrollLeft -= 500;
  };
  
  const handleScrollRight = () => {
    console.log("Right")
    // const slider = document.getElementById('slider');
  
    // slider.scrollLeft += 500;
  };
  

  return (
    <div className="segmento-categorias container">
      <div className="arrow control prev" onClick={handleScrollLeft}>
        <BsChevronLeft fontSize={"30px"} onClick={handleScrollLeft}></BsChevronLeft>
      </div>
      {/* <div className="slider"> */}
      {categoriasLista.map((categoria, id) => (
        <Link
          to={`/paginafiltrado/${categoria.categoria_id}`}
          key={categoria.categoria_id}

        >
          <div className="card-categoria">
            <div className="fondo-icono">
              <img
                src={buscadorIconoCategoria(categoria.categoria_id)}
                alt={`Imagen de ${categoria.name}`}
                className="icono"
              />
            </div>
            <div className="nombre-icono-categoria">{categoria.name}</div>
          </div>
        </Link>

      ))}
      {/* </div> */}
      <div  className="arrow control next"  onClick={handleScrollRight}>
        <BsChevronRight fontSize={"30px"} onClick={handleScrollRight} ></BsChevronRight>
      </div>
    </div>
  );
};
export default Categorias;
