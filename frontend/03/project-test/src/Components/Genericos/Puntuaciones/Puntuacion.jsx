import React, { useState } from "react";
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


const Puntuacion = (props) => {
  const [valorEstrellas, setValorEstrellas] = useState(null);

  return (
    <Stack direction="column" spacing={2}>
 
      <Stack direction="row" spacing={0.1} alignContent="center"  textAlign="center" flexItem height="32px">
        {" "}
        <MdStarRate style={{ fontSize: "30px", color: "#F2C84B" }} />

        {[...new Array(5)].map((star, index) => {
          return index < props.valorEstrellas ? (
            <MdStarRate style={{ fontSize: "30px", color: "#F2C84B" }} />
          ) : (
            <MdOutlineStarRate style={{ fontSize: "30px", color: "#717171" }} />
          );
        })}
       
        <Typography style={{ fontSize: "22px"}}>{valorEstrellas} puntos</Typography>
      </Stack>

     
    </Stack>
  );
};

export default Puntuacion;
