package com.Equipo4.ProyectoIntegradorEquipo4.controller;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Categorias_x_Recurso;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.service.ICategorias_x_RecursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/inter")
//@CrossOrigin("*")
@CrossOrigin(origins="*")
public class Categorias_x_RecursosController {

    @Autowired
    private ICategorias_x_RecursosService iCategorias_x_recursosService;

    @GetMapping("/list")
    public ResponseEntity<List<Categorias_x_Recurso>> list(){
        var result= iCategorias_x_recursosService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Categorias_x_Recurso> list(@PathVariable int id){
        Optional<Categorias_x_Recurso> buscarPorId = iCategorias_x_recursosService.findById(id);
        if (buscarPorId.isPresent()) {
            return ResponseEntity.ok(buscarPorId.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/save")
    public ResponseEntity<ServiceResponse> save(@RequestBody Categorias_x_Recurso categoriasXRecurso){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCategorias_x_recursosService.save(categoriasXRecurso);
        if(result ==1){
            serviceResponse.setMessage("Registro salvado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @PostMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Categorias_x_Recurso categoriasXRecurso){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCategorias_x_recursosService.update(categoriasXRecurso);
        if(result ==1){
            serviceResponse.setMessage("Registro actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCategorias_x_recursosService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

}
