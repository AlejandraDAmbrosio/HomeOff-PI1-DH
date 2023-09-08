package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.CategoriaTipoRecurso;
import com.Equipo4.ProyectoIntegradorEquipo4.service.ICategoriaTipoRecursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins="*", allowedHeaders="*")
public class AuthCategoriaTipoRecursoController {

    @Autowired
    private ICategoriaTipoRecursoService iCategoriaTipoRecursoService;

    @GetMapping("/categoria/list")
    public ResponseEntity<List<CategoriaTipoRecurso>> list(){
        var result=iCategoriaTipoRecursoService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/categoria/{id}")
    public ResponseEntity<CategoriaTipoRecurso> list(@PathVariable int id){
        Optional<CategoriaTipoRecurso> buscarPorId = iCategoriaTipoRecursoService.findById(id);
        if (buscarPorId.isPresent()) {
            return ResponseEntity.ok(buscarPorId.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
