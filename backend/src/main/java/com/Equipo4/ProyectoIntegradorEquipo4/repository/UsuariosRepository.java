package com.Equipo4.ProyectoIntegradorEquipo4.repository;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UsuariosRepository  implements IUsuariosRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<Usuarios> findAll() {
        String SQL = "SELECT * FROM offi_usuarios";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Usuarios.class));
    }

    @Override
    public int save(Usuarios usuarios) {
        String SQL ="INSERT INTO offi_usuarios VALUES (?,?,?,?,?,?,?,?,?)";
        return jdbcTemplate.update(SQL, usuarios.getIdUsuario(), usuarios.getNombreCompleto(), usuarios.getCorreo(), usuarios.getContraseña(), usuarios.getCelular(), usuarios.getRol(), usuarios.getDirección(), usuarios.getPermisoEdición(), usuarios.getId_Rol());
    }

    @Override
    public int update(Usuarios usuarios) {
        String SQL = "UPDATE offi_usuarios SET nombreCompleto=?, correo=?, contraseña=?, celular=?, rol=?, dirección=?, permisoEdición=?, id_rol=? WHERE IdUsuario =?";
        return jdbcTemplate.update(SQL, usuarios.getNombreCompleto(), usuarios.getCorreo(), usuarios.getContraseña(), usuarios.getCelular(), usuarios.getRol(), usuarios.getDirección(), usuarios.getPermisoEdición(), usuarios.getId_Rol(), usuarios.getIdUsuario());
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM offi_usuarios WHERE IdUsuario=?";
        return jdbcTemplate.update(SQL, id);
    }

    @Override
    public Optional<Usuarios> findById(int id) {
        String SQL = "SELECT * FROM offi_usuarios WHERE IdUsuario=?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(Usuarios.class)));
    }


}
