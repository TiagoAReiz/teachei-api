package com.teachei.api.adapter.in.web.controller;

import com.teachei.api.adapter.in.web.dto.request.AtualizarAnuncioRequest;
import com.teachei.api.adapter.in.web.dto.request.CriarAnuncioRequest;
import com.teachei.api.adapter.in.web.dto.response.AnuncioResponse;
import com.teachei.api.adapter.in.web.dto.response.PaginaResponse;
import com.teachei.api.application.ports.in.*;
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
    private final AtualizarAnuncioUseCase atualizarAnuncioUseCase;
    private final ExcluirAnuncioUseCase excluirAnuncioUseCase;
    private final FinalizarAnuncioUseCase finalizarAnuncioUseCase;
    private final VerificarAssinaturaUseCase verificarAssinaturaUseCase;

    public AnuncioController(CriarAnuncioUseCase criarAnuncioUseCase,
                             BuscarAnunciosUseCase buscarAnunciosUseCase,
                             AtualizarAnuncioUseCase atualizarAnuncioUseCase,
                             ExcluirAnuncioUseCase excluirAnuncioUseCase,
                             FinalizarAnuncioUseCase finalizarAnuncioUseCase,
                             VerificarAssinaturaUseCase verificarAssinaturaUseCase) {
        this.criarAnuncioUseCase = criarAnuncioUseCase;
        this.buscarAnunciosUseCase = buscarAnunciosUseCase;
        this.atualizarAnuncioUseCase = atualizarAnuncioUseCase;
        this.excluirAnuncioUseCase = excluirAnuncioUseCase;
        this.finalizarAnuncioUseCase = finalizarAnuncioUseCase;
        this.verificarAssinaturaUseCase = verificarAssinaturaUseCase;
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
            request.quilometragemMinima(),
            request.quilometragemMaxima(),
            request.opcionais(),
            request.observacoes(),
            request.dadosManuais(),
            request.cidade(),
            request.estado()
        );

        var anuncio = criarAnuncioUseCase.executar(currentUser.getId(), command);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(AnuncioResponse.fromDomain(anuncio));
    }

    @GetMapping
    public ResponseEntity<PaginaResponse<AnuncioResponse>> listar(
            @AuthenticationPrincipal CurrentUser currentUser,
            // Accept both 'tipo' and 'tipoVeiculo' parameter names
            @RequestParam(required = false) TipoVeiculo tipo,
            @RequestParam(required = false) TipoVeiculo tipoVeiculo,
            @RequestParam(required = false) String marcaCodigo,
            @RequestParam(required = false) String modeloCodigo,
            @RequestParam(required = false) Integer ano,
            @RequestParam(required = false) BigDecimal precoMinimo,
            @RequestParam(required = false) String cidade,
            @RequestParam(required = false) String estado,
            // Accept both 'page'/'pagina' and 'size'/'tamanho' parameter names
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) Integer pagina,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) Integer tamanho) {

        // Use first non-null value for each parameter
        TipoVeiculo tipoFinal = tipo != null ? tipo : tipoVeiculo;
        int pageFinal = pagina != null ? pagina : page;
        int sizeFinal = tamanho != null ? tamanho : size;

        var filtro = new BuscarAnunciosUseCase.FiltroAnuncio(
            tipoFinal, marcaCodigo, modeloCodigo, ano, precoMinimo, cidade, estado);

        var resultado = buscarAnunciosUseCase.buscar(filtro, pageFinal, sizeFinal);

        // Check if user has active subscription
        boolean assinaturaAtiva = currentUser != null && 
            verificarAssinaturaUseCase.temAssinaturaAtiva(currentUser.getId());

        List<AnuncioResponse> content = resultado.items().stream()
            .map(anuncio -> {
                // Owner always sees their own contact info
                boolean isOwner = currentUser != null && 
                    anuncio.getUsuarioId().equals(currentUser.getId());
                boolean ocultarContato = !isOwner && !assinaturaAtiva;
                return AnuncioResponse.fromDomain(anuncio, ocultarContato, assinaturaAtiva);
            })
            .toList();

        return ResponseEntity.ok(PaginaResponse.of(
            content,
            resultado.pagina(),
            resultado.tamanho(),
            resultado.total(),
            resultado.totalPaginas()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnuncioResponse> buscarPorId(
            @AuthenticationPrincipal CurrentUser currentUser,
            @PathVariable String id) {
        var anuncio = buscarAnunciosUseCase.buscarPorId(id);
        
        // Check if user has active subscription
        boolean assinaturaAtiva = currentUser != null && 
            verificarAssinaturaUseCase.temAssinaturaAtiva(currentUser.getId());
        
        // Owner always sees their own contact info
        boolean isOwner = currentUser != null && 
            anuncio.getUsuarioId().equals(currentUser.getId());
        boolean ocultarContato = !isOwner && !assinaturaAtiva;
        
        return ResponseEntity.ok(AnuncioResponse.fromDomain(anuncio, ocultarContato, assinaturaAtiva));
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

    @PutMapping("/{id}")
    public ResponseEntity<AnuncioResponse> atualizar(
            @AuthenticationPrincipal CurrentUser currentUser,
            @PathVariable String id,
            @Valid @RequestBody AtualizarAnuncioRequest request) {
        
        var command = new AtualizarAnuncioUseCase.AtualizarAnuncioCommand(
            request.anos(),
            request.cores(),
            request.precoMaximo(),
            request.observacoes()
        );

        var anuncio = atualizarAnuncioUseCase.executar(currentUser.getId(), id, command);
        return ResponseEntity.ok(AnuncioResponse.fromDomain(anuncio));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @AuthenticationPrincipal CurrentUser currentUser,
            @PathVariable String id) {
        
        excluirAnuncioUseCase.executar(currentUser.getId(), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/finalizar")
    public ResponseEntity<AnuncioResponse> finalizar(
            @AuthenticationPrincipal CurrentUser currentUser,
            @PathVariable String id) {
        
        var anuncio = finalizarAnuncioUseCase.executar(currentUser.getId(), id);
        return ResponseEntity.ok(AnuncioResponse.fromDomain(anuncio));
    }
}



