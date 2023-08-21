package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.CategoriasRecursos;


import java.util.List;
import java.util.Optional;

public interface ICategoriasRecursosService {
    public List<CategoriasRecursos> findAll();
    public int save(CategoriasRecursos categoriasRecursos);
    public int update(CategoriasRecursos categoriasRecursos);
    public int deleteById(int id);
    Optional<CategoriasRecursos> findById(int id);
}
