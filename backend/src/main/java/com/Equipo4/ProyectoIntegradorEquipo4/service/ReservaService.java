package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.*;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IRecursosRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IReservaRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;


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

    @Override
    public EstadoFechaRespuesta obtenerEstadoFechasPorBuqueda(Integer idRecurso, String fechaInicialBusqueda, String fechaFinalBusqueda) throws Exception {
        EstadoFechaRespuesta estadoFechaRespuesta = new EstadoFechaRespuesta();
        estadoFechaRespuesta.setIdRecurso(idRecurso);
        estadoFechaRespuesta.setFechaInicioBusqueda(fechaInicialBusqueda);
        estadoFechaRespuesta.setFechaFinBusqueda(fechaFinalBusqueda);

        LinkedHashMap<String, String> rangoDiasEntreFechas = new LinkedHashMap<>();
        estadoFechaRespuesta.setEstadoPorFechas(rangoDiasEntreFechas);

        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        Date fechaInicio = sdf.parse(fechaInicialBusqueda);
        Date fechaFin = sdf.parse(fechaFinalBusqueda);
        Optional<Recursos> recurso = recursosRepository.findById(idRecurso);

        if (recurso.isEmpty()){
            throw new Exception("El recurso no existe");
        }
        if (fechaInicio.after(fechaFin)){
            throw new Exception("La fecha final de busqueda debe ser mayor o igual a la fecha inicial de busqueda");
        }
        // Obtiene el tiempo en milisegundos para las dos fechas
        long milisFechaInicio = fechaInicio.getTime();
        long milisFechaFin = fechaFin.getTime();
        // Calcula la diferencia en milisegundos entre las dos fechas
        long diferenciaMilisegundos = Math.abs(milisFechaFin - milisFechaInicio);
        // Calcula la cantidad de días en 4 meses (120 días)
        long diasEn4Meses = 4 * 30; // Suponiendo 30 días por mes (esto es una aproximación)
        long milisEn4Meses = diasEn4Meses * 24 * 60 * 60 * 1000L;
        // Verifica si la diferencia supera los 120 días
        if (diferenciaMilisegundos > milisEn4Meses) {
            throw new Exception("La diferencia entre las fechas supera los 120 días (4 meses).");
        }
        List<Reserva> reservasBusqueda = reservaRepository.findAllByRecursoInDatesRange(idRecurso, fechaInicio, fechaFin);

        Calendar calendario = Calendar.getInstance();
        calendario.setTime(fechaInicio);
        Date fecha = fechaInicio;

        // Define un HashMap para almacenar las fechas con su estado, inicializa las fechas como disponibles
        while (fecha.before(fechaFin) || fecha.equals(fechaFin)) {
            String fechaTexto = sdf.format(fecha);
            rangoDiasEntreFechas.put(fechaTexto, "DISPONIBLE");

            // Avanza al siguiente intervalo de tiempo
            calendario.setTime(fecha);
            calendario.add(Calendar.DAY_OF_YEAR, 1);
            fecha = calendario.getTime();
        }
        System.out.println("HashMap Inicial: "+ rangoDiasEntreFechas);

        // Recorre el rango de cada reserva y actuliza el hashmap con las fechas ocupadas
        for (Reserva reserva : reservasBusqueda) {
            Date inicioReserva = reserva.getInicioReserva();
            Date finReserva = reserva.getFinalizacionReserva();
            // Itera sobre el rango de fechas y marca como ocupada las que se superponen con reservas
            Date diaReserva = inicioReserva;
            calendario.setTime(diaReserva);
            while (diaReserva.compareTo(finReserva)<=0 && diaReserva.compareTo(fechaFin)<=0) {
                if (diaReserva.compareTo(fechaInicio)>=0) {
                    String diaReservaTexto = sdf.format(diaReserva);
                    rangoDiasEntreFechas.put(diaReservaTexto, "OCUPADO");
                }
                // Avanza al siguiente intervalo de tiempo
                calendario.setTime(diaReserva);
                calendario.add(Calendar.DAY_OF_YEAR, 1);
                diaReserva = calendario.getTime();
            }
        }

        return estadoFechaRespuesta;
    }



    private void validarReserva(Reserva reserva) throws Exception {
        if (reserva == null || reserva.getIdUsuario() == null || reserva.getIdRecurso() == null) {
            throw new Exception("La reserva debe contener usuario y recurso");
        }
    }


}
