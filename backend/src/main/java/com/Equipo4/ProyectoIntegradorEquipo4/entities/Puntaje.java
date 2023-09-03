package com.Equipo4.ProyectoIntegradorEquipo4.entities;

import lombok.Data;
import java.io.Serializable;
import java.util.Date;

@Data
public class Puntaje implements Serializable {

    private Integer Id_Puntuaciones;
    private Integer idUsuario;
    private Integer idRecurso;
    private Integer puntuacion;
    private String comentario;
    private Date fecha_valoracion;

}
