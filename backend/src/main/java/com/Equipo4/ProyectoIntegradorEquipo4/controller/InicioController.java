package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin(origins="*", allowedHeaders="*")
public class InicioController {

    @GetMapping("/")
    public String inicio() {
        return "index";
    }

}
