package com.Equipo4.ProyectoIntegradorEquipo4.repository;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.CategoriaTipoRecurso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CategoriaTipoRecursoRepository implements ICategoriaTipoRecursoRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<CategoriaTipoRecurso> findAll() {
        String SQL = "SELECT * FROM offi_CategoriaTipoRecurso";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(CategoriaTipoRecurso.class));
    }

    @Override
    public int save(CategoriaTipoRecurso categoriaTipoRecurso) {
        String SQL ="INSERT INTO offi_CategoriaTipoRecurso VALUES (?,?,?,?)";
        return jdbcTemplate.update(SQL, categoriaTipoRecurso.getCategoria_id(), categoriaTipoRecurso.getName(), categoriaTipoRecurso.getDescription(),categoriaTipoRecurso.getIconoCategoria());
    }

    @Override
    public int update(CategoriaTipoRecurso categoriaTipoRecurso) {
        String SQL = "UPDATE offi_CategoriaTipoRecurso SET name=?, description=?, IconoCategoria=? WHERE categoria_id=?";
        return jdbcTemplate.update(SQL, categoriaTipoRecurso.getName(), categoriaTipoRecurso.getDescription(), categoriaTipoRecurso.getIconoCategoria(), categoriaTipoRecurso.getCategoria_id());
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM offi_CategoriaTipoRecurso WHERE categoria_id=?";
        return jdbcTemplate.update(SQL, id);
    }

    @Override
    public Optional<CategoriaTipoRecurso> findById(int id) {
        String SQL = "SELECT * FROM offi_CategoriaTipoRecurso WHERE categoria_id=?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(CategoriaTipoRecurso.class)));
    }
}
