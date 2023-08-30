import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Error from "./Components/Error";
import Detail from "./Routes/Detail";
import Screen from "./Routes/Screen";
import { ContextProvider } from "./Components/utils/global.context";
import FormIngreso from "./Routes/FormIngreso";
import FormAltaUser from "./Routes/FormAltaUser";
import AgregarProducto from "./Routes/AgregarProducto";
import AdministracionUsers from "./Routes/AdministracionUsers";

import AdministrarCategorias from "./Routes/AdministrarCategorias";
import AdministracionCaracteristicas from "./Routes/AdministracionCaracteristicas";
import AdministradorProductos from "./Routes/AdministradorProductos";
import { useEffect, useState } from "react";
import PaginaFiltrado from "./Routes/PaginaFiltrado";
import EditarProducto from "./Routes/EditarProducto";

function App() {
  ////////////////// Segmento Logueo

  /////////////////
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/screen/" element={<Screen />} />
        <Route path="/screen/:id" element={<Screen />} />
        <Route path="/producto/" element={<Detail />}>
          <Route path="/producto/:id" element={<Detail />} />
        </Route>
        <Route path="/formingreso/" element={<FormIngreso />} />
        <Route path="/formaltauser/" element={<FormAltaUser />} />
        <Route path="/agregarproducto/" element={<AgregarProducto />} />
        <Route path="/administracionusers/" element={<AdministracionUsers />} />

        <Route
          path="/administrarcategorias/"
          element={<AdministrarCategorias />}
        />
        <Route
          path="/administracioncaracteristicas/"
          element={<AdministracionCaracteristicas />}
        />
        <Route
          path="/administradorproductos/"
          element={<AdministradorProductos />}
        />

        <Route path="/paginafiltrado/" element={<PaginaFiltrado />}>
          <Route path="/paginafiltrado/:id" element={<PaginaFiltrado />} />
        </Route>

        <Route path="/editarproducto/" element={<EditarProducto />}>
          <Route path="/editarproducto/:id" element={<EditarProducto />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
