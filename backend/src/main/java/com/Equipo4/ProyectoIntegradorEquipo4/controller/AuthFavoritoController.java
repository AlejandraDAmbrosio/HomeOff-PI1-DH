package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.FavoritoRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IFavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins="*", allowedHeaders="*")
public class AuthFavoritoController {

    @Autowired
    private IFavoritoService iFavoritoService;

    @GetMapping("/favoritos/{IdRecurso}")
    public ResponseEntity<?> buscarPuntajeProducto(@PathVariable Integer IdRecurso) {
        try {
            List<FavoritoRespuesta> puntajes = iFavoritoService.devolverPuntajesPorRecurso(IdRecurso);
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


}
