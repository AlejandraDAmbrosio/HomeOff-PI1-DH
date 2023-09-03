package com.Equipo4.ProyectoIntegradorEquipo4.repository;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Puntaje;

import java.util.List;
import java.util.Optional;


public interface IPuntajeRepository {
    List<Puntaje> findAllByRecurso(int idRecurso);

    int save(Puntaje puntaje);
    Double CalculateAverageByRecurso(int idRecurso);

    /**
     * Devuelve un puntaje dado su Id
     * @param id
     * @return
     */
    Optional<Puntaje> findById(int id);

}