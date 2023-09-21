package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Caracteristicas;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.ICaracteristicasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicasService implements ICaracteristicasService{

    @Autowired
    private ICaracteristicasRepository iCaracteristicasRepository;

    @Override
    public List<Caracteristicas> findAll() {
        List<Caracteristicas> list;
        try {
            list = iCaracteristicasRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(Caracteristicas caracteristicas) {
        int row;
        try {
            row = iCaracteristicasRepository.save(caracteristicas);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(Caracteristicas caracteristicas) {
        int row;
        try {
            row = iCaracteristicasRepository.update(caracteristicas);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try {
            row = iCaracteristicasRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public Optional<Caracteristicas> findById(int id) {
        Optional<Caracteristicas> buscarPorID= iCaracteristicasRepository.findById(id);
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
