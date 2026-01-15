package com.teachei.api.adapter.out.persistence.cosmosdb.repository;

import com.azure.spring.data.cosmos.repository.CosmosRepository;
import com.azure.spring.data.cosmos.repository.Query;
import com.teachei.api.adapter.out.persistence.cosmosdb.document.AnuncioDocument;
import com.teachei.api.domain.model.StatusAnuncio;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnuncioCosmosRepository extends CosmosRepository<AnuncioDocument, String> {

    List<AnuncioDocument> findByUsuarioId(String usuarioId);

    List<AnuncioDocument> findByStatus(StatusAnuncio status);

    @Query("SELECT * FROM c WHERE c.status = @status ORDER BY c.criadoEm DESC OFFSET @offset LIMIT @limit")
    List<AnuncioDocument> findByStatusPaginated(
        @Param("status") StatusAnuncio status,
        @Param("offset") int offset,
        @Param("limit") int limit
    );

    long countByStatus(StatusAnuncio status);
}



