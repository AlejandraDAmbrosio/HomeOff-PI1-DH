package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Puntaje;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.PuntajeRespuesta;

import java.util.List;
<<<<<<< HEAD
import java.util.Optional;
=======
>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64

public interface IPuntajeService {
    public Puntaje guardarPuntaje(Puntaje puntaje) throws Exception;
    public List<PuntajeRespuesta> devolverPuntajesPorRecurso(Integer idRecurso) throws Exception;
    public Double calculateAverageByRecurso(Integer idRecurso) throws Exception;


}