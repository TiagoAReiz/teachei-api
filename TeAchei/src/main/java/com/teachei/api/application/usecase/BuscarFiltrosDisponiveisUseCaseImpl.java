package com.teachei.api.application.usecase;

import com.teachei.api.application.ports.in.BuscarFiltrosDisponiveisUseCase;
import com.teachei.api.application.ports.out.AnuncioRepositoryPort;
import com.teachei.api.domain.model.Anuncio;
import com.teachei.api.domain.model.TipoVeiculo;
import com.teachei.api.domain.model.VeiculoInfo;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Implementation of the available filters use case.
 * Aggregates distinct vehicle types, brands, and models from active intentions.
 */
public class BuscarFiltrosDisponiveisUseCaseImpl implements BuscarFiltrosDisponiveisUseCase {

    private final AnuncioRepositoryPort anuncioRepository;

    public BuscarFiltrosDisponiveisUseCaseImpl(AnuncioRepositoryPort anuncioRepository) {
        this.anuncioRepository = anuncioRepository;
    }

    @Override
    public FiltrosDisponiveis buscar(TipoVeiculo tipo, String marcaCodigo) {
        List<Anuncio> ativos = anuncioRepository.buscarAtivos();

        // Extract distinct vehicle types
        Set<TipoVeiculo> tiposSet = ativos.stream()
            .map(Anuncio::getTipo)
            .filter(Objects::nonNull)
            .collect(Collectors.toCollection(TreeSet::new));

        // Filter by type if specified
        List<Anuncio> filtradosPorTipo = tipo != null
            ? ativos.stream().filter(a -> a.getTipo() == tipo).toList()
            : ativos;

        // Extract distinct brands
        Map<String, String> marcasMap = new LinkedHashMap<>();
        for (Anuncio anuncio : filtradosPorTipo) {
            VeiculoInfo veiculo = anuncio.getVeiculoInfo();
            if (veiculo != null && veiculo.getMarcaCodigo() != null && veiculo.getMarcaNome() != null) {
                marcasMap.putIfAbsent(veiculo.getMarcaCodigo(), veiculo.getMarcaNome());
            }
        }

        List<MarcaOption> marcas = marcasMap.entrySet().stream()
            .sorted(Map.Entry.comparingByValue())
            .map(e -> new MarcaOption(e.getKey(), e.getValue()))
            .toList();

        // Filter by brand if specified
        List<Anuncio> filtradosPorMarca = marcaCodigo != null
            ? filtradosPorTipo.stream()
                .filter(a -> a.getVeiculoInfo() != null && 
                             marcaCodigo.equals(a.getVeiculoInfo().getMarcaCodigo()))
                .toList()
            : filtradosPorTipo;

        // Extract distinct models
        Map<String, ModeloOption> modelosMap = new LinkedHashMap<>();
        for (Anuncio anuncio : filtradosPorMarca) {
            VeiculoInfo veiculo = anuncio.getVeiculoInfo();
            if (veiculo != null && veiculo.getModeloCodigo() != null && veiculo.getModeloNome() != null) {
                String baseNome = veiculo.getModeloBaseNome() != null 
                    ? veiculo.getModeloBaseNome() 
                    : extractBaseName(veiculo.getModeloNome());
                modelosMap.putIfAbsent(veiculo.getModeloCodigo(), 
                    new ModeloOption(veiculo.getModeloCodigo(), veiculo.getModeloNome(), baseNome));
            }
        }

        List<ModeloOption> modelos = modelosMap.values().stream()
            .sorted(Comparator.comparing(ModeloOption::nome))
            .toList();

        return new FiltrosDisponiveis(
            new ArrayList<>(tiposSet),
            marcas,
            modelos
        );
    }

    /**
     * Extracts the base model name (first word) from a full model name.
     */
    private String extractBaseName(String modeloNome) {
        if (modeloNome == null || modeloNome.isBlank()) return modeloNome;
        String[] parts = modeloNome.split("\\s+");
        return parts[0];
    }
}
