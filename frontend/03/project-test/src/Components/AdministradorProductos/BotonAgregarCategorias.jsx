import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const BotonAgregarCategorias = ({ onClick }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      style={{
        width: "150px",
        height: "70",
        margin: "30px",
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        width: "250px",
        aligItems: "center",
        textAlign: "center",
        onClick:{onClick}
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          width: "250px",
          aligItems: "center",
          textAlign: "center",
        }}
      >
        <AddIcon fontSize="large" />
        <Typography variant="h6" component="div" textOverflow="ellipsis">
          Agregar Categoria
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BotonAgregarCategorias;
