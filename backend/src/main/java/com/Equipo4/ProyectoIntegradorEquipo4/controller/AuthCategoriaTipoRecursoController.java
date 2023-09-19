package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.CategoriaTipoRecurso;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ServiceResponse;
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
    @PostMapping("categoria/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody CategoriaTipoRecurso categoriaTipoRecurso){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCategoriaTipoRecursoService.save(categoriaTipoRecurso);
        if(result ==1){
            serviceResponse.setMessage("Registro salvado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @PostMapping("categoria/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody CategoriaTipoRecurso categoriaTipoRecurso){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCategoriaTipoRecursoService.update(categoriaTipoRecurso);
        if(result ==1){
            serviceResponse.setMessage("Registro actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @PostMapping("categoria/delete/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCategoriaTipoRecursoService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }



}
