package com.Equipo4.ProyectoIntegradorEquipo4.entities;


import com.Equipo4.ProyectoIntegradorEquipo4.authentication.LoginRequest;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.UsuarioRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Service
public class UsuarioEnvio {

    private final UsuarioRepository usuarioRepository;


    public int usuarioId(LoginRequest request) {
        Optional<Usuario> usuarioid = usuarioRepository.findByUsername(request.getUsername());
        Usuario usuario = usuarioid.get();
        return (usuario.getIdUsuario());
    }
    public String username1(LoginRequest request){
        Optional<Usuario> username1 = usuarioRepository.findByUsername(request.getUsername());
        Usuario usuario= username1.get();
        return (usuario.getUsername());
    }
    public Enum rol1(LoginRequest request){
        Optional<Usuario> rol1 = usuarioRepository.findByUsername(request.getUsername());
        Usuario usuario= rol1.get();
        return (usuario.getRol());
    }
    public String nombreCompleto(LoginRequest request){
        Optional<Usuario> nombreCompleto=usuarioRepository.findByUsername(request.getUsername());
        Usuario usuario= nombreCompleto.get();
        return (usuario.getNombrecompleto());
    }


}