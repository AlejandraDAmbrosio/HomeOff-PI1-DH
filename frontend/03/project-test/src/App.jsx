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
import EditarUser from "./Routes/EditarUser";
import EspacioAdmin from "./Routes/EspacioAdmin";
import AdministrarCategorias from "./Routes/AdministrarCategorias";

function App() {


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
        <Route path="/editaruser/" element={<EditarUser/>} />
        <Route path="/espacioadmin/" element={<EspacioAdmin/>} />
        <Route path="/administrarcategorias/" element={<AdministrarCategorias/>} />

        

      </Routes>

      <Footer />
    </>
  );
}

export default App;
