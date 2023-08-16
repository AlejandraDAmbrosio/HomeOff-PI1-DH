package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.model.CategoriasRecursos;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.ICategoriasRecursosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriasRecursosService implements ICategoriasRecursosService {

    @Autowired
    private ICategoriasRecursosRepository iCategoriasRecursosRepository;
    @Override
    public List<CategoriasRecursos> findAll() {
        List<CategoriasRecursos> list;
        try {
            list = iCategoriasRecursosRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(CategoriasRecursos categoriasRecursos) {
        int row;
        try {
            row = iCategoriasRecursosRepository.save(categoriasRecursos);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(CategoriasRecursos categoriasRecursos) {
        int row;
        try {
            row = iCategoriasRecursosRepository.update(categoriasRecursos);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try {
            row = iCategoriasRecursosRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }
}
