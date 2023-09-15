package com.Equipo4.ProyectoIntegradorEquipo4.entities;


import lombok.Data;

import java.io.Serializable;

@Data
public class PoliticasAlquiler implements Serializable {

    private int IdPoliticas;
    private String politica_uso_conducta;
    private String politica_cambio_fecha;
    private String politica_cancelacion;
    private int IdRecurso;


}
