package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Categorias_x_Recurso;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Categorias_x_RecursoRespuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class Categorias_x_RecursosRepository implements ICategorias_x_RecursosRepository {


    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<Categorias_x_Recurso> findAll() {
        String SQL = "SELECT * FROM offi_Caracteristicas_x_Recurso";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Categorias_x_Recurso.class));
    }

    @Override
    public int save(Categorias_x_Recurso categorias_x_recurso) {
        String SQL ="INSERT INTO offi_Caracteristicas_x_Recurso VALUES (?,?,?)";
        return jdbcTemplate.update(SQL, categorias_x_recurso.getIdCaracteristicas_x_Recurso(),categorias_x_recurso.getIdRecurso(), categorias_x_recurso.getIdCaracteristica());
    }

    @Override
    public int update(Categorias_x_Recurso categorias_x_recurso) {
        String SQL = "UPDATE offi_Caracteristicas_x_Recurso SET IdRecurso=?, IdCaracteristica=? WHERE IdCaracteristicas_x_Recurso =?";
        return jdbcTemplate.update(SQL, categorias_x_recurso.getIdRecurso(), categorias_x_recurso.getIdCaracteristica(), categorias_x_recurso.getIdCaracteristicas_x_Recurso());
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM offi_Caracteristicas_x_Recurso WHERE IdCaracteristicas_x_Recurso =?";
        return jdbcTemplate.update(SQL, id);
    }

    @Override
    public Optional<Categorias_x_Recurso> findById(int id) {
        String SQL = "SELECT * FROM offi_Caracteristicas_x_Recurso WHERE IdCaracteristicas_x_Recurso=?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(Categorias_x_Recurso.class)));
    }

    @Override
    public List<Categorias_x_RecursoRespuesta> findAllByRecurso(int idRecurso) {
        String SQL = "SELECT p.IdCaracteristicas_x_Recurso, p.IdRecurso, p.IdCaracteristica, u.nombre AS nombreCaracteristica, r.Nombre AS nombreRecurso " +
                "FROM offi_Caracteristicas_x_Recurso p " +
                "INNER JOIN offi_Caracteristicas u ON p.idCaracteristica = u.idCaracteristica " +
                "INNER JOIN offi_recursos r ON p.idRecurso = r.idRecurso " +
                "WHERE p.idRecurso = ?";
        return jdbcTemplate.query(SQL, new Object[]{idRecurso}, BeanPropertyRowMapper.newInstance(Categorias_x_RecursoRespuesta.class));
    }
}
