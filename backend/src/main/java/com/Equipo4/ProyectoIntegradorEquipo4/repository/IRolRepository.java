package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Rol;

import java.util.List;
import java.util.Optional;

public interface IRolRepository {

    public List<Rol> findAll();
    public int save(Rol rol);
    public int update(Rol rol);
    public int deleteById(int id);
    Optional<Rol> findById(int id);
}
