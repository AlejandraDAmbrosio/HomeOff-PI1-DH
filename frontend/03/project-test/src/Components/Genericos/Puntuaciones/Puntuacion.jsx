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


const Puntuacion = (props) => {
  const [valorEstrellas, setValorEstrellas] = useState(null);

  return (
    // <Stack direction="row" spacing={1} alignContent="right" textAlign="right" align="right">
    <Stack style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <Stack style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

      {/* <Stack direction="row" spacing={0.1} alignContent="right"  textAlign="right" align="right" flexItem height="32px" style={{width:"75%", }}> */}
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

      {/* <Divider style={{ margin: "2rem 0rem 2rem 0rem" }} flexItem /> */}
    </Stack>
  );
};

export default Puntuacion;
