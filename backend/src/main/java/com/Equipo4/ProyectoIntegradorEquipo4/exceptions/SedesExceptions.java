package com.Equipo4.ProyectoIntegradorEquipo4.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SedesExceptions extends RuntimeException {
    public SedesExceptions(int id) {
        super("Producto no encontrado con ID: " + id);
    }
}