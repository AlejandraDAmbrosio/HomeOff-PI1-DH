package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Puntaje;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Recursos;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Usuarios;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IPuntajeRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IRecursosRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IUsuariosRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IPuntajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PuntajeService implements IPuntajeService {

    private final IPuntajeRepository puntajeRepository;
    private final IRecursosRepository recursosRepository;
    private final IUsuariosRepository usuariosRepository;

    @Autowired
    public PuntajeService(IPuntajeRepository puntajeRepository, IRecursosRepository recursosRepository, IUsuariosRepository usuariosRepository) {
        this.puntajeRepository = puntajeRepository;
        this.recursosRepository = recursosRepository;
        this.usuariosRepository = usuariosRepository;
    }

    public Puntaje guardarPuntaje(Puntaje puntaje) throws Exception {
        validarPuntaje(puntaje);

        Recursos recursos = recursosRepository.findById(puntaje.getIdRecurso())
                .orElseThrow(() -> new Exception("El recurso no existe"));

        Usuarios usuarios = usuariosRepository.findById(puntaje.getIdUsuario())
                .orElseThrow(() -> new Exception("El usuario no existe"));

        Puntaje nuevoPuntaje = new Puntaje();
        nuevoPuntaje.setIdUsuario(usuarios.getIdUsuario());
        nuevoPuntaje.setIdRecurso(recursos.getIdRecurso());
        nuevoPuntaje.setPuntuacion(puntaje.getPuntuacion());
        nuevoPuntaje.setComentario(puntaje.getComentario());
        nuevoPuntaje.setFecha_valoracion(new Date());

        puntajeRepository.save(puntaje);

        return puntaje;
    }

    public List<Puntaje> devolverPuntajesPorRecurso(Integer idRecurso) throws Exception {
        Recursos recurso = recursosRepository.findById(idRecurso)
                .orElseThrow(() -> new Exception("El recurso no existe"));

        List<Puntaje> puntajes = puntajeRepository.findAllByRecurso(idRecurso);

        if (puntajes.isEmpty()) {
            throw new Exception("El recurso no tiene valoraciones");
        }

           return puntajes;
    }

    private void validarPuntaje(Puntaje puntaje) throws Exception {
        if (puntaje == null || puntaje.getComentario() == null || puntaje.getPuntuacion() == null) {
            throw new Exception("El puntaje debe contener comentario y puntuación");
        }
    }
}