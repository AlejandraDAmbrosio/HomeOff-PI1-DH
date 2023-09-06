package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.CategoriaTipoRecurso;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Categorias_x_Recurso;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.ICategoriaTipoRecursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaTipoRecursoService implements ICategoriaTipoRecursoService {

    @Autowired
    private ICategoriaTipoRecursoRepository iCategoriaTipoRecursoRepository;

    @Override
    public List<CategoriaTipoRecurso> findAll() {
        List<CategoriaTipoRecurso> list;
        try {
            list = iCategoriaTipoRecursoRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(CategoriaTipoRecurso categoriaTipoRecurso) {
        int row;
        try {
            row = iCategoriaTipoRecursoRepository.save(categoriaTipoRecurso);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(CategoriaTipoRecurso categoriaTipoRecurso) {
        int row;
        try {
            row = iCategoriaTipoRecursoRepository.update(categoriaTipoRecurso);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try {
            row = iCategoriaTipoRecursoRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public Optional<CategoriaTipoRecurso> findById(int id) {
        Optional<CategoriaTipoRecurso> buscarPorID= iCategoriaTipoRecursoRepository.findById(id);
        try {
            if (buscarPorID.isPresent()){
                return buscarPorID;
            }
        }catch (Exception ex){
            throw ex;
        }
        return buscarPorID;
    }
}
