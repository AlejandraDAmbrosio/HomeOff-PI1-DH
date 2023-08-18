package com.Equipo4.ProyectoIntegradorEquipo4.service;


import com.Equipo4.ProyectoIntegradorEquipo4.model.Rol;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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




}
