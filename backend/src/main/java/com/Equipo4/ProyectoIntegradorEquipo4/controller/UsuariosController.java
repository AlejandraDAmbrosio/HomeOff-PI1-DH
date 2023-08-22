package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Rol;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ServiceResponse;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Usuarios;
import com.Equipo4.ProyectoIntegradorEquipo4.service.IUsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/usuarios")
@CrossOrigin(origins="*")
public class UsuariosController {

    @Autowired
    private IUsuariosService iUsuariosService;

    @GetMapping("/list")
    public ResponseEntity<List<Usuarios>> list(){
        var result=iUsuariosService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/unico/{id}")
    public ResponseEntity<Usuarios> list(@PathVariable int id){
        Optional<Usuarios> buscarPorId = iUsuariosService.findById(id);
        if (buscarPorId.isPresent()) {
            return ResponseEntity.ok(buscarPorId.get());
        } else {
            return ResponseEntity.notFound().build();
        }
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

    //@PostMapping("/update")
    @PutMapping("/update")
    public ResponseEntity<ServiceResponse> update(@RequestBody Usuarios usuarios){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iUsuariosService.update(usuarios);
        if(result ==1){
            serviceResponse.setMessage("Registro actualizado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }
    //@GetMapping("/delete/{id}")
    @DeleteMapping("/delete/{id}")
    //public ResponseEntity<ServiceResponse> update(@PathVariable int id){
    public ResponseEntity<ServiceResponse> delete(@PathVariable int id){
        ServiceResponse serviceResponse = new ServiceResponse();
        int result = iUsuariosService.deleteById(id);
        if(result ==1){
            serviceResponse.setMessage("Registro Borrado con exito");
        }
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }




}
