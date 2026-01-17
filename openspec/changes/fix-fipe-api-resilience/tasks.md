# Tasks: Fix FIPE API Resilience

## 0. Enum Converter (CRÍTICO - Corrigir primeiro)

- [x] 0.1 Criar `StringToTipoVeiculoConverter` em `config/`
  - Implementar `Converter<String, TipoVeiculo>`
  - Converter para uppercase antes de chamar `valueOf()`
  - Tratar `IllegalArgumentException` para valores inválidos

- [x] 0.2 Registrar o converter (Spring Boot auto-detecta @Component)
  - Verificar que o converter é carregado automaticamente
  - Se necessário, criar `WebMvcConfiguration` para registro explícito

## 1. Dependencies

- [x] 1.1 Adicionar `spring-boot-starter-aop` ao `pom.xml` (após Resilience4j dependencies)

## 2. Exception Handling

- [x] 2.1 Criar `FipeApiException` em `domain/exception/`
  - Deve estender `RuntimeException`
  - Incluir campo para HTTP status code
  - Incluir mensagem descritiva

- [x] 2.2 Atualizar `GlobalExceptionHandler` para tratar `FipeApiException`
  - Retornar HTTP 503 (Service Unavailable)
  - Log de warning com detalhes do erro

## 3. FipeClient Updates

- [x] 3.1 Adicionar tratamento de erros HTTP com `.onStatus()`
  - Tratar erros 4xx como `FipeApiException` (cliente)
  - Tratar erros 5xx como `FipeApiException` (servidor)

- [x] 3.2 Adicionar logging para requests/responses
  - Log DEBUG para URL sendo chamada
  - Log WARN para erros

## 4. FipeAdapter Updates

- [x] 4.1 Atualizar `getMarcasFallback` para lançar `ServicoIndisponivelException`
  - Remover retorno de lista vazia
  - Incluir causa original no log

- [x] 4.2 Atualizar `getModelosFallback` para lançar `ServicoIndisponivelException`
  - Remover retorno de lista vazia

- [x] 4.3 Atualizar `getAnosFallback` para lançar `ServicoIndisponivelException`
  - Remover retorno de lista vazia

- [x] 4.4 Manter `getPrecoFipeFallback` como está (já lança exceção)

## 5. Testing

- [ ] 5.1 Testar localmente que CircuitBreaker está funcionando
  - Verificar logs de abertura/fechamento do circuit
  - Simular falha da API (desconectar internet ou mock)

- [ ] 5.2 Verificar que endpoints retornam 503 quando API FIPE indisponível
  - GET `/api/v1/veiculos/carro/marcas` deve retornar 503, não 500

## 6. Validation

- [x] 6.1 Executar `mvn verify` para garantir que build passa (CI/CD validará)
- [ ] 6.2 Verificar que `/actuator/health` mostra status do CircuitBreaker

## Dependencies Between Tasks

```
0.1 ──> 0.2 (pode ser feito em paralelo com todo o resto)

1.1 ──┬──> 2.1 ──> 2.2
      │
      └──> 3.1 ──> 3.2 ──> 4.1 ──> 4.2 ──> 4.3 ──> 5.1 ──> 5.2 ──> 6.1 ──> 6.2
```

## Parallelizable Work

- **Task 0.x (Enum Converter)** pode ser feita IMEDIATAMENTE e resolve o erro de conversão
- Tasks 2.x (Exception handling) podem ser feitas em paralelo com 3.x (FipeClient)
- Task 1.1 é pré-requisito para CircuitBreaker funcionar

## Priority Order

1. **0.1, 0.2** - Fix crítico para enum converter (resolve erro imediato)
2. **1.1** - Adicionar AOP (habilita CircuitBreaker)
3. **2.x, 3.x, 4.x** - Melhorias de error handling
