package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.EstadoFechaRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Reserva;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ReservaRespuesta;

import java.util.List;

public interface IReservaService {

    public List<ReservaRespuesta> devolverReservaPorUsuario(Integer idUsuario) throws Exception;
    public List<ReservaRespuesta> devolverReservaPorRecurso(Integer idRecurso) throws Exception;
    public Reserva guardarReserva(Reserva reserva) throws Exception;
    EstadoFechaRespuesta obtenerEstadoFechasPorBuqueda(Integer idRecurso, String fechaInicialBusqueda, String fechaFinalBusqueda) throws Exception;


}
