package com.teachei.api.application.usecase;

import com.teachei.api.application.ports.in.ExcluirAnuncioUseCase;
import com.teachei.api.application.ports.out.AnuncioRepositoryPort;
import com.teachei.api.domain.exception.AcessoNegadoException;
import com.teachei.api.domain.exception.AnuncioInvalidoException;
import com.teachei.api.domain.exception.AnuncioNaoEncontradoException;
import com.teachei.api.domain.model.Anuncio;
import com.teachei.api.domain.model.StatusAnuncio;

import java.util.UUID;

/**
 * Implementation of the delete intention use case.
 */
public class ExcluirAnuncioUseCaseImpl implements ExcluirAnuncioUseCase {

    private final AnuncioRepositoryPort anuncioRepository;

    public ExcluirAnuncioUseCaseImpl(AnuncioRepositoryPort anuncioRepository) {
        this.anuncioRepository = anuncioRepository;
    }

    @Override
    public void executar(UUID usuarioId, String anuncioId) {
        Anuncio anuncio = anuncioRepository.buscarPorId(anuncioId)
            .orElseThrow(() -> new AnuncioNaoEncontradoException(anuncioId));

        // Check ownership
        if (!anuncio.getUsuarioId().equals(usuarioId)) {
            throw new AcessoNegadoException("Você não pode excluir este anúncio");
        }

        // Check status - can only delete when active
        if (anuncio.getStatus() != StatusAnuncio.ATIVO) {
            throw new AnuncioInvalidoException(
                "Não é possível excluir uma intenção que não está ativa"
            );
        }

        anuncioRepository.deletar(anuncioId);
    }
}
