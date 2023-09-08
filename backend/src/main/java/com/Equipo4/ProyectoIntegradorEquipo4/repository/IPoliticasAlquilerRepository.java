package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.PoliticasAlquiler;

import java.util.List;
import java.util.Optional;

public interface IPoliticasAlquilerRepository {

    public List<PoliticasAlquiler> findAll();
    public int save(PoliticasAlquiler politicasAlquiler);
    public int update(PoliticasAlquiler politicasAlquiler);
    public int deleteById(int id);
    Optional<PoliticasAlquiler> findById(int id);

}
