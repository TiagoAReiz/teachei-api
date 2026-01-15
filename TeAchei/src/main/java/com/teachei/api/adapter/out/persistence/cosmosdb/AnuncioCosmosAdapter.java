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
                                  Integer ano, BigDecimal precoMinimo,
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
            .filter(a -> ano == null || 
                (a.getVeiculoInfo() != null && a.getVeiculoInfo().getAnos().contains(ano)))
            .filter(a -> precoMinimo == null || 
                (a.getVeiculoInfo() != null && 
                 a.getVeiculoInfo().getPrecoMaximo().compareTo(precoMinimo) >= 0))
            .filter(a -> cidade == null || 
                (a.getContatoInfo() != null && cidade.equals(a.getContatoInfo().getCidade())))
            .filter(a -> estado == null || 
                (a.getContatoInfo() != null && estado.equals(a.getContatoInfo().getEstado())))
            .collect(Collectors.toList());

        long total = repository.countByStatus(status);

        return new ResultadoBusca(filtered, total);
    }

    @Override
    public long contarPorStatus(StatusAnuncio status) {
        return repository.countByStatus(status);
    }

    @Override
    public void deletar(String id) {
        repository.deleteById(id);
    }
}



