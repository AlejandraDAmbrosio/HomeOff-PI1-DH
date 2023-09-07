package com.Equipo4.ProyectoIntegradorEquipo4.service;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.*;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IFavoritoRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.IRecursosRepository;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritoService implements IFavoritoService {

    private final IFavoritoRepository iFavoritoRepository;
    private final IRecursosRepository recursosRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public FavoritoService(IFavoritoRepository iFavoritoRepository, IRecursosRepository recursosRepository, UsuarioRepository usuarioRepository) {
        this.iFavoritoRepository = iFavoritoRepository;
        this.recursosRepository = recursosRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Favorito guardarPuntaje(Favorito favorito) throws Exception {
        validarFavorito(favorito);

        Recursos recurso = recursosRepository.findById(favorito.getIdRecurso())
                .orElseThrow(() -> new Exception("El recurso no existe"));

        Usuario usuario = usuarioRepository.findById(favorito.getIdUsuario())
                .orElseThrow(() -> new Exception("El usuario no existe"));

        Favorito nuevoFavorito = new Favorito();
        nuevoFavorito.setIdUsuario(usuario.getIdUsuario());
        nuevoFavorito.setIdRecurso(recurso.getIdRecurso());
        nuevoFavorito.setFavorito(favorito.getFavorito());
        nuevoFavorito.setFavorito(favorito.getVigente());
        nuevoFavorito.setFecha_MarcacionFavorito(favorito.getFecha_MarcacionFavorito());

        int resultKey = iFavoritoRepository.save(nuevoFavorito);
        nuevoFavorito.setId(resultKey);
        System.out.println("INFO:" + nuevoFavorito.toString());
        System.out.println("INFO:" + nuevoFavorito.getId());

        return nuevoFavorito;
    }

    @Override
    public List<FavoritoRespuesta> devolverPuntajesPorRecurso(Integer idRecurso) throws Exception {
        Favorito favorito = iFavoritoRepository.findById(idRecurso)
                .orElseThrow(() -> new Exception("El recurso no existe"));

        List<FavoritoRespuesta> favoritos = iFavoritoRepository.findAllByRecurso(idRecurso);


        if (favoritos.isEmpty()) {
            throw new Exception("El recurso no tiene valoraciones");
        }

        return favoritos;
    }

    private void validarFavorito(Favorito favorito) throws Exception {
        if (favorito == null || favorito.getVigente() == null || favorito.getFavorito() == null) {
            throw new Exception("El favorito debe contener vigencia y favorito");
        }
    }
}
