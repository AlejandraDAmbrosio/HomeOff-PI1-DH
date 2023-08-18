package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.model.Rol;

import java.util.List;

public interface IRolRepository {

    public List<Rol> findAll();
    public int save(Rol rol);
    public int update(Rol rol);
    public int deleteById(int id);
}
