package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Caracteristicas;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.service.ICaracteristicasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/caracteristicas")
@CrossOrigin(origins="*", allowedHeaders="*")
public class CaracteristicasController {

    @Autowired
    private ICaracteristicasService iCaracteristicasService;

    @GetMapping("/list")
    public ResponseEntity<List<Caracteristicas>> list(){
        var result=iCaracteristicasService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Caracteristicas> list(@PathVariable int id){
        Optional<Caracteristicas> buscarPorId = iCaracteristicasService.findById(id);
        if (buscarPorId.isPresent()) {
            return ResponseEntity.ok(buscarPorId.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Caracteristicas caracteristicas){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCaracteristicasService.save(caracteristicas);
        if(result ==1){
            serviceResponse.setMessage("Registro salvado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Caracteristicas caracteristicas){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCaracteristicasService.update(caracteristicas);
        if(result ==1){
            serviceResponse.setMessage("Registro actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCaracteristicasService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }


}
