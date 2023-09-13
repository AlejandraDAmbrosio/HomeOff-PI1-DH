import React, { useState, useContext, useEffect } from "react";
import "../Components/AgregarProducto.css";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { ContextGlobal } from "../Components/utils/global.context";
import "../Components/Genericos/CardProductoSimulado.css";
import CardProductoSimulado from "../Components/Genericos/CardProductoSimulado";
import "../Components/AgregarProducto.css";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import { useParams } from "react-router-dom";

const AgregarCaracteristicas = () => {
  const { id } = useParams();

  const {
    productosBKLista,
    setProductosBKLista,
    getDatosBKLista,
    categoriasLista,
    setCategoriasLista,
    getCategoriasLista,
    caracteristicasLista,
    caracteristicasXID,
    getCaracteristicasXID,
    recursoXID,
    getRecursoXID,
  } = useContext(ContextGlobal);

  const datosRecursoXID = recursoXID;

  console.log("-Print recursoXID-- en AgregarCaracter-linea 44");
  console.log(recursoXID);

  useEffect(() => {
    getRecursoXID(id);
    getCaracteristicasXID(id);
  }, [id]);

  const [form, setForm] = useState(false);
  const [error, setError] = useState(null);
  const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] =
    useState({});

  /////// Preparar objeto para enviar al servidor    ///////

  const [formCaracteristicas, setFormCaracteristicas] = useState({
    idCaracteristica: 0,
    idRecurso: 0,
    idCaracteristicas_x_Recurso: 0,
  });

  useEffect(() => {
    if (recursoXID) {
      setFormCaracteristicas({});
    }
  }, [recursoXID]);

  //////////////////OnChanges///////////////

  const handleOptionChange = (caracteristica) => {
    setCaracteristicasSeleccionadas((prevCaracteristicas) => ({
      ...prevCaracteristicas,
      [caracteristica.idCaracteristica]:
        !prevCaracteristicas[caracteristica.idCaracteristica],
    }));
  };

  /////////handleSubmit //////
  const handleSubmitCrearProducto = async (e) => {
    e.preventDefault();

    if (formCaracteristicas != null) {
      console.log("----Info paquete enviado en nuevoProductoData---");
      console.log(formCaracteristicas);

      console.log("------------------formCaracteristicas  ------------------");
      console.log(formCaracteristicas);

      //////// Envio de info a Caracteristicas///////////////////

      const urlCaracteristicasXIdRec =
        "http://52.32.210.155:8080/auth/inter/save";

      // const caracteristicasParaEnviar = Object.keys(
      //   caracteristicasSeleccionadas
      // ).map((idCaracteristica) => ({
      //   idCaracteristica: parseInt(idCaracteristica),
      //   idRecurso: recursoXID.idRecurso,
      //   idCaracteristicas_x_Recurso: 0,
      // }));


      const caracteristicasParaEnviar = {
        idCaracteristica: 10, 
        idRecurso: 229, 
        idCaracteristicas_x_Recurso: 0, 
      };

      console.log(
        "----caracteristicasParaEnviar: --->",
        caracteristicasParaEnviar
      );

      // try {
      //   console.log("segundo Try: ------------------------------------------------>");

      //   const jsonData2 = JSON.stringify(caracteristicasParaEnviar);

      //   console.log("jsonData2", jsonData2)
      //   console.log("caracteristicasParaEnviar", caracteristicasParaEnviar)

      //   const response2 = await axios.post(
      //     urlCaracteristicasXIdRec,
      //     jsonData2,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );

      //     console.log("caracteristicasParaEnviar-----------------", jsonData2)
      //   if (response2.status == 200) {
      //     const responseData2 = await response2.data;
      //     console.log("Respuesta:", responseData2);

      //   } else {
      //     console.error(
      //       "Error en la segunda llamada a axios.post:",
      //       response2.status,
      //       response2.statusText
      //     );
      //     setError("Error en la segunda llamada a axios.post: " + error.message);
      //   }

      try {
        console.log(
          "segundo Try: ------------------------------------------------>"
        );

        const jsonData2 = JSON.stringify(caracteristicasParaEnviar);

        console.log("jsonData2", jsonData2);
        console.log("caracteristicasParaEnviar", caracteristicasParaEnviar);

        const response2 = await fetch(urlCaracteristicasXIdRec, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData2,
        });

        if (response2.status === 200) {
          const responseData2 = await response2.json();
          console.log("Respuesta:", responseData2);
        } else {
          console.error(
            "Error en la segunda llamada a fetch:",
            response2.status,
            response2.statusText
          );
          setError(
            "Error en la segunda llamada a fetch: " + response2.statusText
          );
        }
      } catch (error) {
        console.error("Error en la segunda llamada a axios.post:", error);
        setError(
          "Error en la llamada a axios.post. Fallo el intento: " + error.message
        );
      }

      /////ERROR ????////////////////////////
    } else {
      setForm(false);
    }
  };

  return (
    <div className="administracion-agre" style={{ padding: "2rem 0rem" }}>
      <div
        className="administracion-agre-titulo"
        style={{ padding: "0rem 0rem" }}
      >
        Editar características por producto
      </div>
      <div className="paneles-agregar">
        <PanelAdminUser />
        <div className="division-form-preview">
          <div className="pagina-formulario-alta-producto">
            <form onSubmit={handleSubmitCrearProducto}>
              <FormControl
                // onSubmit={handleSubmitCrearProducto}
                style={{ padding: "1rem 0rem", width: "500px" }}
              >
                <div className="formularioAgregarProducto">
                  <FormGroup
                    className="formgroup-check-boxs"
                    label="Elija las caracteristicas"
                    component="fieldset"
                    style={{ maxWidth: "480px", height: "fit-content" }}
                  >
                    <FormLabel component="legend">Características</FormLabel>
                    <div className="container-check-boxs">
                      {caracteristicasLista.map((caracteristica) => (
                        <li
                          key={caracteristica.idCaracteristica}
                          style={{ listStyle: "none" }}
                          className="item-grid-check"
                        >
                          <label>
                            <Checkbox
                              type="checkbox"
                              // className="item-grid-check"
                              checked={caracteristica.checked} // Asumo que cada objeto tiene una propiedad "checked"
                              onChange={() =>
                                handleOptionChange(caracteristica)
                              }
                            />
                            {caracteristica.nombre}
                          </label>
                        </li>
                      ))}
                    </div>
                  </FormGroup>
                  {/* /////////--------------------------------////// */}
                </div>
                {form && (
                  <h5 className="msj-form-guardado">
                    Gracias !! Tu producto ha sido guardado!
                  </h5>
                )}
                {error && <div className="error-message">{error}</div>}

                <div className="boton-acceso-agregar-producto">
                  <Button
                    className="boton"
                    type="submit"
                    variant="outlined"
                    onClick={handleSubmitCrearProducto}
                  >
                    Guardar
                  </Button>

                  <Button
                    className="boton"
                    type="reset"
                    variant="outlined"
                    color="error"
                  >
                    Cancelar
                  </Button>
                </div>
              </FormControl>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarCaracteristicas;
