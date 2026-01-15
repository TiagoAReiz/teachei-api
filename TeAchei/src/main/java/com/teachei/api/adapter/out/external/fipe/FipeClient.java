package com.teachei.api.adapter.out.external.fipe;

import com.teachei.api.domain.model.TipoVeiculo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Component
public class FipeClient {

    private final WebClient webClient;

    public FipeClient(@Value("${fipe.base-url}") String baseUrl, WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
            .baseUrl(baseUrl)
            .build();
    }

    @Cacheable(value = "fipe-marcas", key = "#tipo.name()")
    public List<FipeMarcaResponse> getMarcas(TipoVeiculo tipo) {
        return webClient.get()
            .uri("/{tipo}/marcas", tipo.getFipeEndpoint())
            .retrieve()
            .bodyToFlux(FipeMarcaResponse.class)
            .collectList()
            .block();
    }

    @Cacheable(value = "fipe-modelos", key = "#tipo.name() + '-' + #marcaCodigo")
    public FipeModelosResponse getModelos(TipoVeiculo tipo, String marcaCodigo) {
        return webClient.get()
            .uri("/{tipo}/marcas/{marca}/modelos", tipo.getFipeEndpoint(), marcaCodigo)
            .retrieve()
            .bodyToMono(FipeModelosResponse.class)
            .block();
    }

    @Cacheable(value = "fipe-anos", key = "#tipo.name() + '-' + #marcaCodigo + '-' + #modeloCodigo")
    public List<FipeAnoResponse> getAnos(TipoVeiculo tipo, String marcaCodigo, String modeloCodigo) {
        return webClient.get()
            .uri("/{tipo}/marcas/{marca}/modelos/{modelo}/anos", 
                tipo.getFipeEndpoint(), marcaCodigo, modeloCodigo)
            .retrieve()
            .bodyToFlux(FipeAnoResponse.class)
            .collectList()
            .block();
    }

    @Cacheable(value = "fipe-preco", key = "#tipo.name() + '-' + #marcaCodigo + '-' + #modeloCodigo + '-' + #anoCodigo")
    public FipePrecoResponse getPreco(TipoVeiculo tipo, String marcaCodigo, 
                                       String modeloCodigo, String anoCodigo) {
        return webClient.get()
            .uri("/{tipo}/marcas/{marca}/modelos/{modelo}/anos/{ano}",
                tipo.getFipeEndpoint(), marcaCodigo, modeloCodigo, anoCodigo)
            .retrieve()
            .bodyToMono(FipePrecoResponse.class)
            .block();
    }

    // Response DTOs
    public record FipeMarcaResponse(String codigo, String nome) {}

    public record FipeModelosResponse(
        List<FipeModeloItem> modelos,
        List<FipeAnoResponse> anos
    ) {}

    public record FipeModeloItem(int codigo, String nome) {}

    public record FipeAnoResponse(String codigo, String nome) {}

    public record FipePrecoResponse(
        String Valor,
        String Marca,
        String Modelo,
        int AnoModelo,
        String Combustivel,
        String CodigoFipe,
        String MesReferencia,
        int TipoVeiculo,
        String SiglaCombustivel
    ) {}
}



