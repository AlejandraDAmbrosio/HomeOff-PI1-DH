package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Favorito;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.FavoritoRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ServiceResponse;
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

    @GetMapping("/favoritos/{IdUsuario}")
    public ResponseEntity<?> buscarPuntajeProducto(@PathVariable Integer IdUsuario) {
        try {
            List<FavoritoRespuesta> puntajes = iFavoritoService.devolverFavoritoPorUsuario(IdUsuario);
            if (puntajes.isEmpty()) {
                String mensaje = "No se encontraron favoritos para el usuario con ID: " + IdUsuario;
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
            return ResponseEntity.ok(puntajes);
        } catch (Exception e) {
            String mensaje = "Error al buscar los favoritos: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }
    @PostMapping("favoritos/save")
    public ResponseEntity<?> guardarFavorito(@RequestBody Favorito favorito) {
        try {
            Favorito resultado = iFavoritoService.guardarFavorito(favorito);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            String mensaje = "Error al guardar el favorito: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }
<<<<<<< HEAD
=======
    @PostMapping("favoritos/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Favorito favorito){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iFavoritoService.update(favorito);
        if(result ==1){
            serviceResponse.setMessage("Favorito actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
>>>>>>> 65f9a4239e4be3f90f2472c83cb66c6f03dcd7a5


}
