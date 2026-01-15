package com.teachei.api.adapter.in.web.controller;

import com.teachei.api.adapter.in.web.dto.request.AtualizarPerfilRequest;
import com.teachei.api.adapter.in.web.dto.response.PerfilResponse;
import com.teachei.api.application.ports.in.GerenciarPerfilUseCase;
import com.teachei.api.config.security.CurrentUser;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/perfil")
public class PerfilController {

    private final GerenciarPerfilUseCase gerenciarPerfilUseCase;

    public PerfilController(GerenciarPerfilUseCase gerenciarPerfilUseCase) {
        this.gerenciarPerfilUseCase = gerenciarPerfilUseCase;
    }

    @GetMapping
    public ResponseEntity<PerfilResponse> meuPerfil(@AuthenticationPrincipal CurrentUser currentUser) {
        var perfil = gerenciarPerfilUseCase.buscarPorUsuario(currentUser.getId());
        return ResponseEntity.ok(PerfilResponse.fromDomain(perfil));
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<PerfilResponse> buscarPerfil(@PathVariable UUID usuarioId) {
        var perfil = gerenciarPerfilUseCase.buscarPorUsuario(usuarioId);
        return ResponseEntity.ok(PerfilResponse.fromDomain(perfil));
    }

    @PutMapping
    public ResponseEntity<PerfilResponse> atualizarPerfil(
            @AuthenticationPrincipal CurrentUser currentUser,
            @Valid @RequestBody AtualizarPerfilRequest request) {
        
        var command = new GerenciarPerfilUseCase.AtualizarPerfilCommand(
            request.nome(),
            request.bio(),
            request.whatsapp(),
            request.instagram(),
            request.facebook(),
            request.cidade(),
            request.estado()
        );

        var perfil = gerenciarPerfilUseCase.atualizar(currentUser.getId(), command);
        return ResponseEntity.ok(PerfilResponse.fromDomain(perfil));
    }
}



