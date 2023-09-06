package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.PuntajeRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IPuntajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins="http://homeoff-dev-fe.s3-website-us-west-2.amazonaws.com/", allowedHeaders = "*")
public class AuthPuntajeController {
    @Autowired
    private IPuntajeService puntajeService;

    @GetMapping("puntaje/{IdRecurso}")
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
    @GetMapping("puntaje/{IdRecurso}/promedio")
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
