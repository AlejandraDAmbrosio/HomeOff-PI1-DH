package com.Equipo4.ProyectoIntegradorEquipo4.entities;

import lombok.Data;

import java.io.Serializable;

@Data
public class Caracteristicas implements Serializable {
    private int IdCaracteristica;
    private String Nombre;
    private String LogoCaracteristica;

}
