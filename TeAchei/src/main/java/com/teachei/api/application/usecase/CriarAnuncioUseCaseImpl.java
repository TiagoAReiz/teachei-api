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
        
        // Set mileage if provided
        if (command.quilometragemMinima() != null) {
            veiculoInfo.setQuilometragemMinima(command.quilometragemMinima());
        }
        if (command.quilometragemMaxima() != null) {
            veiculoInfo.setQuilometragemMaxima(command.quilometragemMaxima());
        }

        // Create contact info from profile, with optional overrides from command
        ContatoInfo contatoInfo = ContatoInfo.fromPerfil(perfil);
        
        // Override location if provided in command
        if (command.cidade() != null && !command.cidade().isBlank()) {
            contatoInfo.setCidade(command.cidade());
        }
        if (command.estado() != null && !command.estado().isBlank()) {
            contatoInfo.setEstado(command.estado());
        }

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



