package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.PoliticasAlquiler;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IPoliticasAlquilerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins="*", allowedHeaders="*")
public class AuthPoliticasAlquilerController {

    @Autowired
    private IPoliticasAlquilerService iPoliticasAlquilerService;

    @GetMapping("politicas/{id}")
    public ResponseEntity<PoliticasAlquiler> list(@PathVariable int id){
        Optional<PoliticasAlquiler> buscarPorId = iPoliticasAlquilerService.findById(id);
        if (buscarPorId.isPresent()) {
            return ResponseEntity.ok(buscarPorId.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("politicas/list")
    public ResponseEntity<List<PoliticasAlquiler>> list(){
        var result=iPoliticasAlquilerService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
