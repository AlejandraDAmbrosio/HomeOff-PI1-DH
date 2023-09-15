package com.Equipo4.ProyectoIntegradorEquipo4.repository;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Reserva;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.ReservaRespuesta;
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
public class ReservaRepository implements IReservaRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ReservaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<ReservaRespuesta> findAllByReserva(int idUsuario) {
        String SQL = "SELECT p.IdReserva, p.IdUsuario, p.InicioReserva, p.FinalizaciónReserva, p.EstadoReserva, p.IdRecurso, p.nombre, p.apellido, p.Email, p.FechaRealizaciónReserva , u.nombrecompleto AS nombreUsuario, r.Nombre AS nombreRecurso " +
                "FROM offi_Reservas p " +
                "INNER JOIN offi_usuarios u ON p.idUsuario = u.idUsuario " +
                "INNER JOIN offi_recursos r ON p.idRecurso = r.idRecurso " +
                "WHERE p.idUsuario = ?";
        return jdbcTemplate.query(SQL, new Object[]{idUsuario}, BeanPropertyRowMapper.newInstance(ReservaRespuesta.class));
    }
    @Override
    public int save(Reserva reserva) {
        String SQL = "INSERT INTO offi_Reservas (IdUsuario, InicioReserva, FinalizaciónReserva, EstadoReserva, IdRecurso, nombre, apellido, Email, FechaRealizaciónReserva) VALUES (?,?,?,?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        // Configura la zona horaria a UTC
        ZoneId zoneId = ZoneId.of("UTC");
        Instant inicio = reserva.getInicioReserva().toInstant();
        Instant finalizacion= reserva.getFinalizaciónReserva().toInstant();
        Instant realizacion= reserva.getFechaRealizaciónReserva().toInstant();
        ZonedDateTime inicio1 = inicio.atZone(zoneId);
        ZonedDateTime finalizacion1 = finalizacion.atZone(zoneId);
        ZonedDateTime realizacion1 = realizacion.atZone(zoneId);
        java.sql.Date sqlDate1 = java.sql.Date.valueOf(inicio1.toLocalDate());
        java.sql.Date sqlDate2 = java.sql.Date.valueOf(finalizacion1.toLocalDate());
        java.sql.Date sqlDate3 = java.sql.Date.valueOf(realizacion1.toLocalDate());

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(SQL, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, reserva.getIdUsuario());
            ps.setDate(2,sqlDate1);
            ps.setDate(3,sqlDate2);
            ps.setInt(4, reserva.getEstadoReserva());
            ps.setInt(5, reserva.getIdRecurso());
            ps.setString(6, reserva.getNombre());
            ps.setString(7, reserva.getApellido());
            ps.setString(8, reserva.getEmail());
            ps.setDate(9, sqlDate3);
            return ps;
        }, keyHolder);
        return  Objects.requireNonNull(keyHolder.getKey()).intValue();
    }

    @Override
    public int update(Reserva reserva) {
        String SQL = "UPDATE offi_Reservas SET IdUsuario=?, InicioReserva=?, FinalizaciónReserva=?, EstadoReserva=?, IdRecurso=?, nombre=?, apellido=?, Email=?, FechaRealizaciónReserva=?  WHERE IdReserva=?";
        return jdbcTemplate.update(SQL, reserva.getIdUsuario(), reserva.getInicioReserva(), reserva.getFinalizaciónReserva(), reserva.getEstadoReserva(), reserva.getIdRecurso(), reserva.getNombre(), reserva.getApellido(), reserva.getEmail(), reserva.getFechaRealizaciónReserva(), reserva.getIdReserva());
    }

    @Override
    public Optional<Reserva> findById(int id) {
        String SQL = "SELECT * FROM offi_Reservas WHERE IdReserva= ?";
        return Optional.ofNullable(jdbcTemplate.queryForObject(SQL, new Object[]{id}, BeanPropertyRowMapper.newInstance(Reserva.class)));
    }


}
