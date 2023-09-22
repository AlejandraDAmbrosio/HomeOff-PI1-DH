package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Reserva;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ReservaRespuesta;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface IReservaRepository {

    List<ReservaRespuesta> findAllByReserva(int idUsuario);
    public List<Reserva> findAllByRecursoInDatesRange(int idRecurso, Date fechaInicio, Date fechaFin);
    List<ReservaRespuesta> findReservaRecurso(int idRecurso);
    Optional<Reserva> findById(int id);
    int save(Reserva reserva);
    int update(Reserva reserva);

}
