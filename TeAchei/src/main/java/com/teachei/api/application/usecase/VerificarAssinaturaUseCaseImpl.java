package com.teachei.api.application.usecase;

import com.teachei.api.application.ports.in.VerificarAssinaturaUseCase;
import com.teachei.api.application.ports.out.AssinaturaRepositoryPort;
import com.teachei.api.domain.model.Assinatura;

import java.util.Optional;
import java.util.UUID;

/**
 * Implementation of VerificarAssinaturaUseCase.
 */
public class VerificarAssinaturaUseCaseImpl implements VerificarAssinaturaUseCase {

    private final AssinaturaRepositoryPort assinaturaRepository;

    public VerificarAssinaturaUseCaseImpl(AssinaturaRepositoryPort assinaturaRepository) {
        this.assinaturaRepository = assinaturaRepository;
    }

    @Override
    public boolean temAssinaturaAtiva(UUID usuarioId) {
        return assinaturaRepository.temAssinaturaAtiva(usuarioId);
    }

    @Override
    public Optional<Assinatura> buscarAssinaturaAtual(UUID usuarioId) {
        return assinaturaRepository.buscarAtivaPorUsuarioId(usuarioId);
    }
}
