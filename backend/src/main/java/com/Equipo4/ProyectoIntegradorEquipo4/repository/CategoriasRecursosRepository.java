package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.model.CategoriasRecursos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoriasRecursosRepository implements ICategoriasRecursosRepository{


    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<CategoriasRecursos> findAll() {
        String SQL = "SELECT * FROM CategoriasRecursos";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(CategoriasRecursos.class));
    }

    @Override
    public int save(CategoriasRecursos categoriasRecursos) {
        String SQL ="INSERT INTO CategoriasRecursos VALUES (?,?,?)";
        return jdbcTemplate.update(SQL, categoriasRecursos.getCategoria_id(), categoriasRecursos.getName(), categoriasRecursos.getDescription());
    }

    @Override
    public int update(CategoriasRecursos categoriasRecursos) {
        String SQL = "UPDATE CategoriasRecursos SET name=?, description=? WHERE categoria_id =?";
        return jdbcTemplate.update(SQL, categoriasRecursos.getName(), categoriasRecursos.getDescription(), categoriasRecursos.getCategoria_id());
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM CategoriasRecursos WHERE categoria_id =?";
        return jdbcTemplate.update(SQL, id);
    }
}
