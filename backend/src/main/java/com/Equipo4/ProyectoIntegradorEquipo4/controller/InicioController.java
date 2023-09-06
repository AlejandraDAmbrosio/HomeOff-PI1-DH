package com.Equipo4.ProyectoIntegradorEquipo4.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin(origins="http://homeoff-dev-fe.s3-website-us-west-2.amazonaws.com/", allowedHeaders = "*")
public class InicioController {

    @GetMapping("/")
    public String inicio() {
        return "index";
    }

}
