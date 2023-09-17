package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Reserva;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ReservaRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/reserva")
@CrossOrigin(origins="*", allowedHeaders="*")
public class ReservaController {

    @Autowired
    private IReservaService reservaService;

    @GetMapping("/{IdUsuario}")
    public ResponseEntity<?> buscarReservaUsuario(@PathVariable Integer IdUsuario) {
        try {
            List<ReservaRespuesta> reservas = reservaService.devolverReservaPorUsuario(IdUsuario);
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
            Reserva resultado = reservaService.guardarReserva(reserva);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            String mensaje = "Error al guardar la reserva: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }



}
