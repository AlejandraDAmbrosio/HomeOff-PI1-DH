package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Categorias_x_RecursoRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.service.ICategorias_x_RecursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("auth")
//@CrossOrigin("*")
@CrossOrigin(origins="http://homeoff-dev-fe.s3-website-us-west-2.amazonaws.com/", allowedHeaders="*")
public class AuthCategorias_x_RecursoController {


    @Autowired
    private ICategorias_x_RecursosService iCategorias_x_recursosService;
    @GetMapping("/inter/{IdRecurso}")
    public ResponseEntity<?> buscarCaracteristicaProducto(@PathVariable int IdRecurso){
        try {
            List<Categorias_x_RecursoRespuesta> puntajes = iCategorias_x_recursosService.devolverPuntajesPorRecurso(IdRecurso);
            if (puntajes.isEmpty()) {
                String mensaje = "No se encontraron puntajes para el producto con ID: " + IdRecurso;
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
            return ResponseEntity.ok(puntajes);
        } catch (Exception e) {
            String mensaje = "Error al buscar las caracteristicas: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }

}
