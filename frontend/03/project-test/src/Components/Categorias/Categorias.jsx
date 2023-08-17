import React from "react";
import "./Categorias.css";
import "./CardCategoria.css";
import CardCategoria from "./CardCategoria";
import { useState, useEffect } from "react";
import {
  HiOutlineBuildingOffice2,
  HiOutlineBuildingStorefront,
  HiOutlineHome,
  HiOutlinePrinter,
  HiOutlineFolder,
  HiOutlineInboxStack,
  HiOutlineTv,
  HiMiniComputerDesktop,
} from "react-icons/hi2";
import { GiOfficeChair } from "react-icons/gi";
import FiltroCategorias from "../Genericos/FiltroCategorias";

const Categorias = ({NombreCategoria}) => {
  return (
    <div className="segmento-categorias">

      <div className="card-categoria">
        {/* <div className="fondo-icono caja-blanca-sombreada"> */}
        <div className="fondo-icono">
          <HiOutlineBuildingOffice2 className="icono" />
        </div>
        <div className="nombre-icono-categoria">Oficina privada</div>
      </div>

      <div className="card-categoria">
        {/* <div className="fondo-icono caja-blanca-sombreada"> */}
        <div className="fondo-icono">
          <HiOutlineBuildingOffice2 className="icono" />
        </div>
        <div className="nombre-icono-categoria">Coworking</div>
      </div>

      <div className="card-categoria  sala-reu">
        {/* <div className="fondo-icono caja-blanca-sombreada"> */}
        <div className="fondo-icono">
          <HiOutlineBuildingOffice2 className="icono" />
        </div>
        <div className="nombre-icono-categoria">Sala de reuniones</div>
      </div>


      <div className="card-categoria  ofi-house">
        {/* <div className="fondo-icono caja-blanca-sombreada"> */}
        <div className="fondo-icono">
          <HiOutlineHome className="icono ofi-house" />
        </div>
        <div className="nombre-icono-categoria ofi-house">Office house</div>
      </div>

      <div className="card-categoria  ofi-abierta">
        {/* <div className="fondo-icono caja-blanca-sombreada"> */}
        <div className="fondo-icono">
          <HiMiniComputerDesktop className="icono ofi-abierta" />
        </div>
        <div className="nombre-icono-categoria ofi-abierta">Oficina abierta</div>
      </div>

      <FiltroCategorias></FiltroCategorias>
    </div>
  );
};
export default Categorias;

