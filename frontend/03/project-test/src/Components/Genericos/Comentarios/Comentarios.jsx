import React from "react";
import { Stack, Typography, Divider } from "@mui/material";
import AvatarNav from "../../Navbar/AvatarNav";

const Comentarios = () => {

  return (
    <Stack style={{ width: "80%", display:"flex", marginBottom:"2rem"}}>
 

      <Typography variant="h4" style={{marginBottom:"2rem"}}>Comentarios</Typography>
      <Stack direction="column" spacing={3}  >
        <Stack direction="row" spacing={2}>
          <AvatarNav></AvatarNav>
          <Stack direction="column" spacing={0.1}>
            <Typography>Nombre User</Typography>
            <Typography>Fecha</Typography>
          </Stack>
        </Stack>
        <Typography  variant="body2">
          La oficina cumplio mis expectativas todo muy ordenado y limpio el
          ingreso fue correcto. recomiendo el lugar.{" "}
        </Typography>
        <Divider orientation="horizontal" flexItem spacing={2} />
      </Stack>
     
    </Stack>
  );
};

export default Comentarios;
