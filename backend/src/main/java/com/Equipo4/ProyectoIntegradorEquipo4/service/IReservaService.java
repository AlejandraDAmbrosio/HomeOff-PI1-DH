package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Reserva;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ReservaRespuesta;

import java.util.List;

public interface IReservaService {

    public List<ReservaRespuesta> devolverReservaPorUsuario(Integer idUsuario) throws Exception;
<<<<<<< HEAD
=======
    public List<ReservaRespuesta> devolverReservaPorRecurso(Integer idRecurso) throws Exception;
>>>>>>> 7b1ef48c24147540b9c69ee4232f7e7fdc07a149
    public Reserva guardarReserva(Reserva reserva) throws Exception;


}
