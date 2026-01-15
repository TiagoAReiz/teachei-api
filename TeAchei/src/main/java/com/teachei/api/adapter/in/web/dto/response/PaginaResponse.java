package com.teachei.api.adapter.in.web.dto.response;

import java.util.List;

public record PaginaResponse<T>(
    List<T> items,
    int pagina,
    int tamanho,
    long total,
    int totalPaginas,
    boolean hasNext,
    boolean hasPrevious
) {
    public static <T> PaginaResponse<T> of(List<T> items, int pagina, int tamanho, 
                                           long total, int totalPaginas) {
        return new PaginaResponse<>(
            items,
            pagina,
            tamanho,
            total,
            totalPaginas,
            pagina < totalPaginas - 1,
            pagina > 0
        );
    }
}



