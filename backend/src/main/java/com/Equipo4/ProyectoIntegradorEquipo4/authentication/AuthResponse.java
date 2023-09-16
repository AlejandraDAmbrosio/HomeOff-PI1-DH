package com.Equipo4.ProyectoIntegradorEquipo4.authentication;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
     String token;
     int idUsuario;
     String username;
     Enum rol;
     String nombreCompleto;
}
