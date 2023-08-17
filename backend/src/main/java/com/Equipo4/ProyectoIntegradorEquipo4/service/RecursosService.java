package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.model.Recursos;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IRecursosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class RecursosService implements IRecursosService {

    @Autowired
    private IRecursosRepository iRecursosRepository;
    @Override
    public List<Recursos> findAll() {
        List<Recursos> list;
        try {
            list = iRecursosRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(Recursos recursos) {
        int row;
        try {
            row = iRecursosRepository.save(recursos);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(Recursos recursos) {
        int row;
        try {
            row = iRecursosRepository.update(recursos);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try {
            row = iRecursosRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }


}
