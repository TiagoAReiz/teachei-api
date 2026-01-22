package com.teachei.api.application.usecase;

import com.teachei.api.application.ports.in.CriarAnuncioUseCase;
import com.teachei.api.application.ports.out.AnuncioRepositoryPort;
import com.teachei.api.application.ports.out.PerfilRepositoryPort;
import com.teachei.api.domain.exception.UsuarioNaoEncontradoException;
import com.teachei.api.domain.model.*;
import com.teachei.api.domain.service.AnuncioService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
        // Validate year range
        Integer anoMinimo = command.anos() != null && !command.anos().isEmpty() 
            ? command.anos().stream().min(Integer::compareTo).orElse(null)
            : null;
        Integer anoMaximo = command.anos() != null && !command.anos().isEmpty()
            ? command.anos().stream().max(Integer::compareTo).orElse(null)
            : null;
        anuncioService.validarRangeAnos(anoMinimo, anoMaximo);

        // Validate mileage range
        anuncioService.validarRangeQuilometragem(
            command.quilometragemMinima(), 
            command.quilometragemMaxima()
        );

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
        
        // Set optional features if provided
        if (command.opcionais() != null && !command.opcionais().isEmpty()) {
            veiculoInfo.setOpcionais(command.opcionais());
        }
        
        // Set version info if provided
        if (command.modeloBaseNome() != null && !command.modeloBaseNome().isBlank()) {
            veiculoInfo.setModeloBaseNome(command.modeloBaseNome());
        }
        veiculoInfo.setTodasVersoes(command.todasVersoes());
        if (command.versoes() != null && !command.versoes().isEmpty()) {
            List<VersaoInfo> versoes = command.versoes().stream()
                .map(v -> new VersaoInfo(v.codigo(), v.nome()))
                .collect(Collectors.toList());
            veiculoInfo.setVersoes(versoes);
        }

        // Create contact info from profile, with overrides from command
        ContatoInfo contatoInfo = ContatoInfo.fromPerfil(perfil);
        
        // Override location from command (required for new business model)
        if (command.cidade() != null && !command.cidade().isBlank()) {
            contatoInfo.setCidade(command.cidade());
        }
        if (command.estado() != null && !command.estado().isBlank()) {
            contatoInfo.setEstado(command.estado());
        }

        // Create intention as ATIVO (free for buyers - new business model)
        Anuncio anuncio = anuncioService.criarAnuncioAtivo(
            usuarioId,
            command.tipo(),
            veiculoInfo,
            contatoInfo,
            command.observacoes()
        );

        return anuncioRepository.salvar(anuncio);
    }
}



