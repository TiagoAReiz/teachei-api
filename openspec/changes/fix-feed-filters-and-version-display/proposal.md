# Change: Corrigir Filtros do Feed e Display de Versões

## Why

O feed apresenta três problemas críticos:
1. **Filtros não funcionam**: Os filtros de ano (anoMin/anoMax), preço (precoMin/precoMax), opcionais e busca textual não estão sendo processados pelo backend - apenas o filtro de modelo funciona. O frontend envia parâmetros que o backend não reconhece.
2. **Padrão de busca diferente do anúncio**: A busca deveria seguir o mesmo padrão do fluxo de criação de anúncio, onde primeiro se seleciona o modelo base e depois as versões específicas.
3. **Display de versões incorreto**: Quando múltiplas versões são selecionadas, o card mostra a primeira versão no nome (ex: "Onix 1.0 LT 5p"). As versões deveriam aparecer como chips (igual às cores), com overflow "+N" se não couberem.

## What Changes

### 1. Backend: Suporte Completo a Filtros
- **ADICIONADO**: Parâmetros `anoMin`, `anoMax` para filtro por faixa de anos
- **ADICIONADO**: Parâmetro `precoMax` para filtro por preço máximo
- **ADICIONADO**: Parâmetro `search` para busca textual (marca, modelo, observações)
- **ADICIONADO**: Parâmetro `opcionais` para filtrar por opcionais específicos
- **MODIFICADO**: Frontend passa parâmetros corretos para o backend

### 2. Backend: Modelo de Dados para Múltiplas Versões
- **ADICIONADO**: Campo `modeloBaseNome` em VeiculoInfo para nome do modelo base
- **ADICIONADO**: Campo `versoes` em VeiculoInfo como lista de versões selecionadas `[{codigo, nome}]`
- **ADICIONADO**: Campo `todasVersoes` em VeiculoInfo como boolean
- **MODIFICADO**: Endpoint de criação aceita novos campos
- **MODIFICADO**: Response inclui novos campos

### 3. Frontend: Display de Versões e Opcionais como Chips
- **MODIFICADO**: Card de intenção mostra apenas modelo base no título (ex: "Chevrolet Onix")
- **ADICIONADO**: Seção de chips para versões (igual às cores)
- **ADICIONADO**: Seção de chips para opcionais (igual às cores)
- **ADICIONADO**: Badge "+N" quando versões/opcionais excedem área visível
- **ADICIONADO**: Badge "Todas as versões" quando `todasVersoes=true`

### 4. Frontend: UX de Seleção Hierárquica nos Filtros
- **ADICIONADO**: Aviso "Selecione um tipo de veículo primeiro" acima do campo de marca quando tipo não selecionado
- **ADICIONADO**: Aviso "Selecione uma marca primeiro" acima do campo de modelo quando marca não selecionada
- **MODIFICADO**: Campos desabilitados mostram mensagem de orientação ao invés de ficarem apenas cinza

### 5. Frontend: Novo Layout de Navegação (Desktop)
- **MODIFICADO**: Header exibe abas de navegação e configurações apenas com ícones
- **ADICIONADO**: Sidebar lateral esquerda fixa com filtros sempre visíveis (colapsável)
- **REMOVIDO**: Botão "Filtrar" que abria modal/drawer de filtros
- **MODIFICADO**: Layout do feed usa grid com sidebar + conteúdo principal

## Impact

- **Affected specs**: 
  - `backend-filters` (novo)
  - `version-data-model` (novo)
  - `web-version-display` (novo)
  - `web-filter-ux` (novo)
  - `web-navigation-layout` (novo)
- **Affected code**:
  - Backend:
    - `AnuncioController.java` (novos parâmetros de filtro)
    - `BuscarAnunciosUseCase.java` (novo FiltroAnuncio)
    - `AnuncioCosmosAdapter.java` (implementar filtros)
    - `VeiculoInfo.java` (novos campos)
    - `CriarAnuncioRequest.java` (novos campos)
    - `AnuncioResponse.java` (novos campos)
  - Frontend:
    - `lib/intentions.ts` (enviar todos os filtros)
    - `components/intentions/intention-card.tsx` (display de versões e opcionais)
    - `components/intentions/filter-sidebar.tsx` (sidebar fixa com filtros)
    - `components/layout/header.tsx` (navegação com ícones)
    - `components/layout/sidebar.tsx` (novo - sidebar colapsável)
    - `app/(main)/layout.tsx` (novo layout com sidebar)
    - `app/intention/[id]/client.tsx` (display completo de versões e opcionais)
    - `types/index.ts` (novos campos em VeiculoResponse)
