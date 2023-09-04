import React from "react";
import "./CardProductoSimulado.css";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../ListadoDeProductos/CardProducto.css"
import { Link } from "react-router-dom";


const CardProductoSimulado = ({
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
    <Link to={"/producto/" + id}>
    <Card sx={{ width: 320,/* height: 440, */borderRadius:" 11px 11px 11px 11px" }}>
      <CardMedia sx={{ height: 240 }} image={url} title="imagen" />
      <CardContent style={{ height: "120px" }}>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          style={{ fontWeight: "600", color: "#979797" }}
        >
          {categoria}
        </Typography>
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

        <Typography variant="body2" color="text.secondary"   style={{
              color: "#383B58",
              fontSize: "14px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2, // Mostrar hasta 2 líneas
              WebkitBoxOrient: "vertical",
              paddingBottom: "5px",
              marginBottom: "5px",
            }}>
          {descripcion}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "right",
          // justifyContent: "",
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {/* <Button size="small">Share</Button> */}
        <Typography
          style={{
            color: "#000000",
            fontSize: "20px",
            fontWeight: "600",
            marginLeft: "auto",
            marginTop:"20px"
          }}
        >
          ${precio}
        </Typography>
      </CardActions>
    </Card>
  </Link>
  );
};

CardProductoSimulado.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  // tipoDeRecurso: PropTypes.number.isRequired,
  // servicio1: PropTypes.string.isRequired,
};

export default CardProductoSimulado;


//////////////////////////////


// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// //////////////////////////
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
//   categoria,
//   tipoRecurso,
//   servicio1,
//   servicio2,
//   servicio3,
// }) => {
//   return (
//     // <div className="card-body-producto">
//     <Link to={"/producto/" + id}>
//       <Card sx={{ width: 320,/* height: 440, */borderRadius:" 11px 11px 11px 11px" }}>
//         <CardMedia sx={{ height: 240 }} image={url} title="imagen" />
//         <CardContent style={{ height: "120px" }}>
//           <Typography
//             gutterBottom
//             variant="body2"
//             component="div"
//             style={{ fontWeight: "600", color: "#979797" }}
//           >
//             {categoria}
//           </Typography>
//           <Typography
//             gutterBottom
//             variant="h5"
//             component="div"
//             style={{ fontWeight: "600", color: "#383B58" }}
//           >
//             {title}
//           </Typography>
//           <Typography
//             gutterBottom
//             variant="body2"
//             component="div"
//             style={{ fontWeight: "600", color: "#383B58", alignItems:"center"}}
//           >
//             <LocationOnIcon style={{ width: 17, height: 17, marginRight:"10px" }} />
//             sede
//           </Typography>

//           <Typography variant="body2" color="text.secondary"   style={{
//               color: "#383B58",
//               fontSize: "14px"}}>
//             {descripcion}
//           </Typography>
//         </CardContent>
//         <CardActions
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             alignContent: "right",
//             // justifyContent: "",
//             vertical: 'bottom',
//             horizontal: 'right',
//           }}
//         >
//           {/* <Button size="small">Share</Button> */}
//           <Typography
//             style={{
//               color: "#000000",
//               fontSize: "20px",
//               fontWeight: "600",
//               marginLeft: "auto",
//               marginTop:"20px"
//             }}
//           >
//             ${precio}
//           </Typography>
//         </CardActions>
//       </Card>
//     </Link>
//     // </div>
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
