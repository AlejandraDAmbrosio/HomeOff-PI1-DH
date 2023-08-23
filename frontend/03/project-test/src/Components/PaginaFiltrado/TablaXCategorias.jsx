import React, { useState, useEffect, useContext } from "react";
import PanelFiltrado from "./PanelFiltrado";
import { Container } from "@mui/material";
import { ContextGlobal } from "../utils/global.context";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const TablaXCategorias = ({ productos }) => {
  const {
    productosBKLista,
    setProductosBKLista,
    getDatosBKLista,
    categoriasLista,
    setCategoriasLista,
    getCategoriasLista,
  } = useContext(ContextGlobal);

  useEffect(() => {
    getDatosBKLista();
  }, []);
  console.log(" ---------------------------------- productos Lista recibida por parametros ya filtrada");
  console.log(productos);







  return (
    <div>
      <Container>
      
        {productos.map((producto) => (
         
          <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={producto.imagenURL}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {producto.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {producto.descripción}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

     
        ))}
      </Container>
    </div>
  );
};

export default TablaXCategorias;
