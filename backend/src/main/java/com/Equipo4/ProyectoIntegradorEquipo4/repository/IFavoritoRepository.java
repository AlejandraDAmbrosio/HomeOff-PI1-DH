package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Favorito;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.FavoritoRespuesta;

import java.util.List;
import java.util.Optional;

public interface IFavoritoRepository {


    List<FavoritoRespuesta> findAllByRecurso(int idRecurso);

    int save(Favorito favorito);

    Optional<Favorito> findById(int id);
}
