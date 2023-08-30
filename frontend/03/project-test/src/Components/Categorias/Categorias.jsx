import React from "react";
import buscadorIconoCategoria from "../AdministradorProductos/Categorias/iconoXCategoria";

import "./Categorias.css";
import "./CardCategoria.css";

import { ContextGlobal } from "../utils/global.context";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const Categorias = ({ NombreCategoria }) => {
  const { categoriasLista, setCategoriasLista, getCategoriasLista } =
    useContext(ContextGlobal);

  useEffect(() => {
    getCategoriasLista();
  }, []);

  return (
    <div className="segmento-categorias">
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
                style={{
                  width: "60px",
                  height: "50px",
                  padding: "2px 0 0 0px",
                  backgroundColor: "white",
                }}
              />
            </div>
            <div className="nombre-icono-categoria">{categoria.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Categorias;
