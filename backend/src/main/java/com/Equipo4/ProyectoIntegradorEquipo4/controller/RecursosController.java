package com.Equipo4.ProyectoIntegradorEquipo4.controller;

import com.Equipo4.ProyectoIntegradorEquipo4.model.Recursos;
import com.Equipo4.ProyectoIntegradorEquipo4.model.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IRecursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/recursos")
@CrossOrigin("*")
public class RecursosController {
    @Autowired
    private IRecursosService iRecursosService;

    @GetMapping("/list")
    public ResponseEntity<List<Recursos>> list(){
        var result=iRecursosService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Recursos recursos){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iRecursosService.save(recursos);
        if(result ==1){
            serviceResponse.setMessage("Registro salvado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Recursos recursos){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iRecursosService.update(recursos);
        if(result ==1){
            serviceResponse.setMessage("Registro actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iRecursosService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }


}
