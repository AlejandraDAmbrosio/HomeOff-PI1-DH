package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.EstadoFechaRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Recursos;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Reserva;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ReservaRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IRecursosService;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IReservaService;
import com.Equipo4.ProyectoIntegradorEquipo4.service.RecursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/reserva")
@CrossOrigin(origins="*", allowedHeaders="*")
public class ReservaController {

    @Autowired
    private IReservaService iReservaService;
    @Autowired
    private IRecursosService iRecursosService;

    @GetMapping("/{IdUsuario}")
    public ResponseEntity<?> buscarReservaUsuario(@PathVariable Integer IdUsuario) {
        try {
            List<ReservaRespuesta> reservas = iReservaService.devolverReservaPorUsuario(IdUsuario);
            if (reservas.isEmpty()) {
                String mensaje = "No se encontraron reservas para el usuario con ID: " + IdUsuario;
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
            return ResponseEntity.ok(reservas);
        } catch (Exception e) {
            String mensaje = "Error al buscar las reservas: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> guardarReserva(@RequestBody Reserva reserva) {
        try {
            Reserva resultado = iReservaService.guardarReserva(reserva);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            String mensaje = "Error al guardar la reserva: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }

    @GetMapping("recurso/{idRecurso}/estadoFechas")
    public ResponseEntity<?> consultarFechasDisponibles(@PathVariable Integer idRecurso,
                                                        @RequestParam String fechaInicialBusqueda, @RequestParam String fechaFinalBusqueda) {
        try {
            System.out.println("Inicio busqueda de estados");
            Optional<Recursos> recurso = iRecursosService.findById(idRecurso);

            if (recurso.isEmpty()) {
                String mensaje = "No se encontró el producto con ID: " + idRecurso;
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }

            EstadoFechaRespuesta estadoFechasPorBuqueda = iReservaService.obtenerEstadoFechasPorBuqueda(idRecurso,fechaInicialBusqueda,fechaFinalBusqueda);

            return ResponseEntity.ok(estadoFechasPorBuqueda);
        } catch (Exception e) {
            String mensaje = "Error al consultar fechas disponibles: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }



}
