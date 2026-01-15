package com.teachei.api.application.ports.in;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Inbound port for payment processing.
 */
public interface ProcessarPagamentoUseCase {

    /**
     * Creates a payment preference for an intention.
     *
     * @param usuarioId the user ID
     * @param anuncioId the intention ID
     * @return the payment preference
     */
    PreferenciaDTO criarPreferencia(UUID usuarioId, String anuncioId);

    /**
     * Processes a payment webhook notification.
     *
     * @param payload the webhook payload
     */
    void processarWebhook(WebhookPayload payload);

    /**
     * Payment preference result.
     */
    record PreferenciaDTO(
        String preferenceId,
        String initPoint,
        String sandboxInitPoint,
        BigDecimal valor
    ) {}

    /**
     * Webhook payload from Mercado Pago.
     */
    record WebhookPayload(
        String type,
        String action,
        Long id,
        String externalReference,
        String status
    ) {}
}



