import React from "react";
import "./BannerPrincipal.css";
import { ContextGlobal } from "../utils/global.context";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const BannerPrincipal = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // Si el usuario ha desplazado hacia abajo, establecer scrolling en verdadero
        setScrolling(true);
      } else {
        // Si el usuario está en la parte superior de la página, establecer scrolling en falso
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const flexingClassName = scrolling ? "flexing scrolled" : "flexing";

  return (
    <div>
      <div className={flexingClassName}>
        <div className="section section--yellow">
          <Link to={"/paginafiltrado/2"}>
            <h3 className="title">Co Working</h3>
            <h3 className="precio">10%Off</h3>
          </Link>
        </div>

        <div className="section section--pink">
          <Link to={"/paginafiltrado/5"}>
            <h3 className="title">Officina Set</h3>
            <h3 className="precio">15%Off</h3>
          </Link>
        </div>
        <div className="section section--green">
          <Link to={"/paginafiltrado/1"}>
            <h3 className="title">Oficina Privada</h3>
            <h3 className="precio">$4.500</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerPrincipal;
