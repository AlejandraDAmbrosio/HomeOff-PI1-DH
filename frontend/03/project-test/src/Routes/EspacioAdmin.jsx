import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import PanelAdminUser from "../Components/AdministradorProductos/PanelAdminUser";
import EditarUser from "./EditarUser";

const EspacioAdmin = () => {
  return (
    <>
      <PanelAdminUser />
      
    </>
  );
};

export default EspacioAdmin;
