package com.teachei.api.config;

import com.teachei.api.application.ports.in.*;
import com.teachei.api.application.ports.out.*;
import com.teachei.api.application.usecase.*;
import com.teachei.api.config.security.JwtService;
import com.teachei.api.domain.service.AnuncioService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class BeanConfiguration {

    @Value("${payment.price-per-ad:29.90}")
    private BigDecimal precoAnuncio;

    @Value("${app.base-url:http://localhost:8080}")
    private String appBaseUrl;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

    // Domain Services
    @Bean
    public AnuncioService anuncioService() {
        return new AnuncioService();
    }

    // Use Cases
    @Bean
    public RegistrarUsuarioUseCase registrarUsuarioUseCase(
            UsuarioRepositoryPort usuarioRepository,
            PerfilRepositoryPort perfilRepository,
            PasswordEncoderPort passwordEncoder,
            JwtService jwtService) {
        return new RegistrarUsuarioUseCaseImpl(usuarioRepository, perfilRepository, passwordEncoder, jwtService);
    }

    @Bean
    public AutenticarUsuarioUseCase autenticarUsuarioUseCase(
            UsuarioRepositoryPort usuarioRepository,
            PasswordEncoderPort passwordEncoder,
            JwtService jwtService) {
        return new AutenticarUsuarioUseCaseImpl(usuarioRepository, passwordEncoder, jwtService);
    }

    @Bean
    public AutenticarGoogleUseCase autenticarGoogleUseCase(
            GoogleAuthPort googleAuthPort,
            UsuarioRepositoryPort usuarioRepository,
            PerfilRepositoryPort perfilRepository,
            JwtService jwtService) {
        return new AutenticarGoogleUseCaseImpl(googleAuthPort, usuarioRepository, perfilRepository, jwtService);
    }

    @Bean
    public GerenciarPerfilUseCase gerenciarPerfilUseCase(
            PerfilRepositoryPort perfilRepository) {
        return new GerenciarPerfilUseCaseImpl(perfilRepository);
    }

    @Bean
    public CriarAnuncioUseCase criarAnuncioUseCase(
            AnuncioRepositoryPort anuncioRepository,
            PerfilRepositoryPort perfilRepository,
            AnuncioService anuncioService) {
        return new CriarAnuncioUseCaseImpl(anuncioRepository, perfilRepository, anuncioService);
    }

    @Bean
    public BuscarAnunciosUseCase buscarAnunciosUseCase(
            AnuncioRepositoryPort anuncioRepository) {
        return new BuscarAnunciosUseCaseImpl(anuncioRepository);
    }

    @Bean
    public AtualizarAnuncioUseCase atualizarAnuncioUseCase(
            AnuncioRepositoryPort anuncioRepository) {
        return new AtualizarAnuncioUseCaseImpl(anuncioRepository);
    }

    @Bean
    public ExcluirAnuncioUseCase excluirAnuncioUseCase(
            AnuncioRepositoryPort anuncioRepository) {
        return new ExcluirAnuncioUseCaseImpl(anuncioRepository);
    }

    @Bean
    public FinalizarAnuncioUseCase finalizarAnuncioUseCase(
            AnuncioRepositoryPort anuncioRepository) {
        return new FinalizarAnuncioUseCaseImpl(anuncioRepository);
    }

    @Bean
    public BuscarVeiculosUseCase buscarVeiculosUseCase(
            VeiculoDataPort veiculoDataPort) {
        return new BuscarVeiculosUseCaseImpl(veiculoDataPort);
    }

    @Bean
    public ProcessarPagamentoUseCase processarPagamentoUseCase(
            AnuncioRepositoryPort anuncioRepository,
            PagamentoPort pagamentoPort,
            TransacaoRepositoryPort transacaoRepository,
            AnuncioService anuncioService) {
        return new ProcessarPagamentoUseCaseImpl(
            anuncioRepository,
            pagamentoPort,
            transacaoRepository,
            anuncioService,
            precoAnuncio,
            appBaseUrl,
            frontendUrl
        );
    }
}



