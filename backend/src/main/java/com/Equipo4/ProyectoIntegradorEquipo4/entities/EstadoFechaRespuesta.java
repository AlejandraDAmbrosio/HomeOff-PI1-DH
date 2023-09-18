package com.Equipo4.ProyectoIntegradorEquipo4.entities;

import java.util.Date;
import java.util.HashMap;
import lombok.Data;
@Data
public class EstadoFechaRespuesta {
    private int	idRecurso;
    private String fechaInicioBusqueda;
    private String fechaFinBusqueda;
    private HashMap<String,String> estadoPorFechas;
}
