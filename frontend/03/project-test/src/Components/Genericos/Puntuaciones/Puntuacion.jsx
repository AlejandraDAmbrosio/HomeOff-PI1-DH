import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Modal,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { MdStarRate, MdOutlineStarRate } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Puntuacion = ({puntaje}) => {
  const [valorEstrellas, setValorEstrellas] = useState(null);

  return (
    // <Stack direction="row" spacing={1} alignContent="right" textAlign="right" align="right">
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap:"1rem"
        

      }}
    >
      <Stack
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "0",
        }}
      >
        {[...new Array(5)].map((star, index) => {
          return index < puntaje ? (
            <AiFillStar key={index} style={{ fontSize: "35px", color: "#F2C84B" }} />
          ) : (
            <AiOutlineStar key={index} style={{ fontSize: "35px", color: "#717171" }} />
          );
        })}
      </Stack>
      <Typography style={{ fontSize: "22px", marginLeft: "1rem" }}>Puntuación</Typography>
    </Stack>
  );
};

export default Puntuacion;
