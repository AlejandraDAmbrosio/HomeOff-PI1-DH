package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Categorias_x_Recurso;
import com.Equipo4.ProyectoIntegradorEquipo4.service.ICategorias_x_RecursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("auth")
//@CrossOrigin("*")
@CrossOrigin(origins="*")
public class AuthCategoriasRecursosController {

    @Autowired
    private ICategorias_x_RecursosService iCategoriasXRecursosService;

    @GetMapping("categorias/list")
    public ResponseEntity<List<Categorias_x_Recurso>> list(){
        var result= iCategoriasXRecursosService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("categorias/{id}")
    public ResponseEntity<Categorias_x_Recurso> list(@PathVariable int id){
        Optional<Categorias_x_Recurso> buscarPorId = iCategoriasXRecursosService.findById(id);
        if (buscarPorId.isPresent()) {
            return ResponseEntity.ok(buscarPorId.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
