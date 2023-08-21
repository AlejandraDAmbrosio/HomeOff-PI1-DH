package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Recursos;

import java.util.List;
import java.util.Optional;

public interface IRecursosService {
    public List<Recursos> findAll();
    public int save(Recursos recursos);
    public int update(Recursos recursos);
    public int deleteById(int id);
    Optional<Recursos> findById(int id);

}
