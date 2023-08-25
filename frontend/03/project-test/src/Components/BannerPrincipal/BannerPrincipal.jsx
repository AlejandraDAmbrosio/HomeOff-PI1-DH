import React from "react";
import "./BannerPrincipal.css";
import { ContextGlobal } from "../utils/global.context";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const BannerPrincipal = () => {
  

  return (
    <div>
      <div className="flexing">
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
