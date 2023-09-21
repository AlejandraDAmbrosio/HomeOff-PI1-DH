package com.Equipo4.ProyectoIntegradorEquipo4.service;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Favorito;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.FavoritoRespuesta;

import java.util.List;

public interface IFavoritoService {


    public Favorito guardarFavorito(Favorito favorito) throws Exception;

    public List<FavoritoRespuesta> devolverFavoritoPorUsuario(Integer idRecurso) throws Exception;

    public int update(Favorito favorito);
}
