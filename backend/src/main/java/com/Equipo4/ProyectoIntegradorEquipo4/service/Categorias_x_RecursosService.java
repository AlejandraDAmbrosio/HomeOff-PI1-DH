package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Categorias_x_Recurso;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Categorias_x_RecursoRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.PuntajeRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Recursos;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.ICaracteristicasRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.ICategorias_x_RecursosRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IRecursosRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Data
@Service
public class Categorias_x_RecursosService implements ICategorias_x_RecursosService {

    @Autowired
    private ICategorias_x_RecursosRepository iCategorias_x_recursosRepository;
    private final IRecursosRepository iRecursosRepository;
    private final ICaracteristicasRepository iCaracteristicasRepository;

    @Override
    public List<Categorias_x_Recurso> findAll() {
        List<Categorias_x_Recurso> list;
        try {
            list = iCategorias_x_recursosRepository.findAll();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }

    @Override
    public int save(Categorias_x_Recurso categoriasXRecurso) {
        int row;
        try {
            row = iCategorias_x_recursosRepository.save(categoriasXRecurso);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int update(Categorias_x_Recurso categoriasXRecurso) {
        int row;
        try {
            row = iCategorias_x_recursosRepository.update(categoriasXRecurso);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try {
            row = iCategorias_x_recursosRepository.deleteById(id);
        }catch (Exception ex){
            throw ex;
        }
        return row;
    }

    @Override
    public Optional<Categorias_x_Recurso> findById(int id) {
        Optional<Categorias_x_Recurso> buscarPorID= iCategorias_x_recursosRepository.findById(id);
        try {
            if (buscarPorID.isPresent()){
                return buscarPorID;
            }
        }catch (Exception ex){
            throw ex;
        }
        return buscarPorID;
    }

    @Override
    public List<Categorias_x_RecursoRespuesta> devolverPuntajesPorRecurso(Integer idRecurso) throws Exception {
        Recursos recurso = iRecursosRepository.findById(idRecurso)
                .orElseThrow(() -> new Exception("El recurso no existe"));

        List<Categorias_x_RecursoRespuesta> puntajes = iCategorias_x_recursosRepository.findAllByRecurso(idRecurso);


        if (puntajes.isEmpty()) {
            throw new Exception("El recurso no tiene caracteristicas");
        }

        return puntajes;
    }
}
