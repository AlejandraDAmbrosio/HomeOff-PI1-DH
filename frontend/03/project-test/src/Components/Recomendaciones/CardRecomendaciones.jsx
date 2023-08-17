import React from "react";
import "./CardRecomendaciones.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import { useContext } from "react";
// import { ContextGlobal } from "./utils/global.context";

const CardRecomendaciones = ({
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
  //   const { state } = useContext(ContextGlobal);

  return (
    <>
      <Link to={"/producto/" + id}>
        <div className="container-reco">
          <div className="thumbnail-reco">
            <img className="ImgCardReco" src={url} alt="Foto producto" />
          </div>
          <div className="content-reco">
            {/* <div className="texto-card-reco"> */}
              <h3 className="nombre-card-producto">{title}</h3>
              {/* <p className="tipo-recurso-card">{tipoRecurso}</p> */}
              {/* <p className="descripcion-card">{descripcion}</p> */}
              <p className="precio">{precio}</p>
            {/* </div> */}
          </div>
        </div>
      </Link>

      {/* <Link to={"/producto/" + id}>
        <div className="card-body-reco">
          <img className="ImgCardReco" src={url} alt="Foto producto" />
          <div className="texto-card-reco">
            <h3 className="nombre-card-producto">{title}</h3>
            <p className="tipo-recurso-card">{tipoRecurso}</p>
            <p className="descripcion-card">{descripcion}</p>

            <p className="precio">{precio}</p>
       
          </div>
        </div>
      </Link> */}
    </>
  );
};

CardRecomendaciones.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  // id: PropTypes.number.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.string.isRequired, // Cambiado a string ya que en el JSON parece ser una cadena
  tipoRecurso: PropTypes.string.isRequired,
};

export default CardRecomendaciones;
