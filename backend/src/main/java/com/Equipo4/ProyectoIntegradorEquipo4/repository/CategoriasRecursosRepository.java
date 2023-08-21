package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.CategoriasRecursos;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CategoriasRecursosRepository implements ICategoriasRecursosRepository{


    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<CategoriasRecursos> findAll() {
        String SQL = "SELECT * FROM offi_CategoriaTipoRecurso";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(CategoriasRecursos.class));
    }

    @Override
    public int save(CategoriasRecursos categoriasRecursos) {
        String SQL ="INSERT INTO offi_CategoriaTipoRecurso VALUES (?,?,?)";
        return jdbcTemplate.update(SQL, categoriasRecursos.getCategoria_id(), categoriasRecursos.getName(), categoriasRecursos.getDescription());
    }

    @Override
    public int update(CategoriasRecursos categoriasRecursos) {
        String SQL = "UPDATE offi_CategoriaTipoRecurso SET name=?, description=? WHERE categoria_id =?";
        return jdbcTemplate.update(SQL, categoriasRecursos.getName(), categoriasRecursos.getDescription(), categoriasRecursos.getCategoria_id());
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM offi_CategoriaTipoRecurso WHERE categoria_id =?";
        return jdbcTemplate.update(SQL, id);
    }

    @Override
    public Optional<CategoriasRecursos> findById(int id) {
        String SQL = "SELECT * FROM offi_CategoriaTipoRecurso WHERE categoria_id=?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(CategoriasRecursos.class)));
    }
}
