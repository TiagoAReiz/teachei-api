package com.teachei.api.adapter.in.web.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.List;

public record AtualizarAnuncioRequest(
    @NotEmpty(message = "Pelo menos um ano deve ser selecionado")
    List<Integer> anos,

    @NotEmpty(message = "Pelo menos uma cor deve ser selecionada")
    List<String> cores,

    @Positive(message = "Preço máximo deve ser maior que zero")
    BigDecimal precoMaximo,

    String observacoes
) {}
