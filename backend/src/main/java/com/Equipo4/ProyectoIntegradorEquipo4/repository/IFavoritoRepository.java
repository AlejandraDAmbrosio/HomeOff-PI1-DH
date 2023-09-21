package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Favorito;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.FavoritoRespuesta;

import java.util.List;
import java.util.Optional;

public interface IFavoritoRepository {


    public List<FavoritoRespuesta> findAllByUsuario(int idRecurso);

    public int save(Favorito favorito);

    public int update(Favorito favorito);

    public Optional<Favorito> findById(int id);
}
