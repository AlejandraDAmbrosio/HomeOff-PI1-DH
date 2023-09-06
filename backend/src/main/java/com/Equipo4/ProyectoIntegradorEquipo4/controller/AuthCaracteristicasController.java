package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Caracteristicas;
import com.Equipo4.ProyectoIntegradorEquipo4.service.ICaracteristicasService;
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
public class AuthCaracteristicasController {

    @Autowired
    private ICaracteristicasService iCaracteristicasService;

    @GetMapping("caracteristicas/list")
    public ResponseEntity<List<Caracteristicas>> list(){
        var result=iCaracteristicasService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("caracteristicas/{id}")
    public ResponseEntity<Caracteristicas> list(@PathVariable int id){
        Optional<Caracteristicas> buscarPorId = iCaracteristicasService.findById(id);
        if (buscarPorId.isPresent()) {
            return ResponseEntity.ok(buscarPorId.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
