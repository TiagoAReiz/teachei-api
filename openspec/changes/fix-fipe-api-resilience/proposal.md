# Change: Fix FIPE API Integration Resilience

## Why

A integração com a API FIPE está retornando erro 500 (Internal Server Error) em produção ao acessar o endpoint `/api/v1/veiculos/carro/marcas`. A investigação revelou múltiplos problemas:

### Problema 1: Circuit Breaker não funciona
O **Circuit Breaker do Resilience4j não está funcionando** porque a dependência `spring-boot-starter-aop` está ausente no projeto. Isso significa que as anotações `@CircuitBreaker` são ignoradas, e exceções da API externa propagam sem tratamento até o handler genérico, causando o erro 500.

### Problema 2: Falta tratamento de erros HTTP
O `FipeClient` não possui tratamento de erros HTTP adequado no `WebClient`, fazendo com que erros 4xx/5xx da API externa não sejam tratados antes de chegarem ao CircuitBreaker.

### Problema 3: Enum case-sensitive (CRÍTICO)
O enum `TipoVeiculo` usa valores em MAIÚSCULO (`CARRO`, `MOTO`, `CAMINHAO`) mas as URLs usam minúsculo (`/veiculos/carro/marcas`, `/veiculos/moto/marcas`). O Spring por padrão usa conversão case-sensitive, causando:
```
ConversionFailedException: Failed to convert from type [java.lang.String] to type [TipoVeiculo] for value [moto]
Caused by: IllegalArgumentException: No enum constant com.teachei.api.domain.model.TipoVeiculo.moto
```

## What Changes

### Infraestrutura (Dependencies)
- **CRITICAL**: Adicionar `spring-boot-starter-aop` ao `pom.xml` para habilitar proxies AOP que o Resilience4j requer
- Garantir que as anotações `@CircuitBreaker` funcionem corretamente

### Enum Converter (CRÍTICO - Fix imediato)
- **CRITICAL**: Criar `StringToTipoVeiculoConverter` para conversão case-insensitive
- Registrar o converter na configuração do Spring MVC
- URLs com `carro`, `moto`, `caminhao` devem funcionar corretamente

### FipeClient (Adapter)
- Adicionar tratamento de erros HTTP com `.onStatus()` no WebClient
- Melhorar logging para diagnóstico de problemas em produção
- Garantir que erros da API externa sejam convertidos em exceções apropriadas

### FipeAdapter (Port Implementation)
- Garantir que os métodos de fallback estejam funcionando corretamente
- Adicionar métricas/logs para monitoramento do circuit breaker
- Revisar comportamento de fallback para `getMarcas` (atualmente retorna lista vazia)

### Exception Handling
- Considerar lançar `ServicoIndisponivelException` no fallback de `getMarcas` para dar feedback claro ao usuário

## Impact

### Affected Specs
- `vehicle-data` - Modificação dos requisitos de resiliência da API

### Affected Code
- `pom.xml` - Adição de dependência AOP
- `TipoVeiculo.java` - Adicionar método de conversão case-insensitive
- `WebMvcConfiguration.java` (novo) - Registrar converter customizado
- `FipeClient.java` - Tratamento de erros HTTP
- `FipeAdapter.java` - Revisão dos métodos de fallback
- `GlobalExceptionHandler.java` - Potencial ajuste no tratamento de exceções

### Risk Assessment
- **Baixo risco**: A mudança é localizada e resolve um bug existente
- **Sem breaking changes**: APIs públicas permanecem inalteradas
- **Rollback simples**: Em caso de problemas, reverter o commit

### Monitoring
- Logs do CircuitBreaker devem aparecer quando a API externa falhar
- Métricas do Resilience4j disponíveis via Actuator (`/actuator/health`)
