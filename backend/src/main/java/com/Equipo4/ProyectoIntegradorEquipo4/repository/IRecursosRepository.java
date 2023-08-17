package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.model.Recursos;

import java.util.List;
import java.util.Optional;

public interface IRecursosRepository  {
    public List<Recursos> findAll();
    public int save(Recursos recursos);
    public int update(Recursos recursos);
    public int deleteById(int id);


}
