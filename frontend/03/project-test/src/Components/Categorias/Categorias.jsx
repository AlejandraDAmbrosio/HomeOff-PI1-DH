import React from "react";
import buscadorIconoCategoria from "../AdministradorProductos/Categorias/iconoXCategoria"

import "./Categorias.css";
import "./CardCategoria.css";
import CardCategoria from "./CardCategoria";
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
import { ContextGlobal } from "../utils/global.context";
import { useState, useEffect, useContext } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Categorias = ({ NombreCategoria }) => {
  const { categoriasLista, setCategoriasLista, getCategoriasLista } =
    useContext(ContextGlobal);

  useEffect(() => {
    getCategoriasLista();
  }, []);

  return (
    <div className="segmento-categorias">
      {categoriasLista.map((categoria, id) => (
        <Link to={`/paginafiltrado/${categoria.categoria_id}`}  key={categoria.categoria_id}>
          <div className="card-categoria">
            {/* <div className="fondo-icono caja-blanca-sombreada"> */}
            <div className="fondo-icono">
              {/* <HiOutlineBuildingOffice2 className="icono" /> */}
               <img
                      src={buscadorIconoCategoria(categoria.categoria_id)}
                      alt={`Imagen de ${categoria.name}`}
                      className="icono"
                      style={{
                        width: "60px",
                        height: "50px",
                        padding: "2px 0 0 0px",
                        backgroundColor:"white",
                      }}
                    />
            </div>
            <div className="nombre-icono-categoria">{categoria.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Categorias;

{
  /* <Card key={categoria.categoria_id}>
            <CardMedia>
            <HiOutlineBuildingOffice2 className="icono" />
            </CardMedia>
            <CardContent>
            <Typography variant="h7" component="div" textOverflow="ellipsis">
            {categoria.name}
            </Typography>
            </CardContent>
          </Card> */
}
