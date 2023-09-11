package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Recursos;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IRecursosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Optional<Recursos> findById(int id) {
        Optional<Recursos> buscarPorID= iRecursosRepository.findById(id);
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
