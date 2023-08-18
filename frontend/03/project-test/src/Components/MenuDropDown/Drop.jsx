import React, { useEffect, useState } from "react";
import "./Drop.css";
import { MdSettings, MdClose } from "react-icons/md";

const Drop = () => {
  const [menuHeight, setMenuHeight] = useState(null);

  function calcularHeight(h) {
    const height = h.offsetHeight;
    setMenuHeight(height);
  }

  useEffect(() => {
    const menuContainer = document.querySelector(".drop");
    calcularHeight(menuContainer);

    function handleWindowResize() {
      calcularHeight(menuContainer);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  function DropdownItem(props) {
    return (
      <a href="#" className="drop-dropdown-item">
        <span className="icono-boton-menu left"> {props.leftIcon}</span>
        {props.children}
        <span className="icono-boton-menu right"> {props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="drop" style={{ height: menuHeight }}>
      <DropdownItem>Mi cuenta</DropdownItem>
      <DropdownItem>Cerrar sesión</DropdownItem>
      <DropdownItem leftIcon={<MdSettings className="icono-persona-drop" />}>
        Configuración
      </DropdownItem>
    </div>
  );
};

export default Drop;
