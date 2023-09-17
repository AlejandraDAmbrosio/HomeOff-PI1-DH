import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(
        "http://52.88.220.184:8080/api/v1/usuarios/list"
      );
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const iniciarSesion = (email, password) => {
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.correo === email && usuario.contraseña === password
    );

    if (usuarioEncontrado) {
      setUsuarioLogueado(usuarioEncontrado);
      localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuarioEncontrado)
      );
    } else {
      console.log("Credenciales incorrectas");
    }
  };

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioGuardado) {
      setUsuarioLogueado(usuarioGuardado);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");
    setUsuarioLogueado(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuarioLogueado, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
};
