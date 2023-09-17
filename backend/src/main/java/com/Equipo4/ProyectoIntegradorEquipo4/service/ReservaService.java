package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Recursos;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Reserva;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ReservaRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Usuario;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IRecursosRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IReservaRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ReservaService implements IReservaService {


    private final IReservaRepository reservaRepository;
    private final IRecursosRepository recursosRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public ReservaService(IReservaRepository reservaRepository, IRecursosRepository recursosRepository, UsuarioRepository usuarioRepository) {
        this.reservaRepository = reservaRepository;
        this.recursosRepository = recursosRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public List<ReservaRespuesta> devolverReservaPorUsuario(Integer idUsuario) throws Exception{
        /*Reserva reserva = reservaRepository.findById(idUsuario)
                .orElseThrow(() -> new Exception("El usuario no existe"));*/
        List<ReservaRespuesta> reservas = reservaRepository.findAllByReserva(idUsuario);
        if (reservas.isEmpty()) {
            throw new Exception("El usuario no tiene reserva");
        }
        return reservas;
    }

    @Override
    public List<ReservaRespuesta> devolverReservaPorRecurso(Integer idRecurso) throws Exception {
        List<ReservaRespuesta> recursos = reservaRepository.findReservaRecurso(idRecurso);
        if (recursos.isEmpty()) {
            throw new Exception("El recurso no tiene reserva");
        }
        return recursos;
    }


    @Override
    public Reserva guardarReserva(Reserva reserva) throws Exception {
        validarReserva(reserva);

        Recursos recurso = recursosRepository.findById(reserva.getIdRecurso())
                .orElseThrow(() -> new Exception("El recurso no existe"));

        Usuario usuario = usuarioRepository.findById(reserva.getIdUsuario())
                .orElseThrow(() -> new Exception("El usuario no existe"));

        Reserva nuevaReserva = new Reserva();
        nuevaReserva.setIdUsuario(usuario.getIdUsuario());
        nuevaReserva.setInicioReserva(reserva.getInicioReserva());
        nuevaReserva.setFinalizacionReserva(reserva.getFinalizacionReserva());
        nuevaReserva.setEstadoReserva(reserva.getEstadoReserva());
        nuevaReserva.setIdRecurso(recurso.getIdRecurso());
        nuevaReserva.setNombre(reserva.getNombre());
        nuevaReserva.setApellido(reserva.getApellido());
        nuevaReserva.setEmail(reserva.getEmail());
        nuevaReserva.setFechaRealizacionReserva(reserva.getFechaRealizacionReserva());


        int resultKey = reservaRepository.save(nuevaReserva);
        nuevaReserva.setIdReserva(resultKey);
        System.out.println("INFO:" + nuevaReserva.toString());
        System.out.println("INFO:" + nuevaReserva.getIdReserva());

        return nuevaReserva;
    }



    private void validarReserva(Reserva reserva) throws Exception {
        if (reserva == null || reserva.getIdUsuario() == null || reserva.getIdRecurso() == null) {
            throw new Exception("La reserva debe contener usuario y recurso");
        }
    }


}
