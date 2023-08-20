import React from "react";
import "./CardProducto.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CardProducto = ({
  title,
  url,
  id,
  descripcion,
  precio,
  tipoRecurso,
  servicio1,
  servicio2,
  servicio3,
}) => {
  return (
    <div className="card-body-producto">
      <Link to={"/producto/" + id}>
        <img className="ImgCard-producto-home" src={url} alt="Foto producto" />
        <div className="textos-card">
          <div className="titulo-descripcion-tipo-servicios">
          <p className="nombre-categoria-card-producto">{descripcion}</p>

            <h3 className="titulo-card-producto">{title}</h3>
            <div className="descripcion-tipo">
              <p className="descripcion-card-home p-sinmargin">{descripcion}</p>
            </div>
          </div>

          <div className="precio-contenedor">
            <p className="precio-card-home">${precio}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};



CardProducto.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  tipoRecurso: PropTypes.string.isRequired,
  
  // servicio1: PropTypes.string.isRequired,
};

export default CardProducto;
