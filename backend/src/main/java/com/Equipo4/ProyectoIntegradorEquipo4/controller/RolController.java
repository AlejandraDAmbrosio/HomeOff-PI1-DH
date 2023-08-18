package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.model.Rol;
import com.Equipo4.ProyectoIntegradorEquipo4.model.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/rol")
//@CrossOrigin("*")
@CrossOrigin(origins="*")
public class RolController {

    @Autowired
    private IRolService iRolService;

    @GetMapping("/list")
    public ResponseEntity<List<Rol>> list(){
        var result=iRolService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Rol rol){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iRolService.save(rol);
        if(result ==1){
            serviceResponse.setMessage("Registro salvado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Rol rol){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iRolService.update(rol);
        if(result ==1){
            serviceResponse.setMessage("Registro actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iRolService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }









}
