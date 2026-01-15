package com.teachei.api.adapter.in.web.controller;

import com.teachei.api.adapter.in.web.dto.request.LoginRequest;
import com.teachei.api.adapter.in.web.dto.request.RegistroRequest;
import com.teachei.api.adapter.in.web.dto.response.AuthResponse;
import com.teachei.api.application.ports.in.AutenticarUsuarioUseCase;
import com.teachei.api.application.ports.in.RegistrarUsuarioUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final RegistrarUsuarioUseCase registrarUsuarioUseCase;
    private final AutenticarUsuarioUseCase autenticarUsuarioUseCase;

    public AuthController(RegistrarUsuarioUseCase registrarUsuarioUseCase,
                          AutenticarUsuarioUseCase autenticarUsuarioUseCase) {
        this.registrarUsuarioUseCase = registrarUsuarioUseCase;
        this.autenticarUsuarioUseCase = autenticarUsuarioUseCase;
    }

    @PostMapping("/registrar")
    public ResponseEntity<Map<String, String>> registrar(@Valid @RequestBody RegistroRequest request) {
        var command = new RegistrarUsuarioUseCase.RegistrarUsuarioCommand(
            request.email(),
            request.senha(),
            request.nome()
        );

        UUID usuarioId = registrarUsuarioUseCase.executar(command);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(Map.of("id", usuarioId.toString(), "message", "Usuário registrado com sucesso"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        var command = new AutenticarUsuarioUseCase.AutenticarUsuarioCommand(
            request.email(),
            request.senha()
        );

        var result = autenticarUsuarioUseCase.executar(command);

        return ResponseEntity.ok(new AuthResponse(
            result.token(),
            result.usuarioId(),
            result.email(),
            result.expiresIn()
        ));
    }
}



