package com.Equipo4.ProyectoIntegradorEquipo4.service;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Rol;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService implements IRolService {

    @Autowired
    private IRolRepository iRolRepository;

    @Override
    public List<Rol> findAll() {
        List<Rol> list;
        try {
            list = iRolRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(Rol rol) {
        int row;
        try {
            row = iRolRepository.save(rol);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(Rol rol) {
        int row;
        try {
            row = iRolRepository.update(rol);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try {
            row = iRolRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public Optional<Rol> findById(int id) {
        Optional<Rol> buscarPorID= iRolRepository.findById(id);
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
