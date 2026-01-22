## ADDED Requirements

### Requirement: Filtro de Ano por Faixa
O backend SHALL suportar filtro de anúncios por faixa de anos através dos parâmetros `anoMin` e `anoMax`.

#### Scenario: Filtrar por ano mínimo
- **WHEN** requisição GET `/v1/anuncios?anoMin=2020`
- **THEN** retorna apenas anúncios que possuem pelo menos um ano >= 2020 na lista de anos

#### Scenario: Filtrar por ano máximo
- **WHEN** requisição GET `/v1/anuncios?anoMax=2022`
- **THEN** retorna apenas anúncios que possuem pelo menos um ano <= 2022 na lista de anos

#### Scenario: Filtrar por faixa de anos
- **WHEN** requisição GET `/v1/anuncios?anoMin=2020&anoMax=2022`
- **THEN** retorna apenas anúncios que possuem pelo menos um ano entre 2020 e 2022 na lista de anos

### Requirement: Filtro de Preço por Faixa
O backend SHALL suportar filtro de anúncios por faixa de preço através dos parâmetros `precoMin` e `precoMax`.

#### Scenario: Filtrar por preço mínimo
- **WHEN** requisição GET `/v1/anuncios?precoMin=50000`
- **THEN** retorna apenas anúncios cujo `precoMaximo` é >= 50000

#### Scenario: Filtrar por preço máximo
- **WHEN** requisição GET `/v1/anuncios?precoMax=100000`
- **THEN** retorna apenas anúncios cujo `precoMaximo` é <= 100000

#### Scenario: Filtrar por faixa de preço
- **WHEN** requisição GET `/v1/anuncios?precoMin=50000&precoMax=100000`
- **THEN** retorna apenas anúncios cujo `precoMaximo` está entre 50000 e 100000

### Requirement: Busca Textual
O backend SHALL suportar busca textual através do parâmetro `search`.

#### Scenario: Buscar por marca
- **WHEN** requisição GET `/v1/anuncios?search=chevrolet`
- **THEN** retorna anúncios cuja `marcaNome` contém "chevrolet" (case-insensitive)

#### Scenario: Buscar por modelo
- **WHEN** requisição GET `/v1/anuncios?search=onix`
- **THEN** retorna anúncios cujo `modeloNome` ou `modeloBaseNome` contém "onix" (case-insensitive)

#### Scenario: Buscar em observações
- **WHEN** requisição GET `/v1/anuncios?search=automatico`
- **THEN** retorna anúncios cuja `observacoes` contém "automatico" (case-insensitive)

### Requirement: Filtro de Opcionais
O backend SHALL suportar filtro de anúncios por opcionais através do parâmetro `opcionais`.

#### Scenario: Filtrar por um opcional
- **WHEN** requisição GET `/v1/anuncios?opcionais=AR_CONDICIONADO`
- **THEN** retorna apenas anúncios que possuem "AR_CONDICIONADO" na lista de opcionais

#### Scenario: Filtrar por múltiplos opcionais
- **WHEN** requisição GET `/v1/anuncios?opcionais=AR_CONDICIONADO,DIRECAO_HIDRAULICA`
- **THEN** retorna apenas anúncios que possuem TODOS os opcionais especificados

### Requirement: Compatibilidade com Parâmetros Legados
O backend SHALL manter compatibilidade com parâmetros legados enquanto suporta os novos.

#### Scenario: Parâmetro ano legado
- **WHEN** requisição GET `/v1/anuncios?ano=2021`
- **THEN** funciona como `anoMin=2021&anoMax=2021`

#### Scenario: Parâmetro precoMinimo legado
- **WHEN** requisição GET `/v1/anuncios?precoMinimo=50000`
- **THEN** funciona como `precoMin=50000`
