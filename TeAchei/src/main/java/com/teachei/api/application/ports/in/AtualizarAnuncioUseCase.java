package com.teachei.api.application.ports.in;

import com.teachei.api.domain.model.Anuncio;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/**
 * Inbound port for updating a purchase intention.
 */
public interface AtualizarAnuncioUseCase {

    /**
     * Updates an existing intention.
     * Only the owner can update, and only when status is PENDENTE_PAGAMENTO.
     *
     * @param usuarioId the ID of the user making the request
     * @param anuncioId the ID of the intention to update
     * @param command the update command
     * @return the updated intention
     */
    Anuncio executar(UUID usuarioId, String anuncioId, AtualizarAnuncioCommand command);

    record AtualizarAnuncioCommand(
        List<Integer> anos,
        List<String> cores,
        BigDecimal precoMaximo,
        String observacoes
    ) {}
}
