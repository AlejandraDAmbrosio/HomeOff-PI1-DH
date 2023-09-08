package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Usuario;
import com.Equipo4.ProyectoIntegradorEquipo4.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins="*", allowedHeaders="*")
public class AuthUsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/usuario/list")
    public ResponseEntity<List<Usuario>> list(){
        return ResponseEntity.ok(usuarioService.list());
    }

    @GetMapping("usuario/{id}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable Integer id) {
        Optional<Usuario> usuarioBuscado = usuarioService.findByID(id);
        if (usuarioBuscado.isPresent()) {
            return ResponseEntity.ok(usuarioBuscado.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
