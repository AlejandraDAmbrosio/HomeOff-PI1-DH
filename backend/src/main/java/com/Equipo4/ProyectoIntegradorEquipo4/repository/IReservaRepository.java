package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Reserva;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ReservaRespuesta;

import java.util.List;
import java.util.Optional;

public interface IReservaRepository {

    List<ReservaRespuesta> findAllByReserva(int idUsuario);
    Optional<Reserva> findById(int id);
    int save(Reserva reserva);
    int update(Reserva reserva);

}
