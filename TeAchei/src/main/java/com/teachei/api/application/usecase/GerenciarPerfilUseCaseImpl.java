package com.teachei.api.application.usecase;

import com.teachei.api.application.ports.in.GerenciarPerfilUseCase;
import com.teachei.api.application.ports.out.PerfilRepositoryPort;
import com.teachei.api.domain.exception.UsuarioNaoEncontradoException;
import com.teachei.api.domain.model.Perfil;

import java.util.UUID;

/**
 * Implementation of the profile management use case.
 */
public class GerenciarPerfilUseCaseImpl implements GerenciarPerfilUseCase {

    private final PerfilRepositoryPort perfilRepository;

    public GerenciarPerfilUseCaseImpl(PerfilRepositoryPort perfilRepository) {
        this.perfilRepository = perfilRepository;
    }

    @Override
    public Perfil buscarPorUsuario(UUID usuarioId) {
        return perfilRepository.buscarPorUsuarioId(usuarioId)
            .orElseThrow(() -> new UsuarioNaoEncontradoException(usuarioId));
    }

    @Override
    public Perfil atualizar(UUID usuarioId, AtualizarPerfilCommand command) {
        Perfil perfil = perfilRepository.buscarPorUsuarioId(usuarioId)
            .orElseThrow(() -> new UsuarioNaoEncontradoException(usuarioId));

        perfil.atualizar(
            command.nome(),
            command.bio(),
            command.whatsapp(),
            command.instagram(),
            command.facebook(),
            command.cidade(),
            command.estado()
        );

        return perfilRepository.salvar(perfil);
    }
}



