import React from "react";
import BotonCrearCuenta from "./BotonCrearCuenta";
import BotonInicio from "./BotonInicio";
import Logo from "./Logo";

import "./Navbar.css";
import Categorias from "../Categorias/Categorias";

import { useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import { useLocation } from "react-router-dom";

import AccountMenu from "../MenuDropDown/AccountMenu";

import { useParams } from "react-router-dom";
import NuevoBuscador from "../Buscador/NuevoBuscador/NuevoBuscador";

const Navbar = () => {
  const { id } = useParams();
  const location = useLocation();
  const { usuarioLogueado } = useContext(ContextGlobal);

  const isPanelSinCategorias =
    location.pathname === "/agregarproducto/" ||
    location.pathname === "/administradorproductos/" ||
    location.pathname === "/administracioncaracteristicas/" ||
    location.pathname === "/administrarcategorias/" ||
    location.pathname === "/administracionusers/" ||
    location.pathname === "/paginafiltrado/" ||
    location.pathname.startsWith("/paginafiltrado/") ||
    location.pathname.startsWith("/editarproducto/") ||
    location.pathname.startsWith("/favoritos/") ||
    location.pathname.startsWith("/agregarCaracteristicas/") ||
    location.pathname.startsWith("/verreservas/") ||

    location.pathname === "/formaltauser/";
  location.pathname === "/favoritos/";

  return (
    <>
      <div className={`header ${isPanelSinCategorias ? "admin-header" : ""}`}>
        <nav>
          <ul className="ul-nav">
            <li>
              <Logo />
            </li>
            {/* <li>
              <NuevoBuscador />
            </li> */}
            <div className="botones-header">
              {!usuarioLogueado && (
                <>
                  <li>
                    <BotonCrearCuenta />
                  </li>
                  <li>
                    <BotonInicio className="boton-inicio" />
                  </li>
                </>
              )}
              <li className="account-menu">
                <AccountMenu />
              </li>
            </div>
          </ul>
        </nav>
        {isPanelSinCategorias ? (
          ""
        ) : (
          <div className="banda-categorias">
            <Categorias />
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

/////////////////////////////
