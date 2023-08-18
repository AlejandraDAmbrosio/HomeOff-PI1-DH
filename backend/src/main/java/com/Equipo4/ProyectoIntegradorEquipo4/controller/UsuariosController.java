package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.model.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.model.Usuarios;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IUsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/usuarios")
//@CrossOrigin("*")
@CrossOrigin(origins="*")
public class UsuariosController {

    @Autowired
    private IUsuariosService iUsuariosService;

    @GetMapping("/list")
    public ResponseEntity<List<Usuarios>> list(){
        var result=iUsuariosService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Usuarios usuarios){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iUsuariosService.save(usuarios);
        if(result ==1){
            serviceResponse.setMessage("Registro salvado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Usuarios usuarios){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iUsuariosService.update(usuarios);
        if(result ==1){
            serviceResponse.setMessage("Registro actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iUsuariosService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }




}
