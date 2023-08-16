package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.model.CategoriasRecursos;


import java.util.List;

public interface ICategoriasRecursosService {
    public List<CategoriasRecursos> findAll();
    public int save(CategoriasRecursos categoriasRecursos);
    public int update(CategoriasRecursos categoriasRecursos);
    public int deleteById(int id);
}
