package com.teachei.api.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain model for User (Usuario).
 * Pure POJO without framework dependencies.
 */
public class Usuario {

    private UUID id;
    private String email;
    private String senha;
    private boolean ativo;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;

    public Usuario() {
    }

    public Usuario(UUID id, String email, String senha, boolean ativo, 
                   LocalDateTime criadoEm, LocalDateTime atualizadoEm) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
        this.criadoEm = criadoEm;
        this.atualizadoEm = atualizadoEm;
    }

    public static Usuario criar(String email, String senhaHash) {
        Usuario usuario = new Usuario();
        usuario.id = UUID.randomUUID();
        usuario.email = email;
        usuario.senha = senhaHash;
        usuario.ativo = true;
        usuario.criadoEm = LocalDateTime.now();
        usuario.atualizadoEm = LocalDateTime.now();
        return usuario;
    }

    public void desativar() {
        this.ativo = false;
        this.atualizadoEm = LocalDateTime.now();
    }

    public void ativar() {
        this.ativo = true;
        this.atualizadoEm = LocalDateTime.now();
    }

    public void alterarSenha(String novaSenhaHash) {
        this.senha = novaSenhaHash;
        this.atualizadoEm = LocalDateTime.now();
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    public LocalDateTime getAtualizadoEm() {
        return atualizadoEm;
    }

    public void setAtualizadoEm(LocalDateTime atualizadoEm) {
        this.atualizadoEm = atualizadoEm;
    }
}



