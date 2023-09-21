package com.Equipo4.ProyectoIntegradorEquipo4.authentication;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
=======
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
>>>>>>> 65f9a4239e4be3f90f2472c83cb66c6f03dcd7a5
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
<<<<<<< HEAD

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
=======
>>>>>>> 65f9a4239e4be3f90f2472c83cb66c6f03dcd7a5

    }

}