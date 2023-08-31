import React from "react";
import { Stack, Typography, Divider } from "@mui/material";
import AvatarNav from "../../Navbar/AvatarNav";

const Comentarios = () => {
  return (
    <Stack style={{ width: "80%", display: "flex", marginBottom: "2rem" }}>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>
        Comentarios
      </Typography>

      <Stack direction="column" spacing={2} style={{ marginBottom: "2rem" }}>
        <Stack direction="row" spacing={2}>
          <AvatarNav></AvatarNav>
          <Stack direction="column" spacing={0.1}>
            <Typography variant="h6">Nombre User</Typography>
            <Typography variant="body2">Fecha</Typography>
          </Stack>
        </Stack>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.{" "}
        </Typography>
      </Stack>

      <Divider orientation="horizontal" flexItem spacing={2} />
    </Stack>
  );
};

export default Comentarios;
