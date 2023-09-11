package com.Equipo4.ProyectoIntegradorEquipo4.repository;
<<<<<<< HEAD
=======

>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Puntaje;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.PuntajeRespuesta;

import java.util.List;
import java.util.Optional;

<<<<<<< HEAD

=======
>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64
public interface IPuntajeRepository {
    List<PuntajeRespuesta> findAllByRecurso(int idRecurso);

    int save(Puntaje puntaje);
    Double calculateAverageByRecurso(int idRecurso);

    /**
     * Devuelve un puntaje dado su Id
     * @param id
     * @return
     */
    Optional<Puntaje> findById(int id);

}