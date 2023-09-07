package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Favorito;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.FavoritoRespuesta;

import java.util.List;

public interface IFavoritoService {


    public Favorito guardarPuntaje(Favorito favorito) throws Exception;

    public List<FavoritoRespuesta> devolverPuntajesPorRecurso(Integer idRecurso) throws Exception;


}
