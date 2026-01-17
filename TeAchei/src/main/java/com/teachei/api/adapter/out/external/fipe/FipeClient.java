package com.teachei.api.adapter.out.external.fipe;

import com.teachei.api.domain.exception.FipeApiException;
import com.teachei.api.domain.model.TipoVeiculo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class FipeClient {

    private static final Logger log = LoggerFactory.getLogger(FipeClient.class);

    private final WebClient webClient;

    public FipeClient(@Value("${fipe.base-url}") String baseUrl, WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
            .baseUrl(baseUrl)
            .build();
    }

    @Cacheable(value = "fipe-marcas", key = "#tipo.name()")
    public List<FipeMarcaResponse> getMarcas(TipoVeiculo tipo) {
        String uri = "/" + tipo.getFipeEndpoint() + "/marcas";
        log.debug("FIPE API: GET {}", uri);
        
        return webClient.get()
            .uri("/{tipo}/marcas", tipo.getFipeEndpoint())
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, response ->
                Mono.error(new FipeApiException("Erro de cliente na API FIPE", response.statusCode())))
            .onStatus(HttpStatusCode::is5xxServerError, response ->
                Mono.error(new FipeApiException("Erro no servidor da API FIPE", response.statusCode())))
            .bodyToFlux(FipeMarcaResponse.class)
            .collectList()
            .block();
    }

    @Cacheable(value = "fipe-modelos", key = "#tipo.name() + '-' + #marcaCodigo")
    public FipeModelosResponse getModelos(TipoVeiculo tipo, String marcaCodigo) {
        log.debug("FIPE API: GET /{}/marcas/{}/modelos", tipo.getFipeEndpoint(), marcaCodigo);
        
        return webClient.get()
            .uri("/{tipo}/marcas/{marca}/modelos", tipo.getFipeEndpoint(), marcaCodigo)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, response ->
                Mono.error(new FipeApiException("Erro de cliente na API FIPE", response.statusCode())))
            .onStatus(HttpStatusCode::is5xxServerError, response ->
                Mono.error(new FipeApiException("Erro no servidor da API FIPE", response.statusCode())))
            .bodyToMono(FipeModelosResponse.class)
            .block();
    }

    @Cacheable(value = "fipe-anos", key = "#tipo.name() + '-' + #marcaCodigo + '-' + #modeloCodigo")
    public List<FipeAnoResponse> getAnos(TipoVeiculo tipo, String marcaCodigo, String modeloCodigo) {
        log.debug("FIPE API: GET /{}/marcas/{}/modelos/{}/anos", 
            tipo.getFipeEndpoint(), marcaCodigo, modeloCodigo);
        
        return webClient.get()
            .uri("/{tipo}/marcas/{marca}/modelos/{modelo}/anos", 
                tipo.getFipeEndpoint(), marcaCodigo, modeloCodigo)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, response ->
                Mono.error(new FipeApiException("Erro de cliente na API FIPE", response.statusCode())))
            .onStatus(HttpStatusCode::is5xxServerError, response ->
                Mono.error(new FipeApiException("Erro no servidor da API FIPE", response.statusCode())))
            .bodyToFlux(FipeAnoResponse.class)
            .collectList()
            .block();
    }

    @Cacheable(value = "fipe-preco", key = "#tipo.name() + '-' + #marcaCodigo + '-' + #modeloCodigo + '-' + #anoCodigo")
    public FipePrecoResponse getPreco(TipoVeiculo tipo, String marcaCodigo, 
                                       String modeloCodigo, String anoCodigo) {
        log.debug("FIPE API: GET /{}/marcas/{}/modelos/{}/anos/{}", 
            tipo.getFipeEndpoint(), marcaCodigo, modeloCodigo, anoCodigo);
        
        return webClient.get()
            .uri("/{tipo}/marcas/{marca}/modelos/{modelo}/anos/{ano}",
                tipo.getFipeEndpoint(), marcaCodigo, modeloCodigo, anoCodigo)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, response ->
                Mono.error(new FipeApiException("Erro de cliente na API FIPE", response.statusCode())))
            .onStatus(HttpStatusCode::is5xxServerError, response ->
                Mono.error(new FipeApiException("Erro no servidor da API FIPE", response.statusCode())))
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



