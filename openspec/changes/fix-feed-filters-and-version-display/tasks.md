## 1. Backend: Corrigir Filtros
- [x] 1.1 Atualizar `FiltroAnuncio` em `BuscarAnunciosUseCase` para incluir `anoMin`, `anoMax`, `precoMax`, `search`, `opcionais`
- [x] 1.2 Atualizar `AnuncioController.listar()` para aceitar novos parâmetros: `anoMin`, `anoMax`, `precoMin`, `precoMax`, `search`, `opcionais`
- [x] 1.3 Atualizar `AnuncioCosmosAdapter.buscar()` para implementar lógica de filtros:
  - Ano: verificar se algum ano do anúncio está entre `anoMin` e `anoMax`
  - Preço: verificar se `precoMaximo` do anúncio é >= `precoMin` e <= `precoMax`
  - Search: buscar em `marcaNome`, `modeloNome`, `modeloBaseNome`, `observacoes`
  - Opcionais: verificar se anúncio contém todos os opcionais solicitados
- [ ] 1.4 Escrever testes para os novos filtros

## 2. Backend: Modelo de Dados para Versões
- [x] 2.1 Adicionar campos em `VeiculoInfo.java`: `modeloBaseNome`, `versoes` (List<VersaoInfo>), `todasVersoes`
- [x] 2.2 Criar classe `VersaoInfo.java` com `codigo` e `nome`
- [x] 2.3 Atualizar `CriarAnuncioRequest.java` para incluir novos campos
- [x] 2.4 Atualizar `VeiculoResponse.java` para incluir novos campos
- [x] 2.5 Atualizar `AnuncioDocumentMapper.java` para mapear novos campos
- [x] 2.6 Atualizar `AnuncioDocument.java` (Cosmos DB) para persistir novos campos
- [ ] 2.7 Escrever testes para criação de anúncio com múltiplas versões

## 3. Frontend: Enviar Filtros Corretos
- [x] 3.1 Atualizar `lib/intentions.ts` para enviar todos os parâmetros de filtro ao backend
- [x] 3.2 Atualizar `types/index.ts` para incluir todos os campos de filtro em `IntentionFilters`
- [x] 3.3 Atualizar página principal para ler novos parâmetros da URL

## 4. Frontend: Display de Versões e Opcionais como Chips
- [x] 4.1 Atualizar `types/index.ts` para incluir `modeloBaseNome`, `versoes`, `todasVersoes` em `VeiculoResponse`
- [x] 4.2 Atualizar `intention-card.tsx`:
  - Mostrar `marcaNome modeloBaseNome` no título (fallback para `modeloNome` se `modeloBaseNome` não existir)
  - Adicionar seção de chips para versões (igual às cores)
  - Adicionar seção de chips para opcionais (igual às cores)
  - Mostrar badge "Todas as versões" se `todasVersoes=true`
  - Mostrar "+N" se versões ou opcionais excederem limite visível
- [x] 4.3 Atualizar `intention/[id]/client.tsx` (página de detalhe):
  - Exibir lista completa de versões (sem limite)
  - Exibir lista completa de opcionais (sem limite)
- [ ] 4.4 Atualizar `app/create/vehicle/page.tsx` para enviar novos campos ao criar anúncio

## 5. Frontend: UX de Seleção Hierárquica nos Filtros
- [x] 5.1 Atualizar filtros com avisos:
  - Adicionar aviso "Selecione um tipo de veículo primeiro" acima do campo de marca quando `tipo` não selecionado
  - Adicionar aviso "Selecione uma marca primeiro" acima do campo de modelo quando `marca` não selecionada
- [x] 5.2 Estilizar avisos com cor de destaque (ex: amarelo/warning) para chamar atenção
- [x] 5.3 Manter campos desabilitados visualmente mas com mensagem explicativa

## 6. Frontend: Novo Layout de Navegação (Desktop)
- [x] 6.1 Atualizar `header.tsx`:
  - Mover navegação para o header
  - Usar apenas ícones para abas (Home, Favoritos, Meus Anúncios, etc.)
  - Ícones possuem tooltip ao hover
- [x] 6.2 Criar `components/layout/filter-panel.tsx`:
  - Sidebar lateral esquerda fixa com filtros
  - Contém todos os filtros diretamente visíveis
  - Botão para colapsar/expandir sidebar
  - Estado de colapsado persiste (localStorage)
- [x] 6.3 Atualizar `components/layout/sidebar.tsx`:
  - Integrar FilterPanel
  - Gerenciar estado de colapso
- [x] 6.4 Atualizar `components/layout/main-layout.tsx`:
  - Layout responsivo com sidebar + área de conteúdo
  - Sidebar ocupa largura fixa (~288px ou ~48px quando colapsada)
  - Conteúdo principal ocupa resto da tela
- [x] 6.5 Ocultar botão "Filtrar" no desktop (visível apenas no mobile)
- [x] 6.6 Adaptar responsividade:
  - Desktop: sidebar sempre visível (colapsável)
  - Mobile: sidebar oculta, abre como drawer

## 7. Validação
- [ ] 7.1 Testar filtros de ano funcionando
- [ ] 7.2 Testar filtros de preço funcionando
- [ ] 7.3 Testar busca textual funcionando
- [ ] 7.4 Testar display de versões como chips no card
- [ ] 7.5 Testar display de opcionais como chips no card
- [ ] 7.6 Testar overflow "+N" em versões e opcionais
- [ ] 7.7 Testar avisos de seleção hierárquica nos filtros
- [ ] 7.8 Testar novo layout com sidebar no desktop
- [ ] 7.9 Testar colapsar/expandir sidebar
- [ ] 7.10 Testar responsividade mobile
