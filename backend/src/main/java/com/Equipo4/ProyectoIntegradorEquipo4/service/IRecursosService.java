package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.model.Recursos;

import java.util.List;

public interface IRecursosService {
    public List<Recursos> findAll();
    public int save(Recursos recursos);
    public int update(Recursos recursos);
    public int deleteById(int id);

}
