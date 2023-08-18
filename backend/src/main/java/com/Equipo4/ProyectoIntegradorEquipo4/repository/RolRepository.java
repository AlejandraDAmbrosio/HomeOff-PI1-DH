package com.Equipo4.ProyectoIntegradorEquipo4.repository;


import com.Equipo4.ProyectoIntegradorEquipo4.model.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RolRepository implements IRolRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Rol> findAll() {
        String SQL = "SELECT * FROM offi_roles";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Rol.class));
    }
    @Override
    public int save(Rol rol) {
        String SQL ="INSERT INTO offi_roles VALUES (?,?)";
        return jdbcTemplate.update(SQL, rol.getId_Rol(), rol.getNombreRol());
    }
    @Override
    public int update(Rol rol) {
        String SQL = "UPDATE offi_roles SET nombreRol=? WHERE id_Rol=?";
        return jdbcTemplate.update(SQL, rol.getNombreRol(), rol.getId_Rol());

    }
    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM offi_roles WHERE id_Rol =?";
        return jdbcTemplate.update(SQL, id);
    }


}
