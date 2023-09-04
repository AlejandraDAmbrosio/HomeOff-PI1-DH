package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Puntaje;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.PuntajeRespuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
public class PuntajeRepository implements IPuntajeRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PuntajeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<PuntajeRespuesta> findAllByRecurso(int idRecurso) {
        String SQL = "SELECT p.IdPuntuacion, p.IdUsuario, p.IdRecurso, p.puntuacion, p.comentario, p.fecha_valoracion, u.nombrecompleto AS nombreUsuario, r.Nombre AS nombreRecurso " +
                "FROM offi_Puntuaciones p " +
                "INNER JOIN offi_usuarios u ON p.idUsuario = u.idUsuario " +
                "INNER JOIN offi_recursos r ON p.idRecurso = r.idRecurso " +
                "WHERE p.idRecurso = ?";
        return jdbcTemplate.query(SQL, new Object[]{idRecurso}, BeanPropertyRowMapper.newInstance(PuntajeRespuesta.class));
    }
    @Override
    public int save(Puntaje puntaje) {
        String SQL = "INSERT INTO offi_Puntuaciones (idUsuario, idRecurso, puntuacion, comentario, fecha_valoracion) VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        // Configura la zona horaria a UTC
        ZoneId zoneId = ZoneId.of("UTC");
        Instant instant = puntaje.getFecha_valoracion().toInstant();
        ZonedDateTime zonedDateTime = instant.atZone(zoneId);
        java.sql.Date sqlDate = java.sql.Date.valueOf(zonedDateTime.toLocalDate());

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(SQL, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, puntaje.getIdUsuario());
            ps.setInt(2, puntaje.getIdRecurso());
            ps.setInt(3, puntaje.getPuntuacion());
            ps.setString(4, puntaje.getComentario());
            ps.setDate(5, sqlDate);
            return ps;
        }, keyHolder);
        return  Objects.requireNonNull(keyHolder.getKey()).intValue();
    }
    /*public int save(Puntaje puntaje) {
        String SQL = "INSERT INTO offi_Puntuaciones (idUsuario, idRecurso, puntuacion, comentario, fecha_valoracion) VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(SQL, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, puntaje.getIdUsuario());
            ps.setInt(2, puntaje.getIdRecurso());
            ps.setInt(3, puntaje.getPuntuacion());
            ps.setString(4, puntaje.getComentario());
            ps.setDate(5, new java.sql.Date(puntaje.getFecha_valoracion().getTime()));
            return ps;
        }, keyHolder);
        return  Objects.requireNonNull(keyHolder.getKey()).intValue();
    }*/

    @Override
    public Double calculateAverageByRecurso(int idRecurso) {
        String SQL = "SELECT AVG(puntuacion) FROM offi_Puntuaciones WHERE idRecurso = ?";
        return jdbcTemplate.queryForObject(SQL, new Object[]{idRecurso}, Double.class);
    }

    @Override
    public Optional<Puntaje> findById(int id) {
        String SQL = "SELECT * FROM offi_Puntuaciones WHERE idPuntuaciones = ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(Puntaje.class)));
    }
}