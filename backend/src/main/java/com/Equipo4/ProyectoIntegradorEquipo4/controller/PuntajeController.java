package com.Equipo4.ProyectoIntegradorEquipo4.controller;

<<<<<<< HEAD
=======

>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Puntaje;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.PuntajeRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IPuntajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
<<<<<<< HEAD
@RequestMapping("/puntajes")
@CrossOrigin
=======
@RequestMapping("api/v1/puntaje")
@CrossOrigin(origins="*", allowedHeaders="*")
>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64
public class PuntajeController {
    @Autowired
    private IPuntajeService puntajeService;

<<<<<<< HEAD
    @PostMapping
=======
    @PostMapping("/save")
>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64
    public ResponseEntity<?> guardarPuntaje(@RequestBody Puntaje puntaje) {
        try {
            Puntaje resultado = puntajeService.guardarPuntaje(puntaje);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            String mensaje = "Error al guardar el puntaje: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }

<<<<<<< HEAD
    @GetMapping("/recurso/{IdRecurso}")
=======
    @GetMapping("/{IdRecurso}")
>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64
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
<<<<<<< HEAD
    @GetMapping("/recurso/{IdRecurso}/promedio")
=======
    @GetMapping("/{IdRecurso}/promedio")
>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64
    public ResponseEntity<?> calcularPromedioPuntajesPorRecurso(@PathVariable Integer IdRecurso) {
        try {
            Double promedio = puntajeService.calculateAverageByRecurso(IdRecurso);
            if (promedio == null) {
<<<<<<< HEAD
                String mensaje = "No se encontraron puntajes para el producto con ID: " + IdRecurso;
=======
                String mensaje = "0";
>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
            return ResponseEntity.ok(promedio);
        } catch (Exception e) {
<<<<<<< HEAD
            String mensaje = "Error al calcular el promedio de puntajes: " + e.getMessage();
=======
            String mensaje = "0";
>>>>>>> d71557cc5c7f4abd16e71abc1a9769aea84fdf64
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }
}