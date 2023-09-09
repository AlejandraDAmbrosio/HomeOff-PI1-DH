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
import { ContextGlobal } from "../../project-test/src/Components/utils/global.context";
import AdministrarCategorias from "./Routes/AdministrarCategorias";
import AdministracionCaracteristicas from "./Routes/AdministracionCaracteristicas";
import AdministradorProductos from "./Routes/AdministradorProductos";
import { useContext, useEffect, useState } from "react";
import PaginaFiltrado from "./Routes/PaginaFiltrado";
import EditarProducto from "./Routes/EditarProducto";
import Favoritos from "./Routes/Favoritos";
import PrivateRoute from "./Components/PrivateRoute";
// import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
  ////////////////// Segmento Logueo
  const { setUsuarioLogueado, usuarioLogueado, userIdLogIn } = useContext(ContextGlobal);
  /////////////////


  useEffect(() => {
    // Verificar si hay un token en el almacenamiento local
    const token = localStorage.getItem("token");
    console.log("token en APP");

    console.log(token);

    if (token) {
      const token = localStorage.getItem("token")
      const user = localStorage.getItem("username");
      const userId = localStorage.getItem("userId");
      console.log("token en Local Storage", token);
      console.log("user en Local Storage", user);
      console.log("userId en Local Storage",userId);
      setUsuarioLogueado(user);
  
    }
  }, []);

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
     
        <Route
          path="/agregarproducto/"
          element={<PrivateRoute component={AgregarProducto} token={true} />}
        />
        <Route
          path="/administracionusers/"
          element={
            <PrivateRoute component={AdministracionUsers} token={true} />
          }
        />

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

        <Route path="/editarproducto/" element={<EditarProducto />}>
          <Route path="/editarproducto/:id" element={<EditarProducto />} />
        </Route>

        <Route path="/favoritos/" element={<Favoritos />}>
          <Route path="/favoritos/:id" element={<Favoritos />} />
        </Route>
     

      <Route path="/paginafiltrado/" element={<PaginaFiltrado />}>
        <Route path="/paginafiltrado/:id" element={<PaginaFiltrado />} />
      </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
