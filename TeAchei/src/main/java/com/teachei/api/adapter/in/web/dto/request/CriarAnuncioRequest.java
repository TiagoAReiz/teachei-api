package com.teachei.api.adapter.in.web.dto.request;

import com.teachei.api.domain.model.TipoVeiculo;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.List;

public record CriarAnuncioRequest(
    @NotNull(message = "Tipo de veículo é obrigatório")
    TipoVeiculo tipo,

    String marcaCodigo,
    String marcaNome,
    String modeloCodigo,
    String modeloNome,

    @NotEmpty(message = "Pelo menos um ano deve ser selecionado")
    List<Integer> anos,

    List<String> cores,  // Optional - empty means "any color"

    @NotNull(message = "Preço máximo é obrigatório")
    @Positive(message = "Preço máximo deve ser maior que zero")
    BigDecimal precoMaximo,

    Integer quilometragemMinima,
    Integer quilometragemMaxima,
    
    List<String> opcionais,

    String observacoes,
    boolean dadosManuais,
    
    String cidade,
    String estado
) {}



