package com.teachei.api.application.usecase;

import com.teachei.api.application.ports.in.CriarAnuncioUseCase;
import com.teachei.api.application.ports.out.AnuncioRepositoryPort;
import com.teachei.api.application.ports.out.PerfilRepositoryPort;
import com.teachei.api.domain.exception.UsuarioNaoEncontradoException;
import com.teachei.api.domain.model.*;
import com.teachei.api.domain.service.AnuncioService;

import java.util.UUID;

/**
 * Implementation of the create intention use case.
 */
public class CriarAnuncioUseCaseImpl implements CriarAnuncioUseCase {

    private final AnuncioRepositoryPort anuncioRepository;
    private final PerfilRepositoryPort perfilRepository;
    private final AnuncioService anuncioService;

    public CriarAnuncioUseCaseImpl(AnuncioRepositoryPort anuncioRepository,
                                    PerfilRepositoryPort perfilRepository,
                                    AnuncioService anuncioService) {
        this.anuncioRepository = anuncioRepository;
        this.perfilRepository = perfilRepository;
        this.anuncioService = anuncioService;
    }

    @Override
    public Anuncio executar(UUID usuarioId, CriarAnuncioCommand command) {
        // Get user profile for contact info
        Perfil perfil = perfilRepository.buscarPorUsuarioId(usuarioId)
            .orElseThrow(() -> new UsuarioNaoEncontradoException(usuarioId));

        // Create vehicle info
        VeiculoInfo veiculoInfo;
        if (command.dadosManuais()) {
            veiculoInfo = VeiculoInfo.criarManual(
                command.marcaNome(),
                command.modeloNome(),
                command.anos(),
                command.cores(),
                command.precoMaximo()
            );
        } else {
            veiculoInfo = new VeiculoInfo(
                command.marcaCodigo(),
                command.marcaNome(),
                command.modeloCodigo(),
                command.modeloNome(),
                command.anos(),
                command.cores(),
                command.precoMaximo()
            );
        }

        // Create contact info from profile
        ContatoInfo contatoInfo = ContatoInfo.fromPerfil(perfil);

        // Create intention using domain service
        Anuncio anuncio = anuncioService.criarAnuncio(
            usuarioId,
            command.tipo(),
            veiculoInfo,
            contatoInfo,
            command.observacoes()
        );

        return anuncioRepository.salvar(anuncio);
    }
}



