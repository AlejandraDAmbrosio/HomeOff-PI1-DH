package com.Equipo4.ProyectoIntegradorEquipo4.service;


import com.Equipo4.ProyectoIntegradorEquipo4.model.Usuarios;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IUsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosService implements IUsuariosService{

    @Autowired
    private IUsuariosRepository iUsuariosRepository;
    @Override
    public List<Usuarios> findAll() {
        List<Usuarios> list;
        try {
            list = iUsuariosRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(Usuarios usuarios) {
        int row;
        try {
            row = iUsuariosRepository.save(usuarios);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(Usuarios usuarios) {
        int row;
        try {
            row = iUsuariosRepository.update(usuarios);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try {
            row = iUsuariosRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }


}
