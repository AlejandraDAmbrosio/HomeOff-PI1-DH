package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Puntaje;

import java.util.List;
import java.util.Optional;

public interface IPuntajeService {
    public Puntaje guardarPuntaje(Puntaje puntaje) throws Exception;
    public List<Puntaje> devolverPuntajesPorRecurso(Integer idRecurso) throws Exception;

}