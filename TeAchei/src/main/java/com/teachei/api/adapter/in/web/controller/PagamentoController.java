package com.teachei.api.adapter.in.web.controller;

import com.teachei.api.adapter.in.web.dto.response.PagamentoResponse;
import com.teachei.api.adapter.out.external.mercadopago.MercadoPagoWebhookValidator;
import com.teachei.api.application.ports.in.ProcessarPagamentoUseCase;
import com.teachei.api.config.security.CurrentUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1/pagamentos")
public class PagamentoController {

    private static final Logger log = LoggerFactory.getLogger(PagamentoController.class);

    private final ProcessarPagamentoUseCase processarPagamentoUseCase;
    private final MercadoPagoWebhookValidator webhookValidator;

    public PagamentoController(ProcessarPagamentoUseCase processarPagamentoUseCase,
                               MercadoPagoWebhookValidator webhookValidator) {
        this.processarPagamentoUseCase = processarPagamentoUseCase;
        this.webhookValidator = webhookValidator;
    }

    @PostMapping("/preferencia/{anuncioId}")
    public ResponseEntity<PagamentoResponse> criarPreferencia(
            @AuthenticationPrincipal CurrentUser currentUser,
            @PathVariable String anuncioId) {
        
        var preferencia = processarPagamentoUseCase.criarPreferencia(
            currentUser.getId(), anuncioId);

        return ResponseEntity.ok(new PagamentoResponse(
            preferencia.preferenceId(),
            preferencia.initPoint(),
            preferencia.sandboxInitPoint(),
            preferencia.valor()
        ));
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(
            @RequestHeader(value = "x-signature", required = false) String xSignature,
            @RequestHeader(value = "x-request-id", required = false) String xRequestId,
            @RequestParam(required = false) String type,
            @RequestParam(required = false, name = "data.id") Long dataId,
            @RequestBody(required = false) Map<String, Object> body) {
        
        log.info("Received Mercado Pago webhook: type={}, dataId={}, hasSignature={}", 
                 type, dataId, xSignature != null);

        // Parse data from body if not in query params
        if (type == null && body != null) {
            type = (String) body.get("type");
            var data = (Map<String, Object>) body.get("data");
            if (data != null && data.get("id") != null) {
                dataId = Long.valueOf(data.get("id").toString());
            }
        }

        // Validate webhook signature (security)
        String dataIdStr = dataId != null ? dataId.toString() : null;
        if (!webhookValidator.validateSignature(xSignature, xRequestId, dataIdStr)) {
            log.warn("Invalid webhook signature - rejecting request");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Process the webhook
        if (type != null && dataId != null) {
            var payload = new ProcessarPagamentoUseCase.WebhookPayload(
                type,
                null,
                dataId,
                null,
                null
            );
            processarPagamentoUseCase.processarWebhook(payload);
        }

        // Always return 200 quickly to acknowledge receipt
        return ResponseEntity.ok().build();
    }
}



