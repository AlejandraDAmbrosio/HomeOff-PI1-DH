package com.Equipo4.ProyectoIntegradorEquipo4.repository;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByUsername(String username);

    Optional<Usuario> findById(int id);

}
