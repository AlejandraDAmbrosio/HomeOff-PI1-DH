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
import AgregarCaracteristicas from "./Routes/AgregarCaracteristicas";
import VerReservas from "./Routes/VerReservas";
import Reservas from "./Routes/Reservas";
import ReservarXIDRecurso from "./Routes/ReservarXIDRecurso";
// import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  ////////////////// Segmento Logueo
  const { setUsuarioLogueado, usuarioLogueado, userIdLogIn, isAdmin, getDatosUsersXID } =
    useContext(ContextGlobal);
  /////////////////

  useEffect(() => {
    // Verificar si hay un token en el almacenamiento local
    const token = localStorage.getItem("token");
    // console.log("token en APP");

    // console.log(token);

    if (token) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("nombreCompleto");
      const userId = localStorage.getItem("idUsuario");
      const rol = localStorage.getItem("rol");
      const emailStorage = localStorage.getItem("username");
      const nombreCategoria = localStorage.getItem("nombreCategoria");
      // console.log("token en Local Storage", token);
      // console.log("user en Local Storage", user);
      // console.log("userId en Local Storage", userId);
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
          element={<PrivateRoute component={AgregarProducto} adminOnly={true} />}
        />
        <Route
          path="/administracionusers/"
          element={
            <PrivateRoute component={AdministracionUsers} adminOnly={true} />
          }
        />

        <Route
          path="/administrarcategorias/"
          element={
            <PrivateRoute component={AdministrarCategorias} adminOnly={true} />
          }
        />
        <Route
          path="/administracioncaracteristicas/"
          element={
            <PrivateRoute
              component={AdministracionCaracteristicas}
              adminOnly={true}
            />
          }
        />

        <Route
          path="/administradorproductos/"
          element={
            <PrivateRoute component={AdministradorProductos} adminOnly={true} />
          }
        />

        <Route
          path="/editarproducto/"
          element={<PrivateRoute component={EditarProducto} adminOnly={true} />}
        >
          <Route
            path="/editarproducto/:id"
            element={<PrivateRoute component={EditarProducto} adminOnly={true} />}
          ></Route>
        </Route>

        <Route
          path="/agregarCaracteristicas/"
          element={<PrivateRoute component={AgregarCaracteristicas} adminOnly={true} />}
        >
          <Route
            path="/agregarCaracteristicas/:id"
            element={<PrivateRoute component={AgregarCaracteristicas} adminOnly={true} />}
          ></Route>
        </Route>

{/* 
        <Route
          path="/verreservas/"
          element={<PrivateRoute component={VerReservas} adminOnly={true} />}
        >
          <Route
            path="/verreservas/:id"
            element={<PrivateRoute component={VerReservas} adminOnly={true} />}
          ></Route>
        </Route> */}


        <Route path="/verreservas/" element={<VerReservas />}>
          <Route path="/verreservas/:id" element={<VerReservas />} />
        </Route>


        {/* <Route path="/reservas/" element={<Reservas />}>
          <Route path="/reservas/:id" element={<Reservas />} />
        </Route> */}



        <Route path="/reserva/" element={<ReservarXIDRecurso />}>
          <Route path="/reserva/:id" element={<ReservarXIDRecurso />} />
        </Route>


        {/* <Route
          path="/administrarcategorias/"
          element={<AdministrarCategorias />}
        /> */}
        {/* <Route
          path="/administracioncaracteristicas/"
          element={<AdministracionCaracteristicas />}
        /> */}
        {/* <Route
          path="/administradorproductos/"
          element={<AdministradorProductos />}
        /> */}

        {/* <Route path="/editarproducto/" element={<EditarProducto />}>
          <Route path="/editarproducto/:id" element={<EditarProducto />} />
        </Route> */}

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
