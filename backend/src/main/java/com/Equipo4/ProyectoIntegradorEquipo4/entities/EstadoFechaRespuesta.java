package com.Equipo4.ProyectoIntegradorEquipo4.entities;


import lombok.Data;

import java.util.HashMap;

@Data
public class EstadoFechaRespuesta {

    private int	idRecurso;
    private String fechaInicioBusqueda;
    private String fechaFinBusqueda;
    private HashMap<String,String> estadoPorFechas;
}
