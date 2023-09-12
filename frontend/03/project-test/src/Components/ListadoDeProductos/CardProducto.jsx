import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";

//////////////////////////
import React, { useContext, useEffect } from "react";
import "./CardProducto.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Puntuacion from "../Genericos/Puntuaciones/Puntuacion";
import EstrellaValor from "../Genericos/Puntuaciones/EstrellaValor";
import { Stack } from "@mui/material";
import { ContextGlobal } from "../utils/global.context";

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
  puntuacion,
 
  
}) => {
  const {
    getPuntosPromedioXIDRecurso,
    getListaFavXUserID,
    listaFavXUserId,
  } = useContext(ContextGlobal);
  const userId = localStorage.getItem("idUsuario");
  useEffect(() => {
    getPuntosPromedioXIDRecurso(id);
  }, [id]);

  useEffect(() => {
    getListaFavXUserID(userId);
  }, [userId]);

  const esFav = listaFavXUserId.find((item) => item.idRecurso === id);


  // console.log("idUsuario", userIdLogIn);
  // console.log("idRecurso", id);
  // console.log("listaFavXUserId", listaFavXUserId);

  // console.log("esFav", esFav, ". id producto: ",id , ". id User: ", userIdLogIn );
  // const estrellas = puntosPromedioXIDRecurso;

  return (
    <Link to={"/producto/" + id}>
      <Card
        sx={{
          width: 315,
          borderRadius: " 11px 11px 11px 11px",
          boxShadow: "1px 1px 6px #979797",
        }}
      >
        <CardMedia sx={{ height: 240 }} image={url} title="imagen">
          {esFav ? (
            <FavoriteIcon
              style={{
                position: "relative",
                fontSize: "30px",
                color: "red",
                top: "5%",
                left: "88%",
              }}
            />
          ) : (
            <FavoriteIcon
              style={{
                position: "relative",
                fontSize: "30px",
                color: "grey",
                top: "5%",
                left: "88%",
              }}
            />
          )}
        </CardMedia>

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
              <EstrellaValor puntuacion={puntuacion} />
              {/* <EstrellaValor puntuacion={estrellas} /> */}
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
                lineHeight: "15px",
              }}
            >
              <LocationOnIcon
                style={{
                  width: 17,
                  height: 16,
                  marginRight: "10px",
                  lineHeight: "15px",
                }}
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
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                paddingBottom: "1px",
                marginBottom: "1px",
                lineHeight: "15px",
              }}
            >
              {descripcion}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
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
