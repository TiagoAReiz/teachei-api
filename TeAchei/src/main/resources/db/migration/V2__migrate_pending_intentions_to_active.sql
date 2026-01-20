-- Migration: Convert PENDENTE_PAGAMENTO intentions to ATIVO (new free model)
-- This migration updates all existing intentions that were pending payment
-- to be active since we're removing the payment requirement for buyers.

-- Note: This SQL is for reference/documentation purposes.
-- The actual migration on Cosmos DB would need to be done via a script
-- since Cosmos DB doesn't use SQL migrations like PostgreSQL.

-- For PostgreSQL: Create the assinaturas table (will be auto-created by JPA,
-- but this documents the schema)

-- Subscription table schema (for reference - JPA creates this automatically)
-- CREATE TABLE IF NOT EXISTS assinaturas (
--     id UUID PRIMARY KEY,
--     usuario_id UUID NOT NULL,
--     plano VARCHAR(50) NOT NULL,
--     status VARCHAR(50) NOT NULL,
--     data_inicio TIMESTAMP,
--     data_fim TIMESTAMP,
--     transacao_id VARCHAR(255),
--     criado_em TIMESTAMP NOT NULL,
--     atualizado_em TIMESTAMP
-- );

-- CREATE INDEX idx_assinaturas_usuario_id ON assinaturas(usuario_id);
-- CREATE INDEX idx_assinaturas_status ON assinaturas(status);
-- CREATE INDEX idx_assinaturas_data_fim ON assinaturas(data_fim);
