import React from "react";
import {
  Stack,
  Typography,
} from "@mui/material";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";


const EstrellaValor = ({puntuacion}) => {
//   const [valorEstrellas, setValorEstrellas] = useState(null);

// setValorEstrellas(puntuacion);

  return (
    <Stack
      direction="row"
      spacing={0.1}
      alignContent="center"
      textAlign="center"
      // flexItem
      height="32px"
    >
      {" "}
      {puntuacion > 0 ? (
        <Stack
          direction="row"
          spacing={0.5}
          alignContent="center"
          textAlign="center"
          flexitem
          height="32px"
        >
          {" "}
          <AiFillStar style={{ fontSize: "25px", color: "#F2C84B" }} />{" "}
          <Typography  style={{ marginBottom: "2rem", fontSize:"18px" }}>
            {puntuacion.toFixed(1)}
          </Typography>
        </Stack>
      ) : (
        <Stack
        direction="row"
        spacing={0.1}
        alignContent="center"
        textAlign="center"
        flexitem
        height="32px"
      >
        {" "}
        <AiOutlineStar style={{ fontSize: "30px", color: "#717171" }} />{" "}
        <Typography variant="body2" style={{ marginBottom: "2rem" }}>
        {puntuacion}
        </Typography>
      </Stack>
      )}
      
    </Stack>
  );
};

export default EstrellaValor;
