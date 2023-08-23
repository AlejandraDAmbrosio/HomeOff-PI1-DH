package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Caracteristicas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CaracteristicasRepository implements ICaracteristicasRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Caracteristicas> findAll() {
        String SQL = "SELECT * FROM offi_Caracteristicas";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Caracteristicas.class));
    }

    @Override
    public int save(Caracteristicas caracteristicas) {
        String SQL ="INSERT INTO offi_Caracteristicas VALUES (?,?,?)";
        return jdbcTemplate.update(SQL, caracteristicas.getIdCaracteristica(), caracteristicas.getNombre(),caracteristicas.getLogoCaracteristica());
    }

    @Override
    public int update(Caracteristicas caracteristicas) {
        String SQL = "UPDATE offi_Caracteristicas SET Nombre=?, LogoCaracteristica=? WHERE IdCaracteristica=?";
        return jdbcTemplate.update(SQL, caracteristicas.getNombre(), caracteristicas.getLogoCaracteristica(), caracteristicas.getIdCaracteristica());
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM offi_Caracteristicas WHERE IdCaracteristica=?";
        return jdbcTemplate.update(SQL, id);
    }

    @Override
    public Optional<Caracteristicas> findById(int id) {
        String SQL = "SELECT * FROM offi_Caracteristicas WHERE IdCaracteristica=?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(Caracteristicas.class)));
    }
}
