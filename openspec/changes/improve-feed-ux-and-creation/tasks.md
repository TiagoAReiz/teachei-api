## 1. Busca com Debounce
- [x] 1.1 Criar hook `useDebounce` em `hooks/use-debounce.ts`
- [x] 1.2 Atualizar `Header` para usar debounce de 200ms na busca
- [x] 1.3 Remover `handleSearch` por submit, usar apenas onChange debounced
- [x] 1.4 Testar busca em tempo real com diferentes velocidades de digitação

## 2. Filtros Avançados em Sidebar
- [x] 2.1 Criar componente `FilterSidebar` em `components/intentions/filter-sidebar.tsx`
- [x] 2.2 Adicionar estados para todos os filtros (tipo, marca, modelo, opcionais, preço, ano)
- [x] 2.3 Integrar com hooks `useMarcas` e `useModelos` para buscar dados
- [x] 2.4 Criar endpoint ou hook para buscar lista de opcionais do backend
- [x] 2.5 Adicionar filtros de faixa de preço (min/max) com `CurrencyInput`
- [x] 2.6 Adicionar filtros de faixa de ano (min/max) com `Select`
- [x] 2.7 Implementar botões "Aplicar Filtros" e "Limpar Filtros"
- [x] 2.8 Atualizar `IntentionFilters` para exibir apenas botão "Filtrar" com contador
- [x] 2.9 Adicionar animação de slide para sidebar
- [x] 2.10 Sincronizar filtros com URL (search params)
- [x] 2.11 Testar filtros combinados

## 3. Seleção de Modelo Base + Versões
- [x] 3.1 Criar função `groupModelsByBase` para agrupar modelos FIPE por nome base
- [x] 3.2 Atualizar `create-intention-store.ts` para suportar múltiplas versões
  - Adicionar `versoesSelecionadas: { codigo: string; nome: string }[]`
  - Adicionar `todasVersoes: boolean`
- [x] 3.3 Criar UI de seleção de modelo base (lista agrupada)
- [x] 3.4 Criar UI de seleção de versões (multi-select com checkboxes)
- [x] 3.5 Adicionar checkbox "Selecionar todas as versões"
- [x] 3.6 Atualizar `CreateAnuncioRequest` para suportar múltiplas versões
- [x] 3.7 Atualizar lógica de review para exibir versões selecionadas
- [x] 3.8 Testar fluxo completo de criação com múltiplas versões

## 4. Ícone na Página de Detalhes
- [x] 4.1 Remover seção "Hero Image" com imagem Unsplash em `intention/[id]/client.tsx`
- [x] 4.2 Criar área de ícone estilizada similar ao `IntentionCard`
- [x] 4.3 Usar ícone correto baseado no tipo (Car, Bike, Truck)
- [x] 4.4 Manter badges de tipo e ações (bookmark, share) sobre a área do ícone
- [x] 4.5 Ajustar altura e espaçamento para manter visual agradável
- [x] 4.6 Testar em diferentes tamanhos de tela (mobile/desktop)

## 5. Atualização de Tipos e API
- [x] 5.1 Criar tipo `ModeloAgrupado` com `baseNome` e `versoes: Modelo[]`
- [x] 5.2 Atualizar `IntentionFilters` para incluir `opcionais?: string[]`
- [x] 5.3 Atualizar `useInfiniteIntentions` para passar novos filtros
- [x] 5.4 Verificar se backend suporta filtro por opcionais (se não, criar issue)

## 6. Testes e Validação
- [x] 6.1 Testar busca com debounce não dispara requisições excessivas
- [x] 6.2 Testar filtros em sidebar atualizam URL corretamente
- [x] 6.3 Testar seleção de múltiplas versões persiste no store
- [x] 6.4 Testar página de detalhes renderiza ícone corretamente
- [x] 6.5 Testar responsividade em mobile
