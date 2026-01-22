package com.teachei.api.adapter.out.persistence.cosmosdb;

import com.teachei.api.adapter.out.persistence.cosmosdb.mapper.AnuncioDocumentMapper;
import com.teachei.api.adapter.out.persistence.cosmosdb.repository.AnuncioCosmosRepository;
import com.teachei.api.application.ports.out.AnuncioRepositoryPort;
import com.teachei.api.domain.model.Anuncio;
import com.teachei.api.domain.model.StatusAnuncio;
import com.teachei.api.domain.model.TipoVeiculo;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class AnuncioCosmosAdapter implements AnuncioRepositoryPort {

    private final AnuncioCosmosRepository repository;
    private final AnuncioDocumentMapper mapper;

    public AnuncioCosmosAdapter(AnuncioCosmosRepository repository, 
                                 AnuncioDocumentMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public Anuncio salvar(Anuncio anuncio) {
        var document = mapper.toDocument(anuncio);
        var saved = repository.save(document);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<Anuncio> buscarPorId(String id) {
        return repository.findById(id)
            .map(mapper::toDomain);
    }

    @Override
    public List<Anuncio> buscarPorUsuarioId(UUID usuarioId) {
        return repository.findByUsuarioId(usuarioId.toString())
            .stream()
            .map(mapper::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public ResultadoBusca buscar(StatusAnuncio status, TipoVeiculo tipo,
                                  String marcaCodigo, String modeloCodigo,
                                  Integer anoMin, Integer anoMax,
                                  BigDecimal precoMin, BigDecimal precoMax,
                                  String search, List<String> opcionais,
                                  String cidade, String estado,
                                  int pagina, int tamanho) {
        // Get all active intentions and filter in memory
        // Note: For production, implement proper Cosmos DB query with filters
        int offset = pagina * tamanho;
        
        List<Anuncio> filtered = repository.findByStatusPaginated(status, offset, tamanho)
            .stream()
            .map(mapper::toDomain)
            .filter(a -> tipo == null || a.getTipo() == tipo)
            .filter(a -> marcaCodigo == null || 
                (a.getVeiculoInfo() != null && marcaCodigo.equals(a.getVeiculoInfo().getMarcaCodigo())))
            .filter(a -> modeloCodigo == null || 
                (a.getVeiculoInfo() != null && modeloCodigo.equals(a.getVeiculoInfo().getModeloCodigo())))
            // Year range filter: matches if any year in the ad is within the range
            .filter(a -> {
                if (anoMin == null && anoMax == null) return true;
                if (a.getVeiculoInfo() == null || a.getVeiculoInfo().getAnos() == null) return false;
                return a.getVeiculoInfo().getAnos().stream().anyMatch(ano ->
                    (anoMin == null || ano >= anoMin) && (anoMax == null || ano <= anoMax)
                );
            })
            // Price range filter: matches if precoMaximo is within the range
            .filter(a -> {
                if (precoMin == null && precoMax == null) return true;
                if (a.getVeiculoInfo() == null || a.getVeiculoInfo().getPrecoMaximo() == null) return false;
                var preco = a.getVeiculoInfo().getPrecoMaximo();
                if (precoMin != null && preco.compareTo(precoMin) < 0) return false;
                if (precoMax != null && preco.compareTo(precoMax) > 0) return false;
                return true;
            })
            // Text search filter: case-insensitive search in marca, modelo, modeloBase, observacoes
            .filter(a -> {
                if (search == null || search.isBlank()) return true;
                String searchLower = search.toLowerCase();
                return containsIgnoreCase(a.getVeiculoInfo() != null ? a.getVeiculoInfo().getMarcaNome() : null, searchLower) ||
                       containsIgnoreCase(a.getVeiculoInfo() != null ? a.getVeiculoInfo().getModeloNome() : null, searchLower) ||
                       containsIgnoreCase(a.getVeiculoInfo() != null ? a.getVeiculoInfo().getModeloBaseNome() : null, searchLower) ||
                       containsIgnoreCase(a.getObservacoes(), searchLower);
            })
            // Optionals filter: matches if ad contains all requested optionals
            .filter(a -> {
                if (opcionais == null || opcionais.isEmpty()) return true;
                if (a.getVeiculoInfo() == null || a.getVeiculoInfo().getOpcionais() == null) return false;
                return a.getVeiculoInfo().getOpcionais().containsAll(opcionais);
            })
            .filter(a -> cidade == null || 
                (a.getContatoInfo() != null && cidade.equals(a.getContatoInfo().getCidade())))
            .filter(a -> estado == null || 
                (a.getContatoInfo() != null && estado.equals(a.getContatoInfo().getEstado())))
            .collect(Collectors.toList());

        long total = repository.countByStatus(status);

        return new ResultadoBusca(filtered, total);
    }

    private boolean containsIgnoreCase(String text, String search) {
        if (text == null || search == null) return false;
        return text.toLowerCase().contains(search);
    }

    @Override
    public long contarPorStatus(StatusAnuncio status) {
        return repository.countByStatus(status);
    }

    @Override
    public void deletar(String id) {
        // Cosmos DB requires partition key for delete operations.
        // We need to find the document first to get the usuarioId (partition key)
        repository.findById(id).ifPresent(repository::delete);
    }
}



