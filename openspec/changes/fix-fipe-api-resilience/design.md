# Design: FIPE API Resilience Fix

## Context

O TeAchei depende da API pública FIPE (parallelum.com.br) para fornecer dados de marcas, modelos, anos e preços de veículos. Esta API é externa e pode estar indisponível, lenta, ou retornar erros. O sistema precisa ser resiliente a essas falhas.

### Stakeholders
- **Usuários compradores**: Precisam selecionar veículos ao criar intenções de compra
- **Equipe de operações**: Precisa visibilidade sobre falhas e métricas
- **Desenvolvedores**: Precisam de logs claros para debugging

### Constraints
- A API FIPE é pública e sem SLA garantido
- Não podemos fazer muitas requisições (rate limiting potencial)
- Dados de veículos mudam mensalmente (atualização da tabela FIPE)

## Goals / Non-Goals

### Goals
1. O CircuitBreaker DEVE funcionar corretamente, abrindo após falhas consecutivas
2. Erros da API FIPE DEVEM ser tratados antes de chegarem ao handler genérico
3. Fallbacks DEVEM fornecer comportamento degradado aceitável
4. Logs DEVEM permitir diagnóstico de problemas em produção

### Non-Goals
- Implementar cache distribuído (Redis) - fora do escopo MVP
- Implementar fallback com dados estáticos locais - complexidade desnecessária
- Mudar de API externa (Parallelum para oficial FIPE) - funciona bem quando acessível

## Decisions

### Decision 0: Converter case-insensitive para TipoVeiculo (CRÍTICO)

**O que**: Criar converter customizado que aceita "carro", "CARRO", "Carro" etc.

**Por que**: As URLs da API usam lowercase (`/veiculos/carro/marcas`) mas o enum Java usa UPPERCASE (`TipoVeiculo.CARRO`). O Spring por padrão faz conversão case-sensitive, causando `IllegalArgumentException`.

**Implementação**:
```java
@Component
public class StringToTipoVeiculoConverter implements Converter<String, TipoVeiculo> {
    @Override
    public TipoVeiculo convert(String source) {
        return TipoVeiculo.valueOf(source.toUpperCase());
    }
}
```

**Alternativas consideradas**:
- Mudar URLs para UPPERCASE (`/veiculos/CARRO/marcas`) - Ruim para UX e SEO
- Usar `@JsonValue` no enum - Não funciona para path variables
- Adicionar método `fromString()` no enum - Requer configuração adicional

### Decision 1: Adicionar spring-boot-starter-aop

**O que**: Adicionar dependência `spring-boot-starter-aop` ao `pom.xml`

**Por que**: O Resilience4j usa proxies AOP para interceptar métodos anotados com `@CircuitBreaker`. Sem AOP, as anotações são simplesmente ignoradas.

**Alternativas consideradas**:
- Usar programmatic CircuitBreaker (sem anotações) - Mais verboso, menos legível
- Remover Resilience4j e usar try-catch manual - Perde métricas e estado do circuit

### Decision 2: Tratamento de erros HTTP no WebClient

**O que**: Adicionar `.onStatus()` handlers no WebClient para converter erros HTTP em exceções específicas

**Por que**: Por padrão, WebClient propaga `WebClientResponseException` que não é tratada pelo CircuitBreaker apropriadamente

**Implementação**:
```java
.retrieve()
.onStatus(HttpStatusCode::is4xxClientError, response ->
    Mono.error(new FipeApiException("Erro de cliente na API FIPE", response.statusCode())))
.onStatus(HttpStatusCode::is5xxServerError, response ->
    Mono.error(new FipeApiException("Erro no servidor da API FIPE", response.statusCode())))
```

### Decision 3: Fallback Strategy

**O que**: Revisar comportamento dos métodos de fallback

**Opções**:
| Cenário | Estratégia Atual | Estratégia Proposta |
|---------|------------------|---------------------|
| `getMarcas` falha | Retorna lista vazia | Lança `ServicoIndisponivelException` |
| `getModelos` falha | Retorna lista vazia | Lança `ServicoIndisponivelException` |
| `getAnos` falha | Retorna lista vazia | Lança `ServicoIndisponivelException` |
| `getPrecoFipe` falha | Lança exceção | Mantém (correto) |

**Justificativa**: Retornar lista vazia silenciosamente mascara o problema. O usuário vê um dropdown vazio sem entender o motivo. Lançar exceção permite que o frontend mostre mensagem apropriada ("Serviço temporariamente indisponível").

### Decision 4: Criar exceção específica FipeApiException

**O que**: Criar `FipeApiException extends RuntimeException` para erros específicos da API FIPE

**Por que**: Permite tratamento diferenciado no GlobalExceptionHandler e logs mais informativos

## Risks / Trade-offs

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| API FIPE offline por período longo | Média | Alto | Cache de 24h já implementado ameniza |
| Mudar fallback quebra UX existente | Baixa | Médio | Frontend já trata erros 503 |
| Overhead de AOP | Muito Baixa | Baixo | Spring AOP é bem otimizado |

## Migration Plan

### Steps
1. Adicionar dependência `spring-boot-starter-aop` ao `pom.xml`
2. Criar exceção `FipeApiException` no pacote de exceções de domínio
3. Atualizar `FipeClient` com tratamento de erros HTTP
4. Atualizar `FipeAdapter` fallbacks para lançar exceções
5. Adicionar handler para `FipeApiException` no `GlobalExceptionHandler`
6. Testar localmente com API FIPE indisponível (simular timeout)
7. Deploy e monitorar logs do CircuitBreaker

### Rollback
- Reverter commit em caso de problemas
- Não há migrações de dados ou schema changes

## Open Questions

1. **Cache stale serving**: Devemos servir dados em cache mesmo após expiração quando API está offline?
   - Decisão: Manter comportamento atual (Caffeine não serve stale por padrão)

2. **Métricas adicionais**: Devemos expor métricas do CircuitBreaker via Actuator?
   - Decisão: Já está configurado em `application.yml` com `register-health-indicator: true`
