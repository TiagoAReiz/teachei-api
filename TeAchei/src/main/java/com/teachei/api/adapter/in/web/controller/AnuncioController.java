package com.teachei.api.adapter.in.web.controller;

import com.teachei.api.adapter.in.web.dto.request.CriarAnuncioRequest;
import com.teachei.api.adapter.in.web.dto.response.AnuncioResponse;
import com.teachei.api.adapter.in.web.dto.response.PaginaResponse;
import com.teachei.api.application.ports.in.BuscarAnunciosUseCase;
import com.teachei.api.application.ports.in.CriarAnuncioUseCase;
import com.teachei.api.config.security.CurrentUser;
import com.teachei.api.domain.model.TipoVeiculo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/v1/anuncios")
public class AnuncioController {

    private final CriarAnuncioUseCase criarAnuncioUseCase;
    private final BuscarAnunciosUseCase buscarAnunciosUseCase;

    public AnuncioController(CriarAnuncioUseCase criarAnuncioUseCase,
                             BuscarAnunciosUseCase buscarAnunciosUseCase) {
        this.criarAnuncioUseCase = criarAnuncioUseCase;
        this.buscarAnunciosUseCase = buscarAnunciosUseCase;
    }

    @PostMapping
    public ResponseEntity<AnuncioResponse> criar(
            @AuthenticationPrincipal CurrentUser currentUser,
            @Valid @RequestBody CriarAnuncioRequest request) {
        
        var command = new CriarAnuncioUseCase.CriarAnuncioCommand(
            request.tipo(),
            request.marcaCodigo(),
            request.marcaNome(),
            request.modeloCodigo(),
            request.modeloNome(),
            request.anos(),
            request.cores(),
            request.precoMaximo(),
            request.observacoes(),
            request.dadosManuais()
        );

        var anuncio = criarAnuncioUseCase.executar(currentUser.getId(), command);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(AnuncioResponse.fromDomain(anuncio));
    }

    @GetMapping
    public ResponseEntity<PaginaResponse<AnuncioResponse>> listar(
            @RequestParam(required = false) TipoVeiculo tipo,
            @RequestParam(required = false) String marcaCodigo,
            @RequestParam(required = false) String modeloCodigo,
            @RequestParam(required = false) Integer ano,
            @RequestParam(required = false) BigDecimal precoMinimo,
            @RequestParam(required = false) String cidade,
            @RequestParam(required = false) String estado,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "20") int tamanho) {

        var filtro = new BuscarAnunciosUseCase.FiltroAnuncio(
            tipo, marcaCodigo, modeloCodigo, ano, precoMinimo, cidade, estado);

        var resultado = buscarAnunciosUseCase.buscar(filtro, pagina, tamanho);

        List<AnuncioResponse> items = resultado.items().stream()
            .map(AnuncioResponse::fromDomain)
            .toList();

        return ResponseEntity.ok(PaginaResponse.of(
            items,
            resultado.pagina(),
            resultado.tamanho(),
            resultado.total(),
            resultado.totalPaginas()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnuncioResponse> buscarPorId(@PathVariable String id) {
        var anuncio = buscarAnunciosUseCase.buscarPorId(id);
        return ResponseEntity.ok(AnuncioResponse.fromDomain(anuncio));
    }

    @GetMapping("/meus")
    public ResponseEntity<List<AnuncioResponse>> meusAnuncios(
            @AuthenticationPrincipal CurrentUser currentUser) {
        var anuncios = buscarAnunciosUseCase.buscarPorUsuario(currentUser.getId());
        var response = anuncios.stream()
            .map(AnuncioResponse::fromDomain)
            .toList();
        return ResponseEntity.ok(response);
    }
}



