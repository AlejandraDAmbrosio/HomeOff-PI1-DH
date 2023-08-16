package com.Equipo4.ProyectoIntegradorEquipo4.model;

import lombok.Data;
import java.io.Serializable;

@Data
public class Recursos implements Serializable {

    private int	IdRecurso;
    private String	Nombre;
    private String	Descripción;
    private int	CapacidadMáxima;
    private Float PrecioUnitario;
    private int	IdSede;
    private String	ImagenURL;
    private String ImagenUrl01;
    private String	ImagenUrl02;
    private String	ImagenUrl03;
    private String	ImagenUrl04;
    private String TipoDeRecurso;
    private String EstadoRecurso;
    private int categoria_id;


}
