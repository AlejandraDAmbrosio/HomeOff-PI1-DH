package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Recursos;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IRecursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins="*", allowedHeaders="*")
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

    @PostMapping("recursos/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Recursos recursos){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iRecursosService.save(recursos);
        if(result ==1){
            serviceResponse.setMessage("Registro salvado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @PostMapping("recursos/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Recursos recursos){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iRecursosService.update(recursos);
        if(result ==1){
            serviceResponse.setMessage("Registro actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @PostMapping("recursos/delete/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iRecursosService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }


}
