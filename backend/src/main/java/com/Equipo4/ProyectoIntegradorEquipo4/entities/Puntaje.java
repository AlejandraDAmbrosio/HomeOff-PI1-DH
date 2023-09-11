package com.Equipo4.ProyectoIntegradorEquipo4.entities;

import lombok.Data;
<<<<<<< HEAD
=======

>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64
import java.io.Serializable;
import java.util.Date;

@Data
public class Puntaje implements Serializable {

    private Integer idPuntuacion;
    private Integer idUsuario;
    private Integer idRecurso;
    private Integer puntuacion;
    private String comentario;
    private Date fecha_valoracion;

}
