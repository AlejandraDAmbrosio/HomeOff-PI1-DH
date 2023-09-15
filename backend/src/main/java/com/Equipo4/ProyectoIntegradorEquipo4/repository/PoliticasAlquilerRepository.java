package com.Equipo4.ProyectoIntegradorEquipo4.repository;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.PoliticasAlquiler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PoliticasAlquilerRepository implements IPoliticasAlquilerRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<PoliticasAlquiler> findAll() {
        String SQL = "SELECT * FROM offi_PoliticasAlquiler";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(PoliticasAlquiler.class));
    }

    @Override
    public int save(PoliticasAlquiler politicasAlquiler) {
        String SQL ="INSERT INTO offi_PoliticasAlquiler VALUES (?,?,?,?,?)";
        return jdbcTemplate.update(SQL, politicasAlquiler.getIdPoliticas(), politicasAlquiler.getPolitica_uso_conducta(), politicasAlquiler.getPolitica_cambio_fecha(), politicasAlquiler.getPolitica_cancelacion(), politicasAlquiler.getIdRecurso());
    }

    @Override
    public int update(PoliticasAlquiler politicasAlquiler) {
        String SQL = "UPDATE offi_PoliticasAlquiler SET politica_uso_conducta=?, politica_cambio_fecha=?, politica_cancelacion=?, IdRecurso=?  WHERE IdPoliticas=?";
        return jdbcTemplate.update(SQL, politicasAlquiler.getPolitica_uso_conducta(), politicasAlquiler.getPolitica_cambio_fecha(), politicasAlquiler.getPolitica_cancelacion(), politicasAlquiler.getIdRecurso(), politicasAlquiler.getIdPoliticas());
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM offi_PoliticasAlquiler WHERE IdPoliticas=?";
        return jdbcTemplate.update(SQL, id);
    }

    @Override
    public Optional<PoliticasAlquiler> findById(int id) {
        String SQL = "SELECT * FROM offi_PoliticasAlquiler WHERE IdPoliticas=?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(PoliticasAlquiler.class)));
    }
}
