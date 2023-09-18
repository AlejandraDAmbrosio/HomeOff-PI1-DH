package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Recursos;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Reserva;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ReservaRespuesta;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface IReservaRepository {

    public List<ReservaRespuesta> findAllByReserva(int idUsuario);
    public List<Reserva> findAllByRecursoInDatesRange(int idRecurso, Date fechaInicio, Date fechaFin);
    public Optional<Reserva> findById(int id);
    public int save(Reserva reserva);
    public int update(Reserva reserva);
}
