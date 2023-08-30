import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";

//////////////////////////
import React from "react";
import "./CardProducto.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Puntuacion from "../Genericos/Puntuaciones/Puntuacion";
import EstrellaValor from "../Genericos/Puntuaciones/EstrellaValor";
import { Stack } from "@mui/material";




const CardProducto = ({
  title,
  url,
  id,
  descripcion,
  precio,
  categoria,
  sede,
  tipoRecurso,
  servicio1,
  servicio2,
  servicio3,
}) => {
  return (
    // <div className="card-body-producto">
    <Link to={"/producto/" + id}>
      <Card
        sx={{
          width: 315,
          /* height: 440, */ borderRadius: " 11px 11px 11px 11px",
          boxShadow: "1px 1px 6px #979797",
        }}
      >
        <CardMedia sx={{ height: 240 }} image={url} title="imagen" />
        <div className="caja-texto-card">
        <CardContent style={{ height: "120px" }}>
          <Stack direction="row" flexItem justifyContent="space-between">
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            style={{ fontWeight: "600", color: "#979797" }}
          >
            {categoria}
          </Typography>

          <EstrellaValor puntuacion={id}/>
          </Stack>
          
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontWeight: "600", color: "#383B58" }}
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            style={{
              fontWeight: "600",
              color: "#383B58",
              alignItems: "center",
            }}
          >
            <LocationOnIcon
              style={{ width: 17, height: 17, marginRight: "10px" }}
            />
            {sede}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              color: "#383B58",
              fontSize: "14px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2, // Mostrar hasta 2 líneas
              WebkitBoxOrient: "vertical",
              paddingBottom: "5px",
              marginBottom: "5px",
            }}
          >
            {descripcion}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            alignContent: "right",
            // justifyContent: "",
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          {/* <Button size="small">Share</Button> */}
          <Typography
            style={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: "600",
              marginLeft: "auto",
              marginTop: "35px",
              paddingRight: "10px",
            }}
          >
            ${precio}
          </Typography>
        </CardActions>
        </div>
      </Card>
    </Link>
    // </div>
  );
};

CardProducto.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  tipoRecurso: PropTypes.string.isRequired,

  // servicio1: PropTypes.string.isRequired,
};

export default CardProducto;

////////////////////////////////////////

// import React from "react";
// import "./CardProducto.css";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

// const CardProducto = ({
//   title,
//   url,
//   id,
//   descripcion,
//   precio,
//   tipoRecurso,
//   servicio1,
//   servicio2,
//   servicio3,
// }) => {
//   return (
//     <div className="card-body-producto">
//       <Link to={"/producto/" + id}>
//         <img className="ImgCard-producto-home" src={url} alt="Foto producto" />
//         <div className="textos-card">
//           <div className="titulo-descripcion-tipo-servicios">
//           <p className="nombre-categoria-card-producto">{descripcion}</p>

//             <h3 className="titulo-card-producto">{title}</h3>
//             <div className="descripcion-tipo">
//               <p className="descripcion-card-home p-sinmargin">{descripcion}</p>
//             </div>
//           </div>

//           <div className="precio-contenedor">
//             <p className="precio-card-home">${precio}</p>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// CardProducto.propTypes = {
//   title: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   descripcion: PropTypes.string.isRequired,
//   precio: PropTypes.number.isRequired,
//   tipoRecurso: PropTypes.string.isRequired,

//   // servicio1: PropTypes.string.isRequired,
// };

// export default CardProducto;
