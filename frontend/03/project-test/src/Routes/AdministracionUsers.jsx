import React from "react";
import Users from "../Components/AdministradorProductos/AdminUsers/Users";
import "../Components/AdministracionUsers.css";
import PanelAdminUser from "../Components/AdministradorProductos/AdminUsers/PanelAdminUser";

const AdministracionUsers = () => {
  return (
    <div className="administracion-users">
      <div className="administracion-users-titulo">Administración Users</div>
      <div className="paneles">
        <PanelAdminUser></PanelAdminUser>
        <Users />
      </div>
    </div>
  );
};

export default AdministracionUsers;
