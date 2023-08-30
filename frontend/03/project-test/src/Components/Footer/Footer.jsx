import React from "react";
import LogoFooter from "./LogoFooter";
import Contacto from "./Contacto";
import "./Footer.css";
import { BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer-HO">
      <LogoFooter />

      <div className="f-derecho">
        <p className="encontranos"> Encontranos en</p>

        <BsInstagram className="logo-redes" />
        <BsFacebook className="logo-redes" />
        <BsWhatsapp className="logo-redes" />
      </div>
    </div>
  );
};

export default Footer;
