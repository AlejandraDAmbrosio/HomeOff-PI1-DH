package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Usuarios;

import java.util.List;
import java.util.Optional;

public interface IUsuariosRepository {

    public List<Usuarios> findAll();
    public int save(Usuarios usuarios);
    public int update(Usuarios usuarios);
    public int deleteById(int id);
    Optional<Usuarios> findById(int id);


}
