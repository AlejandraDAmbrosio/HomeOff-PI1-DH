package com.Equipo4.ProyectoIntegradorEquipo4.entities;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class Reserva implements Serializable {

    private Integer IdReserva;
    private Integer IdUsuario;
    private Date InicioReserva;
    private Date FinalizacionReserva;
    private Integer EstadoReserva;
    private Integer IdRecurso;
    private String nombre;
    private String apellido;
    private String Email;
    private Date FechaRealizacionReserva;

}
