package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.CategoriaTipoRecurso;

import java.util.List;
import java.util.Optional;

public interface ICategoriaTipoRecursoService {

    public List<CategoriaTipoRecurso> findAll();
    public int save(CategoriaTipoRecurso categoriaTipoRecurso);
    public int update(CategoriaTipoRecurso categoriaTipoRecurso);
    public int deleteById(int id);
    Optional<CategoriaTipoRecurso> findById(int id);


}
