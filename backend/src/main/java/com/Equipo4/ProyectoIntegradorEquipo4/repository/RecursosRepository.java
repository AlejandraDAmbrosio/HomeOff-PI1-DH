package com.Equipo4.ProyectoIntegradorEquipo4.repository;

import com.Equipo4.ProyectoIntegradorEquipo4.model.Recursos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class RecursosRepository implements IRecursosRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<Recursos> findAll() {
        String SQL = "SELECT * FROM offi_recursos";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Recursos.class));
    }

    @Override
    public int save(Recursos recursos) {
        String SQL ="INSERT INTO offi_recursos VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        return jdbcTemplate.update(SQL, recursos.getIdRecurso(), recursos.getNombre(), recursos.getDescripción(), recursos.getCapacidadMáxima(),recursos.getPrecioUnitario(), recursos.getIdSede(), recursos.getImagenURL(), recursos.getImagenUrl01(), recursos.getImagenUrl02(), recursos.getImagenUrl03(), recursos.getImagenUrl04(), recursos.getTipoDeRecurso(), recursos.getEstadoRecurso(), recursos.getCategoria_id());
    }

    @Override
    public int update(Recursos recursos) {
        String SQL = "UPDATE offi_recursos SET Nombre=?, Descripción=?, CapacidadMáxima=?, PrecioUnitario=?, IdSede=?, ImagenURL=?, ImagenUrl01=?, ImagenUrl02=?, ImagenUrl03=?, ImagenUrl04=?, TipoDeRecurso=?, EstadoRecurso=?, categoria_id=? WHERE IdRecurso =?";
        return jdbcTemplate.update(SQL, recursos.getNombre(), recursos.getDescripción(), recursos.getCapacidadMáxima(),recursos.getPrecioUnitario(), recursos.getIdSede(), recursos.getImagenURL(), recursos.getImagenUrl01(), recursos.getImagenUrl02(), recursos.getImagenUrl03(), recursos.getImagenUrl04(), recursos.getTipoDeRecurso(), recursos.getEstadoRecurso(), recursos.getCategoria_id(), recursos.getIdRecurso());
    }

    @Override
    public int deleteById(int id) {
        String SQL = "DELETE FROM offi_recursos WHERE IdRecurso =?";
        return jdbcTemplate.update(SQL, id);
    }



}
