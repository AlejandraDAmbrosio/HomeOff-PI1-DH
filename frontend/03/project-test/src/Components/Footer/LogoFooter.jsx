import React from "react";
import "./LogoFooter.css";
import { Link } from "react-router-dom";

const LogoFooter = () => {
  return (
    <div className="logo-copy">
      <Link to={"/"}>
        <div className="logo">
          <img className="logo-footer" src="/images/LogoVerde2.PNG" />
        </div>
      </Link>
      <p className="registrado">© 2023 Registrado.</p>
    </div>
  );
};

export default LogoFooter;
