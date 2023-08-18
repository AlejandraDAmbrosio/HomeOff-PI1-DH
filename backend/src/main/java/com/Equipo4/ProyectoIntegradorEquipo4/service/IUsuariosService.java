package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.model.Usuarios;

import java.util.List;

public interface IUsuariosService {

    public List<Usuarios> findAll();
    public int save(Usuarios usuarios);
    public int update(Usuarios usuarios);
    public int deleteById(int id);
}
