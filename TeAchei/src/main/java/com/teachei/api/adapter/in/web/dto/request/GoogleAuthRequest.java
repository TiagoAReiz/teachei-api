package com.teachei.api.adapter.in.web.dto.request;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for Google OAuth authentication.
 */
public record GoogleAuthRequest(
    @NotBlank(message = "Token de acesso do Google é obrigatório")
    String credential
) {}
