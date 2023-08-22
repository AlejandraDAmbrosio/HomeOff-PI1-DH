import React from "react";
import BotonCrearCuenta from "./BotonCrearCuenta";
import BotonInicio from "./BotonInicio";
import Logo from "./Logo";

import "./Navbar.css";
import Categorias from "../Categorias/Categorias";
import Buscador from "../Buscador/Buscador";

import { useContext } from "react";
import { ContextGlobal } from "../utils/global.context";

import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const { showModal, closeModal, openModal, productos } =
    useContext(ContextGlobal);

  return (
    <>
      <div className="header">
        <nav>
          <ul className="ul-nav">
            <li>
              <Logo />
            </li>
            <div className="botones-header">
              <li>
                <BotonCrearCuenta
                  className="boton-persona"
                  onClick={() => openModal()}
                />
              </li>
              <li>
                <BotonInicio className="boton-inicio" />
              </li>
              {/* <li>
                <DropDownMenu />
              </li> */}
              <li>
                <AccountMenu/>
              </li>
              {/* <li>
              <AvatarNav/> */}
                {/* <BsPersonCircle className="icono-persona" />  */}
              {/* </li> */}
            </div>
          </ul>
        </nav>

        <div className="buscador-cat">
          <Buscador />
          <Categorias />
        </div>
      </div>
    </>
  );
};

export default Navbar;


