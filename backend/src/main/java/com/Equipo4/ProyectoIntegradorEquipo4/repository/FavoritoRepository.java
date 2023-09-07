package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.entities.Favorito;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.FavoritoRespuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Repository
public class FavoritoRepository implements IFavoritoRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FavoritoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<FavoritoRespuesta> findAllByRecurso(int idRecurso) {
        String SQL = "SELECT p.id, p.IdUsuario, p.IdRecurso, p.favorito, p.vigente, p.fecha_MarcacionFavorito, u.nombrecompleto AS nombreUsuario, r.Nombre AS nombreRecurso " +
                "FROM offi_Favoritos p " +
                "INNER JOIN offi_usuarios u ON p.idUsuario = u.idUsuario " +
                "INNER JOIN offi_recursos r ON p.idRecurso = r.idRecurso " +
                "WHERE p.idRecurso = ?";
        return jdbcTemplate.query(SQL, new Object[]{idRecurso}, BeanPropertyRowMapper.newInstance(FavoritoRespuesta.class));
    }

    @Override
    public int save(Favorito favorito) {
        String SQL = "INSERT INTO offi_Favoritos (idUsuario, idRecurso, favorito, vigente, fecha_MarcacionFavorito) VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        // Configura la zona horaria a UTC
        ZoneId zoneId = ZoneId.of("UTC");
        Instant instant = favorito.getFecha_MarcacionFavorito().toInstant();
        ZonedDateTime zonedDateTime = instant.atZone(zoneId);
        java.sql.Date sqlDate = java.sql.Date.valueOf(zonedDateTime.toLocalDate());

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(SQL, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, favorito.getIdUsuario());
            ps.setInt(2, favorito.getIdRecurso());
            ps.setInt(3, favorito.getFavorito());
            ps.setInt(4, favorito.getVigente());
            ps.setDate(5, sqlDate);
            return ps;
        }, keyHolder);
        return  Objects.requireNonNull(keyHolder.getKey()).intValue();
    }

    @Override
    public Optional<Favorito> findById(int id) {
        String SQL = "SELECT * FROM offi_Favoritos WHERE id= ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(Favorito.class)));
    }
}
