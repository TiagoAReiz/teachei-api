## ADDED Requirements

### Requirement: Display de Modelo Base no Título do Card
O card de intenção SHALL exibir apenas o modelo base no título, não a versão completa.

#### Scenario: Card com modelo base disponível
- **WHEN** anúncio possui `modeloBaseNome: "Onix"`
- **THEN** título do card exibe "Chevrolet Onix"

#### Scenario: Card com fallback para modelo legado
- **WHEN** anúncio não possui `modeloBaseNome` (anúncio antigo)
- **THEN** título do card exibe `marcaNome + modeloNome` como antes

### Requirement: Versões Exibidas como Chips
O card de intenção SHALL exibir versões selecionadas como chips, similar às cores.

#### Scenario: Exibir versões como chips
- **WHEN** anúncio possui versões ["1.0 LT 5p", "1.4 Premier"]
- **THEN** card exibe chips: [1.0 LT 5p] [1.4 Premier]

#### Scenario: Overflow de versões com badge +N
- **WHEN** anúncio possui 5 versões
- **THEN** card exibe: [1.0 LT] [1.4 Premier] [+3]

#### Scenario: Todas as versões
- **WHEN** anúncio possui `todasVersoes: true`
- **THEN** card exibe badge único: [Todas as versões]

#### Scenario: Sem versões estruturadas (legado)
- **WHEN** anúncio antigo não possui `versoes`
- **THEN** não exibe seção de chips de versões

### Requirement: Limite de Chips Visíveis
O card SHALL limitar chips visíveis para evitar overflow visual.

#### Scenario: Limite de 2 versões visíveis
- **WHEN** há mais de 2 versões
- **THEN** exibe 2 chips + badge "+N" com contagem restante

#### Scenario: Limite de 3 cores visíveis (existente)
- **WHEN** há mais de 3 cores
- **THEN** exibe 3 chips + badge "+N" com contagem restante

### Requirement: Página de Detalhe com Versões
A página de detalhe da intenção SHALL exibir todas as versões selecionadas.

#### Scenario: Listar todas as versões no detalhe
- **WHEN** usuário acessa página de detalhe
- **THEN** exibe lista completa de versões (sem limite de overflow)

#### Scenario: Indicar todas as versões aceitas
- **WHEN** anúncio tem `todasVersoes: true`
- **THEN** exibe mensagem "Aceita qualquer versão do modelo"

### Requirement: Opcionais Exibidos como Chips
O card de intenção SHALL exibir opcionais selecionados como chips, similar às cores.

#### Scenario: Exibir opcionais como chips
- **WHEN** anúncio possui opcionais ["Ar Condicionado", "Direção Hidráulica", "Vidros Elétricos"]
- **THEN** card exibe chips: [Ar Condicionado] [Direção Hidráulica] [+1]

#### Scenario: Overflow de opcionais com badge +N
- **WHEN** anúncio possui mais de 2 opcionais
- **THEN** card exibe 2 chips + badge "+N" com contagem restante

#### Scenario: Sem opcionais
- **WHEN** anúncio não possui opcionais
- **THEN** não exibe seção de chips de opcionais

### Requirement: Página de Detalhe com Opcionais Completos
A página de detalhe da intenção SHALL exibir todos os opcionais selecionados.

#### Scenario: Listar todos os opcionais no detalhe
- **WHEN** usuário acessa página de detalhe de anúncio com opcionais
- **THEN** exibe lista completa de opcionais (sem limite de overflow)

## MODIFIED Requirements

### Requirement: Frontend Envia Filtros Corretos
O frontend SHALL enviar todos os parâmetros de filtro ao backend.

#### Scenario: Enviar filtros de ano
- **WHEN** usuário define filtro de ano 2020-2023
- **THEN** requisição inclui `anoMin=2020&anoMax=2023`

#### Scenario: Enviar filtros de preço
- **WHEN** usuário define filtro de preço R$50.000 - R$100.000
- **THEN** requisição inclui `precoMin=50000&precoMax=100000`

#### Scenario: Enviar busca textual
- **WHEN** usuário digita "onix" na busca
- **THEN** requisição inclui `search=onix`

#### Scenario: Enviar opcionais
- **WHEN** usuário seleciona opcionais [AR_CONDICIONADO, DIRECAO_HIDRAULICA]
- **THEN** requisição inclui `opcionais=AR_CONDICIONADO,DIRECAO_HIDRAULICA`
