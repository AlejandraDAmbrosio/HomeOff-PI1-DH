package com.Equipo4.ProyectoIntegradorEquipo4.controller;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Categorias_x_Recurso;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Categorias_x_RecursoRespuesta;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.service.ICategorias_x_RecursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/inter")
@CrossOrigin(origins="*", allowedHeaders="*")
public class Categorias_x_RecursosController {

    @Autowired
    private ICategorias_x_RecursosService iCategorias_x_recursosService;

    @GetMapping("/list")
    public ResponseEntity<List<Categorias_x_Recurso>> list(){
        var result= iCategorias_x_recursosService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/{IdRecurso}")
    public ResponseEntity<?> buscarCaracteristicaProducto(@PathVariable int IdRecurso){
        try {
            List<Categorias_x_RecursoRespuesta> puntajes = iCategorias_x_recursosService.devolverPuntajesPorRecurso(IdRecurso);
            if (puntajes.isEmpty()) {
                String mensaje = "No se encontraron puntajes para el producto con ID: " + IdRecurso;
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
            return ResponseEntity.ok(puntajes);
        } catch (Exception e) {
            String mensaje = "Error al buscar las caracteristicas: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }

    @PostMapping("/save")
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
    @PostMapping("/delete/{id}")
    public ResponseEntity<ServiceResponse> update(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iCategorias_x_recursosService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

}
