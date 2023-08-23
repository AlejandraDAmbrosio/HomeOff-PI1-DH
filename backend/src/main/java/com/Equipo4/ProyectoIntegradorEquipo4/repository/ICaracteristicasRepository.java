package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Caracteristicas;

import java.util.List;
import java.util.Optional;

public interface ICaracteristicasRepository {
    public List<Caracteristicas> findAll();
    public int save(Caracteristicas caracteristicas);
    public int update(Caracteristicas caracteristicas);
    public int deleteById(int id);
    Optional<Caracteristicas> findById(int id);


}
