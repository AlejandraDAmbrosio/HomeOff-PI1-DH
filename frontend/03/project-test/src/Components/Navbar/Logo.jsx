import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="LogoLema">
        <img className="LogoJpg2" src="/images/LogoVerde2.PNG" />
      </div>
    </Link>
  );
};

export default Logo;
