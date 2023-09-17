package com.Equipo4.ProyectoIntegradorEquipo4.service;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Usuario;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> findByID (Integer id){
        return usuarioRepository.findById(id);
    }
    public void update (Usuario usuario){
        usuarioRepository.save(usuario);
    }
    public void deletedById (Integer id){
        usuarioRepository.deleteById(id);
    }
    public List<Usuario> list(){
        return usuarioRepository.findAll();
    }


}
