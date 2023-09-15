package com.Equipo4.ProyectoIntegradorEquipo4.authentication;


import com.Equipo4.ProyectoIntegradorEquipo4.entities.Rol;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.Usuario;
import com.Equipo4.ProyectoIntegradorEquipo4.entities.UsuarioEnvio;
import com.Equipo4.ProyectoIntegradorEquipo4.jwt.JwtService;
import com.Equipo4.ProyectoIntegradorEquipo4.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UsuarioEnvio usuarioEnvio;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails usuario=usuarioRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(usuario);
        int idUsuario= usuarioEnvio.usuarioId(request);
        String username= usuarioEnvio.username1(request);
        Enum rol= usuarioEnvio.rol1(request);
        String nombreCompleto= usuarioEnvio.nombreCompleto(request);
        return AuthResponse.builder()
                .token(token)
                .idUsuario(idUsuario)
                .username(username)
                .rol(rol)
                .nombreCompleto(nombreCompleto)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        Usuario usuario = Usuario.builder()
                .nombrecompleto(request.getNombrecompleto())
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .celular(request.getCelular())
                .direccion(request.getDireccion())
                .permisoedicion("EDITAR")
                .rol(Rol.CLIENTE)
                .build();

        usuarioRepository.save(usuario);

        return AuthResponse.builder()
                .token(jwtService.getToken(usuario))
                .build();

    }


}
