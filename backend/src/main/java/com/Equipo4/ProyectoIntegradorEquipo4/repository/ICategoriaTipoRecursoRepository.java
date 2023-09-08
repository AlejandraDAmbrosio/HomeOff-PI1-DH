package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.CategoriaTipoRecurso;

import java.util.List;
import java.util.Optional;

public interface ICategoriaTipoRecursoRepository {

    public List<CategoriaTipoRecurso> findAll();
    public int save(CategoriaTipoRecurso categoriaTipoRecurso);
    public int update(CategoriaTipoRecurso categoriaTipoRecurso);
    public int deleteById(int id);
    Optional<CategoriaTipoRecurso> findById(int id);
}
