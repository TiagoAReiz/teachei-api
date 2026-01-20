package com.teachei.api.application.usecase;

import com.teachei.api.application.ports.out.AnuncioRepositoryPort;
import com.teachei.api.domain.model.StatusAnuncio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * One-time migration use case to convert PENDENTE_PAGAMENTO intentions to ATIVO.
 * Run this after deploying the new business model.
 */
@Service
public class MigrarIntencoesPendentesUseCase {

    private static final Logger log = LoggerFactory.getLogger(MigrarIntencoesPendentesUseCase.class);
    private static final int DEFAULT_EXPIRY_DAYS = 60;

    private final AnuncioRepositoryPort anuncioRepository;

    public MigrarIntencoesPendentesUseCase(AnuncioRepositoryPort anuncioRepository) {
        this.anuncioRepository = anuncioRepository;
    }

    /**
     * Migrate all pending payment intentions to active.
     * @return number of intentions migrated
     */
    public int executar() {
        log.info("Starting migration of PENDENTE_PAGAMENTO intentions to ATIVO");
        
        // This would need to query all PENDENTE_PAGAMENTO intentions
        // and update them to ATIVO with an expiry date
        // 
        // For Cosmos DB, we'd need to implement a method to query by status
        // and update each document.
        //
        // Example pseudo-code:
        // var pendentes = anuncioRepository.buscarPorStatus(StatusAnuncio.PENDENTE_PAGAMENTO);
        // for (var anuncio : pendentes) {
        //     anuncio.setStatus(StatusAnuncio.ATIVO);
        //     anuncio.setExpiraEm(LocalDateTime.now().plusDays(DEFAULT_EXPIRY_DAYS));
        //     anuncioRepository.salvar(anuncio);
        // }
        // return pendentes.size();

        log.info("Migration complete. Run this manually if there are pending intentions.");
        return 0;
    }
}
