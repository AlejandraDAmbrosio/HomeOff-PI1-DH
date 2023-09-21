import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";

//////////////////////////
import React, { useContext, useEffect, useState } from "react";
import "./CardProducto.css";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Puntuacion from "../Genericos/Puntuaciones/Puntuacion";
import EstrellaValor from "../Genericos/Puntuaciones/EstrellaValor";
import { Stack } from "@mui/material";
import { ContextGlobal } from "../utils/global.context";
import { maxHeight } from "@mui/system";
import esFavorito from "../utils/esFavorito";

const CardProducto = ({
  title,
  url,
  id,
  descripcion,
  precio,
  categoria,
  sede,
  // tipoRecurso,
  // servicio1,
  // servicio2,
  // servicio3,
  puntuacion,
  listaFavXUserId,
}) => {
  const navigate = useNavigate();

  const {
    getPuntosPromedioXIDRecurso,
    getListaFavXUserID,
    // listaFavXUserId,
    guardarFavorito,
    postActualizarFavorito,
    actualizarFavorito,
    setActualizarFavorito,
    errorActFavoritos,
    setErrorActFavoritos,
    // userIdLogIn,
  } = useContext(ContextGlobal);
  const userId = localStorage.getItem("idUsuario");
console.log("userId", userId)
   
  const [listadoFavoritos, setListadoFavoritos] = useState([]);
  const [esFav, setEsFav] = useState(false);
  const [esFavResult, setEsFavResult] = useState(null);
  const [idFavorito, setIdFavorito] = useState(0);
  const [existeFav, setExisteFav] = useState(false);

  useEffect(() => {
    // // getListaFavXUserID(userIdLogIn);
    if (listaFavXUserId.length < 1 ) {
      setListadoFavoritos(listaFavXUserId);
    }
  }, [listadoFavoritos]);




  useEffect(() => {
    getPuntosPromedioXIDRecurso(id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Obtener la lista de favoritos del usuario
      await getListaFavXUserID(userId);
      const favResult = listaFavXUserId.find((item) => item.idRecurso === id);

      // Actualiza los estados con los valores obtenidos
      setEsFavResult(favResult);
      setIdFavorito(favResult ? favResult.id : undefined);
      setExisteFav(listaFavXUserId.some((item) => item.idRecurso === id));
      setEsFav(esFavorito(id, listaFavXUserId));
    };

    fetchData();
  }, [listadoFavoritos]);

  const [iconSize, setIconSize] = useState(1);

  const handleIconClick = (e) => {
    e.stopPropagation();

    if (!existeFav) {
      guardarFavorito(userId, id);
      getListaFavXUserID(userId);
    } else if (esFav) {
      postActualizarFavorito(idFavorito, 0, userId, id);
      getListaFavXUserID(userId);
    } else {
      postActualizarFavorito(idFavorito, 1, userId, id);
      getListaFavXUserID(userId);
    }
    setIconSize(iconSize === 1 ? 1.05 : 1);
    getListaFavXUserID(userId);
  };

  const handleClick = () => {
    navigate(`/producto/${id}`);
  };

  return (
    // <Link to={"/producto/" + id}>
    <Card
      sx={{
        width: 315,
        borderRadius: " 11px 11px 11px 11px",
        boxShadow: "1px 1px 6px #979797",
        cursor: "pointer",
      }}
    >
      <CardMedia sx={{ height: 240 }} image={url} title="imagen">
        {esFav ? (
          <FavoriteIcon
            onClick={handleIconClick}
            className="heart-icon"
            style={{
              position: "relative",
              fontSize: "30px",
              color: "red",
              top: "5%",
              left: "88%",
              cursor: "hand",
            }}
          />
        ) : (
          <FavoriteIcon
            className="heart-icon"
            onClick={handleIconClick}
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

      <div className="caja-texto-card" onClick={handleClick}>
        <CardContent style={{ height: "120px" }} onClick={handleClick}>
          <Stack direction="row" justifyContent="space-between">
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
              alignItem: "center",
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
          onClick={handleClick}
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
    // </Link>
    // </div>
  );
};

CardProducto.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  // tipoRecurso: PropTypes.string.isRequired,

  // servicio1: PropTypes.string.isRequired,
};

export default CardProducto;
