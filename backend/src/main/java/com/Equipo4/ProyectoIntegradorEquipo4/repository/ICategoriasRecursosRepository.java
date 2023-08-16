package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.model.CategoriasRecursos;

import java.util.List;

public interface ICategoriasRecursosRepository {
    public List<CategoriasRecursos> findAll();
    public int save(CategoriasRecursos categoriasRecursos);
    public int update(CategoriasRecursos categoriasRecursos);
    public int deleteById(int id);
}
