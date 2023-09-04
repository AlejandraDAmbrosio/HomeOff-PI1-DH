package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Usuario;
import com.Equipo4.ProyectoIntegradorEquipo4.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/usuarios")
//@CrossOrigin("*")
@CrossOrigin(origins="*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/list")
    public ResponseEntity<List<Usuario>> list(){
        return ResponseEntity.ok(usuarioService.list());
    }

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody Usuario usuario){
        Optional<Usuario> usuarioBuscado=usuarioService.findByID(usuario.getIdUsuario());
        if(usuarioBuscado.isPresent()){
            usuarioService.update(usuario);
            return ResponseEntity.ok("Usuario Actualizado");
        }
        else{
            return ResponseEntity.badRequest().body("Usuario no existe");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable Integer id) {
        Optional<Usuario> usuarioBuscado = usuarioService.findByID(id);
        if (usuarioBuscado.isPresent()) {
            return ResponseEntity.ok(usuarioBuscado.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> borrarUsuario(@PathVariable Integer id){
        Optional<Usuario> usuarioEliminar=usuarioService.findByID(id);
        if(usuarioEliminar.isPresent()){
            usuarioService.deletedById(id);
            return ResponseEntity.ok("Usuario borrado");
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

}
