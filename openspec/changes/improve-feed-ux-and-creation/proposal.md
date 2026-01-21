# Change: Melhorar UX do Feed e Fluxo de Criação de Anúncio

## Why

O feed atual apresenta problemas de usabilidade: busca por nome não funciona em tempo real (só no submit), filtros avançados ocupam espaço visual desnecessário, e a página de detalhes usa uma foto genérica de carro que não agrega valor. Além disso, o fluxo de criação exige que o usuário selecione uma versão específica do modelo (ex: "Onix LT 5p 8w") quando muitas vezes ele aceita qualquer versão do mesmo modelo base (ex: "Onix").

## What Changes

### 1. Busca com Debounce (200ms)
- **MODIFICADO**: Busca agora dispara automaticamente após 200ms de pausa na digitação
- Remove necessidade de pressionar Enter ou clicar em buscar
- Melhora experiência de busca em tempo real

### 2. Filtros Avançados em Sidebar
- **MODIFICADO**: Substituir filtros inline por botão "Filtrar"
- **ADICIONADO**: Sidebar deslizante com filtros completos:
  - Tipo de veículo (CARRO, MOTO, CAMINHÃO)
  - Marca (busca do backend)
  - Modelo (busca do backend)
  - Opcionais (lista do backend)
  - Faixa de preço
  - Faixa de ano
- Botões "Aplicar" e "Limpar filtros"
- Contador de filtros ativos no botão

### 3. Seleção de Modelo Base + Versões
- **MODIFICADO**: Fluxo de seleção de veículo na criação
- Primeiro passo: Selecionar modelo BASE agrupado (ex: "Onix", "HB20", "Civic")
- Segundo passo: Selecionar uma ou mais VERSÕES específicas
- **ADICIONADO**: Opção "Selecionar todas as versões"
- Multi-select de versões com checkboxes

### 4. Ícone ao invés de Foto na Página de Detalhes
- **REMOVIDO**: Imagem hero de placeholder (Unsplash)
- **ADICIONADO**: Ícone do tipo de veículo (Car/Bike/Truck) estilizado
- Mantém visual consistente com os cards do feed

## Impact

- **Affected specs**: 
  - `web-feed-filters` (novo)
  - `web-intention-detail`
  - `web-intention-creation`
- **Affected code**:
  - `components/layout/header.tsx` (busca com debounce)
  - `components/intentions/intention-filters.tsx` (filtros em sidebar)
  - `app/intention/[id]/client.tsx` (ícone ao invés de foto)
  - `app/create/vehicle/page.tsx` (seleção de modelo base + versões)
  - `stores/create-intention-store.ts` (suporte a múltiplas versões)
  - `types/index.ts` (novos tipos para versões agrupadas)
