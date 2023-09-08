package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Puntaje;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.PuntajeRespuesta;

import java.util.List;

public interface IPuntajeService {
    public Puntaje guardarPuntaje(Puntaje puntaje) throws Exception;
    public List<PuntajeRespuesta> devolverPuntajesPorRecurso(Integer idRecurso) throws Exception;
    public Double calculateAverageByRecurso(Integer idRecurso) throws Exception;


}