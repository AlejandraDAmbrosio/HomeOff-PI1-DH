package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Puntaje;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IPuntajeRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PuntajeRepository implements IPuntajeRepository {

    @Override
    public List<Puntaje> findAllByRecurso(int idRecurso) {
        return null;
    }

    @Override
    public int save(Puntaje puntaje) {
        return 0;
    }

    @Override
    public Double CalculateAverageByRecurso(int idRecurso) {
        return null;
    }

    @Override
    public Optional<Puntaje> findById(int id) {
        return Optional.empty();
    }
}