package com.teachei.api.domain.model;

/**
 * Enum representing the status of a purchase intention (anúncio).
 */
public enum StatusAnuncio {
    PENDENTE_PAGAMENTO("Aguardando Pagamento"),
    ATIVO("Ativo"),
    EXPIRADO("Expirado"),
    CANCELADO("Cancelado"),
    FINALIZADO("Finalizado");

    private final String descricao;

    StatusAnuncio(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public boolean isVisivel() {
        return this == ATIVO;
    }
}



