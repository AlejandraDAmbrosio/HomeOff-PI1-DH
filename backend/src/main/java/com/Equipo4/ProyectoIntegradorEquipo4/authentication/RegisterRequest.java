package com.Equipo4.ProyectoIntegradorEquipo4.authentication;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private String nombrecompleto;
    private String nombre;
    private String apellido;
    private String username;
    private String password;
    private String celular;
    private String dirección;
    private String permisoedición;


}
