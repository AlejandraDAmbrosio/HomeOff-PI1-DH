import React, { useState,useContext } from "react";

import { ContextGlobal } from "../../utils/global.context";
import {
  Container,
  Box,
  Paper,
  Modal,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { MdStarRate, MdOutlineStarRate } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Puntuacion from "./Puntuacion";

const EstrellaValor = ({puntuacion}) => {
  const { getPuntosPromedioXIDRecurso } =
  useContext(ContextGlobal);
//   const [valorEstrellas, setValorEstrellas] = useState(null);

// setValorEstrellas(puntuacion);

  return (
    <Stack
      direction="row"
      spacing={0.1}
      alignContent="center"
      textAlign="center"
      flexItem
      height="32px"
    >
      {" "}
      {((puntuacion > 0) ||( puntuacion !== null))? (
        <Stack
          direction="row"
          spacing={0.5}
          alignContent="center"
          textAlign="center"
          flexItem
          height="32px"
        >
          {" "}
          <AiFillStar style={{ fontSize: "25px", color: "#F2C84B" }} />{" "}
          <Typography  style={{ marginBottom: "2rem", fontSize:"18px" }}>
            {puntuacion}
          </Typography>
        </Stack>
      ) : (
        <Stack
        direction="row"
        spacing={0.1}
        alignContent="center"
        textAlign="center"
        flexItem
        height="32px"
      >
        {" "}
        <AiOutlineStar style={{ fontSize: "30px", color: "#717171" }} />{" "}
        <Typography variant="body2" style={{ marginBottom: "2rem" }}>
        {puntuacion.toFixed(1)}
        </Typography>
      </Stack>
      )}
      
    </Stack>
  );
};

export default EstrellaValor;
