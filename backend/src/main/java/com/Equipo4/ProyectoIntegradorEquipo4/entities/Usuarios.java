package com.Equipo4.ProyectoIntegradorEquipo4.entities;

import lombok.Data;
import java.io.Serializable;

@Data
public class Usuarios implements Serializable {

        private int IdUsuario;
        private String nombreCompleto;
        private String correo;
        private String contraseña;
        private String celular;
        private String rol;
        private String dirección;
        private String permisoEdición;
        private int id_Rol;


}
