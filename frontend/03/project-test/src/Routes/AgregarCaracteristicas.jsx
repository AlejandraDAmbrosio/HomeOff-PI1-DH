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

import { useNavigate, useParams } from "react-router-dom";

const AgregarCaracteristicas = () => {
  const navigate = useNavigate();

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

  const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);


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

  

  const handleOptionChange = async (caracteristica) => {
    try {
      const urlCaracteristicasXIdRec =
        "http://52.32.210.155:8080/auth/inter/save";

      const caracteristicasParaEnviar = {
        idCaracteristica: caracteristica.idCaracteristica,
        idRecurso: recursoXID.idRecurso,
        idCaracteristicas_x_Recurso: 0,
      };

      const jsonData = JSON.stringify(caracteristicasParaEnviar);

      const response = await axios.post(
        urlCaracteristicasXIdRec,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const responseData = await response.data;
        console.log("Respuesta:", responseData);
      } else {
        console.error(
          "Error en la llamada a axios.post:",
          response.status,
          response.statusText
        );
        setError("Error en la llamada a axios.post: " + response.statusText);
      }
    } catch (error) {
      console.error("Error en la llamada a axios.post:", error);
      setError(
        "Error en la llamada a axios.post. Fallo el intento: " + error.message
      );
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
          <FormControl
            style={{ padding: "1rem 0rem", width: "500px" }}
          >
            <div className="formularioAgregarProducto">
              <FormGroup
                className="formgroup-check-boxs"
                label="Elija las características"
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
                          checked={caracteristica.checked}
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
                type="reset"
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                Guardar
              </Button>
            </div>
          </FormControl>
        </div>
      </div>
    </div>
  </div>
);
};

export default AgregarCaracteristicas;
