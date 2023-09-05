import { Divider, Grid, Stack, Typography } from "@mui/material";
import { width } from "@mui/system";
import React from "react";

const Politicas = () => {
  return (
    <Stack direction="column" spacing={1} style={{ width: "90%", display: "flex", marginBottom: "2rem" }}>
      <Typography variant="h4">Leer antes de reservar</Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={"center"}
        flexItem
        // divider={<Divider orientation="vertical" flexItem />}
      >
        <Grid container spacing={4} justifyContent={"space-between"} direction={{ xs: "column", sm: "row" }}>
          <Grid item xs={4}>
            <Typography variant="h6">Titulo Politica</Typography>
            <Typography variant="body2" style={{padding:"0 15px 0 0"}}>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Titulo Politica</Typography>
            <Typography variant="body2"  style={{padding:"0 15px 0 0"}}>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Titulo Politica</Typography>
            <Typography variant="body2"  style={{padding:"0 15px 0 0"}}>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Politicas;
