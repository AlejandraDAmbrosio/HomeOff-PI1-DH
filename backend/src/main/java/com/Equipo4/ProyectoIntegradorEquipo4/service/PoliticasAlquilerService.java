package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.PoliticasAlquiler;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IPoliticasAlquilerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PoliticasAlquilerService implements IPoliticasAlquilerService {


    @Autowired
    private IPoliticasAlquilerRepository iPoliticasAlquilerRepository;


    @Override
    public List<PoliticasAlquiler> findAll() {
        List<PoliticasAlquiler> list;
        try {
            list = iPoliticasAlquilerRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(PoliticasAlquiler politicasAlquiler) {
        int row;
        try {
            row = iPoliticasAlquilerRepository.save(politicasAlquiler);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(PoliticasAlquiler politicasAlquiler) {
        int row;
        try {
            row = iPoliticasAlquilerRepository.update(politicasAlquiler);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try {
            row = iPoliticasAlquilerRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public Optional<PoliticasAlquiler> findById(int id) {
        Optional<PoliticasAlquiler> buscarPorID= iPoliticasAlquilerRepository.findById(id);
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
