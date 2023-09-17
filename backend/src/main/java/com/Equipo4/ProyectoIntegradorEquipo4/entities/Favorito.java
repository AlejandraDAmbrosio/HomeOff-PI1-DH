package com.Equipo4.ProyectoIntegradorEquipo4.entities;


import lombok.Data;

import java.util.Date;

@Data
public class Favorito {

    private int id;
    private int IdUsuario;
    private int IdRecurso;
    private Integer favorito;
    private Integer vigente;
    private Date fecha_MarcacionFavorito;

}
