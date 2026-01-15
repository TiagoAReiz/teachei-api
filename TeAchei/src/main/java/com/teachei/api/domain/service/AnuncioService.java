package com.teachei.api.domain.service;

import com.teachei.api.domain.exception.AnuncioInvalidoException;
import com.teachei.api.domain.model.*;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Domain service for business rules related to purchase intentions.
 */
public class AnuncioService {

    private static final int DEFAULT_EXPIRY_DAYS = 60;

    /**
     * Creates a new purchase intention with validation.
     */
    public Anuncio criarAnuncio(UUID usuarioId, TipoVeiculo tipo, 
                                 VeiculoInfo veiculoInfo, ContatoInfo contatoInfo,
                                 String observacoes) {
        validarVeiculoInfo(veiculoInfo);
        validarContatoInfo(contatoInfo);
        
        return Anuncio.criar(usuarioId, tipo, veiculoInfo, contatoInfo, observacoes);
    }

    /**
     * Activates an intention after payment confirmation.
     */
    public void ativarAnuncio(Anuncio anuncio, String transacaoId) {
        if (anuncio.getStatus() != StatusAnuncio.PENDENTE_PAGAMENTO) {
            throw new AnuncioInvalidoException(
                "Anúncio não está pendente de pagamento. Status atual: " + anuncio.getStatus());
        }
        anuncio.ativar(transacaoId, DEFAULT_EXPIRY_DAYS);
    }

    /**
     * Checks if an intention has expired and updates status.
     */
    public boolean verificarExpiracao(Anuncio anuncio) {
        if (anuncio.getStatus() == StatusAnuncio.ATIVO && anuncio.isExpirado()) {
            anuncio.expirar();
            return true;
        }
        return false;
    }

    /**
     * Cancels an active intention.
     */
    public void cancelarAnuncio(Anuncio anuncio, UUID usuarioId) {
        if (!anuncio.getUsuarioId().equals(usuarioId)) {
            throw new AnuncioInvalidoException("Apenas o dono do anúncio pode cancelá-lo");
        }
        if (anuncio.getStatus() != StatusAnuncio.ATIVO && 
            anuncio.getStatus() != StatusAnuncio.PENDENTE_PAGAMENTO) {
            throw new AnuncioInvalidoException(
                "Anúncio não pode ser cancelado. Status atual: " + anuncio.getStatus());
        }
        anuncio.cancelar();
    }

    /**
     * Checks if a year is within the intention's acceptable years.
     */
    public boolean anoAceito(Anuncio anuncio, int ano) {
        return anuncio.getVeiculoInfo().getAnos().contains(ano);
    }

    /**
     * Checks if a price is within the buyer's maximum.
     */
    public boolean precoAceito(Anuncio anuncio, BigDecimal preco) {
        return preco.compareTo(anuncio.getVeiculoInfo().getPrecoMaximo()) <= 0;
    }

    private void validarVeiculoInfo(VeiculoInfo veiculoInfo) {
        if (veiculoInfo == null) {
            throw new AnuncioInvalidoException("Informações do veículo são obrigatórias");
        }
        try {
            veiculoInfo.validar();
        } catch (IllegalArgumentException e) {
            throw new AnuncioInvalidoException(e.getMessage());
        }
    }

    private void validarContatoInfo(ContatoInfo contatoInfo) {
        if (contatoInfo == null) {
            throw new AnuncioInvalidoException("Informações de contato são obrigatórias");
        }
        if (contatoInfo.getWhatsapp() == null || contatoInfo.getWhatsapp().isBlank()) {
            throw new AnuncioInvalidoException("WhatsApp é obrigatório para contato");
        }
    }
}



