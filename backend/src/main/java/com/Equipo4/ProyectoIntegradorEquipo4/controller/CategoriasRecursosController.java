package com.Equipo4.ProyectoIntegradorEquipo4.controller;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.CategoriasRecursos;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Rol;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.service.ICategoriasRecursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/categorias")
//@CrossOrigin("*")
@CrossOrigin(origins="*")
public class CategoriasRecursosController {

    @Autowired
    private ICategoriasRecursosService iCategoriasRecursosService;

    @GetMapping("/list")
    public ResponseEntity<List<CategoriasRecursos>> list(){
        var result=iCategoriasRecursosService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/unico/{id}")
    public ResponseEntity<CategoriasRecursos> list(@PathVariable int id){
        Optional<CategoriasRecursos> buscarPorId = iCategoriasRecursosService.findById(id);
        if (buscarPorId.isPresent()) {
            return ResponseEntity.ok(buscarPorId.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody CategoriasRecursos categoriasRecursos){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCategoriasRecursosService.save(categoriasRecursos);
        if(result ==1){
            serviceResponse.setMessage("Registro salvado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody CategoriasRecursos categoriasRecursos){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCategoriasRecursosService.update(categoriasRecursos);
        if(result ==1){
            serviceResponse.setMessage("Registro actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCategoriasRecursosService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

}
