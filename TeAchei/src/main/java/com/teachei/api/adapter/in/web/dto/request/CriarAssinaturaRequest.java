package com.teachei.api.adapter.in.web.dto.request;

import com.teachei.api.domain.model.PlanoAssinatura;
import jakarta.validation.constraints.NotNull;

/**
 * Request to create a new subscription.
 */
public record CriarAssinaturaRequest(
    @NotNull(message = "Plano é obrigatório")
    PlanoAssinatura plano
) {}
