package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Recursos;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IRecursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("auth")
//@CrossOrigin("*")
@CrossOrigin(origins="http://homeoff-dev-fe.s3-website-us-west-2.amazonaws.com/", allowedHeaders="*")
public class AuthRecursosController {

    @Autowired
    private IRecursosService iRecursosService;
    @GetMapping("recursos/list")
    public ResponseEntity<List<Recursos>> list(){
        var result=iRecursosService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("recursos/{id}")
    public ResponseEntity<Recursos> list(@PathVariable int id){
        Optional<Recursos> buscarPorId = iRecursosService.findById(id);
        if (buscarPorId.isPresent()) {
            return ResponseEntity.ok(buscarPorId.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
