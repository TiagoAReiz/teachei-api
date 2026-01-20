package com.teachei.api.application.usecase;

import com.teachei.api.application.ports.in.AtualizarAnuncioUseCase;
import com.teachei.api.application.ports.out.AnuncioRepositoryPort;
import com.teachei.api.domain.exception.AcessoNegadoException;
import com.teachei.api.domain.exception.AnuncioInvalidoException;
import com.teachei.api.domain.exception.AnuncioNaoEncontradoException;
import com.teachei.api.domain.model.Anuncio;
import com.teachei.api.domain.model.StatusAnuncio;

import java.util.UUID;

/**
 * Implementation of the update intention use case.
 */
public class AtualizarAnuncioUseCaseImpl implements AtualizarAnuncioUseCase {

    private final AnuncioRepositoryPort anuncioRepository;

    public AtualizarAnuncioUseCaseImpl(AnuncioRepositoryPort anuncioRepository) {
        this.anuncioRepository = anuncioRepository;
    }

    @Override
    public Anuncio executar(UUID usuarioId, String anuncioId, AtualizarAnuncioCommand command) {
        Anuncio anuncio = anuncioRepository.buscarPorId(anuncioId)
            .orElseThrow(() -> new AnuncioNaoEncontradoException(anuncioId));

        // Check ownership
        if (!anuncio.getUsuarioId().equals(usuarioId)) {
            throw new AcessoNegadoException("Você não pode editar este anúncio");
        }

        // Check status - can only update when active
        if (anuncio.getStatus() != StatusAnuncio.ATIVO) {
            throw new AnuncioInvalidoException(
                "Não é possível atualizar uma intenção que não está ativa"
            );
        }

        // Update vehicle info
        anuncio.getVeiculoInfo().atualizar(
            command.anos(),
            command.cores(),
            command.precoMaximo()
        );

        // Update observations
        anuncio.setObservacoes(command.observacoes());

        return anuncioRepository.salvar(anuncio);
    }
}
