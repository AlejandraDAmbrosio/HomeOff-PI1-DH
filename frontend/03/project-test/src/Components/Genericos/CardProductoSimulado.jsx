import React from "react";
import "./CardProductoSimulado.css";
import PropTypes from "prop-types";

const CardProductoSimulado = ({
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
    <div className="card-body-producto-simulado">
      <img className="ImgCard-producto" src={url} alt="Foto producto" />
      <div className="textos-card-simulado">
        <div className="titulo-descripcion-tipo-servicios">
          <h3 className="titulo-card-producto-simulado">{title}</h3>
          <div className="descripcion-tipo">
            <p className="descripcion-card-home p-sinmargin">{descripcion}</p>
            {/* <p className="tipo-recurso-card p-sinmargin">{tipoRecurso}</p> */}
            {/* <div className="servicios">
                <p className="servicio-card p-sinmargin">{servicio1}</p>
                <p className="p-sinmargin">-</p>
                <p className="servicio-card p-sinmargin">{servicio2}</p>
                <p className="p-sinmargin">-</p>
                <p className="servicio-card p-sinmargin">{servicio3}</p>
              </div> */}
          </div>
        </div>

        <div className="precio-contenedor">
          <p className="precio-card-home">${precio}</p>
        </div>
      </div>
    </div>
  );
};

CardProductoSimulado.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  tipoDeRecurso: PropTypes.number.isRequired,
  // servicio1: PropTypes.string.isRequired,
};

export default CardProductoSimulado;
