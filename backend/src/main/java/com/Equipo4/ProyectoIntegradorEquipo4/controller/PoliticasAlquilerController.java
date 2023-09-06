package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.PoliticasAlquiler;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IPoliticasAlquilerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/politicas")
@CrossOrigin(origins="http://homeoff-dev-fe.s3-website-us-west-2.amazonaws.com/", allowedHeaders = "*")
public class PoliticasAlquilerController {

    @Autowired
    private IPoliticasAlquilerService iPoliticasAlquilerService;

    @GetMapping("/list")
    public ResponseEntity<List<PoliticasAlquiler>> list(){
        var result=iPoliticasAlquilerService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<PoliticasAlquiler> list(@PathVariable int id){
        Optional<PoliticasAlquiler> buscarPorId = iPoliticasAlquilerService.findById(id);
        if (buscarPorId.isPresent()) {
            return ResponseEntity.ok(buscarPorId.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody PoliticasAlquiler politicasAlquiler){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iPoliticasAlquilerService.save(politicasAlquiler);
        if(result ==1){
            serviceResponse.setMessage("Registro salvado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody PoliticasAlquiler politicasAlquiler){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iPoliticasAlquilerService.update(politicasAlquiler);
        if(result ==1){
            serviceResponse.setMessage("Registro actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iPoliticasAlquilerService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }


}
