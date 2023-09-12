package com.Equipo4.ProyectoIntegradorEquipo4.controller;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Puntaje;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.PuntajeRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IPuntajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/puntajes")
@CrossOrigin(origins="*", allowedHeaders="*")

public class PuntajeController {
    @Autowired
    private IPuntajeService puntajeService;


    @PostMapping("/save")

    public ResponseEntity<?> guardarPuntaje(@RequestBody Puntaje puntaje) {
        try {
            Puntaje resultado = puntajeService.guardarPuntaje(puntaje);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            String mensaje = "Error al guardar el puntaje: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }

    @GetMapping("/recurso/{IdRecurso}")
    public ResponseEntity<?> buscarPuntajeProducto(@PathVariable Integer IdRecurso) {
        try {
            List<PuntajeRespuesta> puntajes = puntajeService.devolverPuntajesPorRecurso(IdRecurso);
            if (puntajes.isEmpty()) {
                String mensaje = "No se encontraron puntajes para el producto con ID: " + IdRecurso;
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
            return ResponseEntity.ok(puntajes);
        } catch (Exception e) {
            String mensaje = "Error al buscar los puntajes: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }

    @GetMapping("/recurso/{IdRecurso}/promedio")

    public ResponseEntity<?> calcularPromedioPuntajesPorRecurso(@PathVariable Integer IdRecurso) {
        try {
            Double promedio = puntajeService.calculateAverageByRecurso(IdRecurso);
            if (promedio == null) {

                String mensaje = "No se encontraron puntajes para el producto con ID: " + IdRecurso;

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
            return ResponseEntity.ok(promedio);
        } catch (Exception e) {

            String mensaje = "Error al calcular el promedio de puntajes: " + e.getMessage();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }
}