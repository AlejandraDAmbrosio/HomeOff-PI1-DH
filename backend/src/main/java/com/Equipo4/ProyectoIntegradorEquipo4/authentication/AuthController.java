package com.Equipo4.ProyectoIntegradorEquipo4.authentication;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins="*", allowedHeaders="*")
public class AuthController {


    private final AuthService authService;

    /*private final JavaMailSender mail;*/

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request)
    {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {

        return ResponseEntity.ok(authService.register(request));

    }
    /*@PostMapping("correo")
    public ResponseEntity<?> enviar_correo(){

        SimpleMailMessage email= new SimpleMailMessage();
        email.setTo("halconrn1@gmail.com");
        email.setFrom("homeoff.noreply@gmail.com");
        email.setSubject("Bienvenido");
        email.setText("texto del mensaje aca va el link");
        mail.send(email);

        return new ResponseEntity<>(true, HttpStatus.OK);

    }*/


}