package com.teachei.api.application.usecase;

import com.teachei.api.application.ports.in.ProcessarPagamentoUseCase;
import com.teachei.api.application.ports.out.AnuncioRepositoryPort;
import com.teachei.api.application.ports.out.PagamentoPort;
import com.teachei.api.application.ports.out.TransacaoRepositoryPort;
import com.teachei.api.domain.exception.AnuncioNaoEncontradoException;
import com.teachei.api.domain.exception.AcessoNegadoException;
import com.teachei.api.domain.exception.PagamentoException;
import com.teachei.api.domain.model.Anuncio;
import com.teachei.api.domain.model.StatusAnuncio;
import com.teachei.api.domain.model.StatusPagamento;
import com.teachei.api.domain.service.AnuncioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Implementation of the payment processing use case. 
 * bla
 */
public class ProcessarPagamentoUseCaseImpl implements ProcessarPagamentoUseCase {

    private static final Logger log = LoggerFactory.getLogger(ProcessarPagamentoUseCaseImpl.class);

    private final AnuncioRepositoryPort anuncioRepository;
    private final PagamentoPort pagamentoPort;
    private final TransacaoRepositoryPort transacaoRepository;
    private final AnuncioService anuncioService;
    private final BigDecimal precoAnuncio;
    private final String appBaseUrl;
    private final String frontendUrl;

    public ProcessarPagamentoUseCaseImpl(AnuncioRepositoryPort anuncioRepository,
                                          PagamentoPort pagamentoPort,
                                          TransacaoRepositoryPort transacaoRepository,
                                          AnuncioService anuncioService,
                                          BigDecimal precoAnuncio,
                                          String appBaseUrl,
                                          String frontendUrl) {
        this.anuncioRepository = anuncioRepository;
        this.pagamentoPort = pagamentoPort;
        this.transacaoRepository = transacaoRepository;
        this.anuncioService = anuncioService;
        this.precoAnuncio = precoAnuncio;
        this.appBaseUrl = appBaseUrl;
        this.frontendUrl = frontendUrl;
    }

    @Override
    public PreferenciaDTO criarPreferencia(UUID usuarioId, String anuncioId) {
        Anuncio anuncio = anuncioRepository.buscarPorId(anuncioId)
            .orElseThrow(() -> new AnuncioNaoEncontradoException(anuncioId));

        // Verify ownership
        if (!anuncio.getUsuarioId().equals(usuarioId)) {
            throw new AcessoNegadoException("Você não pode pagar por este anúncio");
        }

        // Verify status
        if (anuncio.getStatus() != StatusAnuncio.PENDENTE_PAGAMENTO) {
            throw new PagamentoException("Anúncio não está pendente de pagamento");
        }

        // Create description
        String descricao = "Anúncio de Compra - " + 
            anuncio.getVeiculoInfo().getDescricaoCompleta();

        // Build notification URL for webhooks
        String notificationUrl = appBaseUrl + "/api/v1/pagamentos/webhook";

        // Create payment preference
        PagamentoPort.PreferenciaPagamento preferencia = pagamentoPort.criarPreferencia(
            anuncioId,
            descricao,
            precoAnuncio,
            frontendUrl + "/pagamento/sucesso?id=" + anuncioId,
            frontendUrl + "/pagamento/erro?id=" + anuncioId,
            frontendUrl + "/pagamento/pendente?id=" + anuncioId,
            notificationUrl
        );

        return new PreferenciaDTO(
            preferencia.id(),
            preferencia.initPoint(),
            preferencia.sandboxInitPoint(),
            precoAnuncio
        );
    }

    @Override
    public void processarWebhook(WebhookPayload payload) {
        log.info("Processing payment webhook: type={}, action={}, id={}", 
            payload.type(), payload.action(), payload.id());

        if (!"payment".equals(payload.type())) {
            log.debug("Ignoring non-payment webhook type: {}", payload.type());
            return;
        }

        if (payload.id() == null) {
            log.warn("Webhook missing payment ID");
            return;
        }

        // Check for idempotency
        if (transacaoRepository.buscarPorPaymentId(payload.id()).isPresent()) {
            log.info("Payment {} already processed, skipping", payload.id());
            return;
        }

        // Get payment status from Mercado Pago
        PagamentoPort.StatusPagamentoInfo statusInfo = 
            pagamentoPort.consultarStatus(payload.id());

        String anuncioId = statusInfo.externalReference();
        if (anuncioId == null) {
            log.warn("Payment {} has no external reference", payload.id());
            return;
        }

        Anuncio anuncio = anuncioRepository.buscarPorId(anuncioId)
            .orElse(null);
        
        if (anuncio == null) {
            log.warn("Intention not found for payment {}: {}", payload.id(), anuncioId);
            return;
        }

        // Create transaction record
        TransacaoRepositoryPort.Transacao transacao = TransacaoRepositoryPort.Transacao.criar(
            statusInfo.paymentId(),
            anuncio.getUsuarioId(),
            anuncioId,
            statusInfo.valor(),
            statusInfo.metodoPagamento(),
            statusInfo.status()
        );
        transacaoRepository.salvar(transacao);

        // Activate intention if payment approved
        if (statusInfo.status() == StatusPagamento.APROVADO) {
            anuncioService.ativarAnuncio(anuncio, transacao.id().toString());
            anuncioRepository.salvar(anuncio);
            log.info("Intention {} activated after payment {}", anuncioId, payload.id());
        }
    }
}



