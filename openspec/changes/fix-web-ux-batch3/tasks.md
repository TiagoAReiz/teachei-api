# Tasks

## 1. Correção URGENTE - Busca com Requisições Infinitas
- [x] 1.1 Corrigir `search-input.tsx` removendo `searchParams` das dependências do useEffect
- [x] 1.2 Aumentar debounce de 200ms para 500ms
- [x] 1.3 Adicionar verificação de estabilidade antes de navegar (usando refs)
- [x] 1.4 Limitar busca para match apenas em `marcaNome` e `modeloBaseNome` (backend já faz isso, placeholder atualizado)
- [x] 1.5 Testar busca não causa mais requisições infinitas

## 2. Validação de Faixa Min/Max nos Filtros
- [x] 2.1 Adicionar validação em `filter-sidebar.tsx` para ano (filtrar opções de max)
- [x] 2.2 Adicionar validação em `filter-sidebar.tsx` para preço (mostrar erro inline)
- [x] 2.3 Adicionar validação em `filter-panel.tsx` para ano (filtrar opções de max)
- [x] 2.4 Adicionar validação em `filter-panel.tsx` para preço (mostrar erro inline)
- [x] 2.5 Impedir aplicação de filtros quando validação falhar (botão desabilitado)

## 3. Correção Remoção de Filtros Range via X
- [x] 3.1 Criar função `removeRangeFilter` em `intention-filters.tsx`
- [x] 3.2 Atualizar handler do X de "Faixa de ano" para usar nova função
- [x] 3.3 Atualizar handler do X de "Faixa de preço" para usar nova função
- [x] 3.4 Testar que filtros são removidos em uma única navegação

## 4. Correção Filtro de Opcionais
- [x] 4.1 Verificar se `opcionais` está sendo passado corretamente para a API em `lib/intentions.ts`
- [x] 4.2 Verificar se `opcionais` está sendo lido corretamente da URL em `page.tsx`
- [x] 4.3 Debug do fluxo completo de opcionais (frontend → API → backend)
- [x] 4.4 Corrigir problema: enviar múltiplos parâmetros ao invés de comma-separated
- [x] 4.5 Testar filtro de opcionais funciona corretamente

## 5. Validação Obrigatória na Criação de Intenção
- [x] 5.1 Ano agora é obrigatório (validação adicionada em specs/page.tsx)
- [x] 5.2 Preço já era obrigatório, validação reforçada
- [x] 5.3 Adicionar "Qualquer cor" como opção padrão em `specs/page.tsx`
- [x] 5.4 Atualizar `specs/page.tsx` para validar campos obrigatórios antes de continuar
- [x] 5.5 Adicionar mensagens de erro inline para campos obrigatórios
- [x] 5.6 Desabilitar botão "Continuar" quando validação falhar

## 6. Validação Cidade/Estado na Review
- [x] 6.1 Adicionar estado `hasAttemptedPublish` em `review/page.tsx`
- [x] 6.2 Remover erro visual inicial de cidade/estado
- [x] 6.3 Mostrar erros apenas após primeira tentativa de publicar
- [x] 6.4 Manter toast de erro ao tentar publicar sem cidade/estado
- [x] 6.5 Testar fluxo completo de validação na review

## 7. Ícone de Favoritos
- [x] 7.1 Atualizar `favorites/page.tsx` para usar ícone Flag ao invés de Bookmark
- [x] 7.2 Estilizar ícone Flag com cores consistentes (primary)
- [x] 7.3 Testar visual consistência com o feed

## 8. Upload de Foto de Perfil - Backend
- [x] 8.1 Adicionar campo `foto_base64 TEXT` na entidade `PerfilEntity.java`
- [x] 8.2 Criar migration SQL para adicionar coluna (V3__add_foto_base64_to_perfis.sql)
- [x] 8.3 Adicionar `fotoBase64` no `PerfilResponse.java`
- [x] 8.4 Atualizado endpoint PUT /api/perfil para aceitar fotoBase64
- [x] 8.5 Implementar validação de tamanho (max 500KB) via @Size
- [x] 8.6 Adicionar `fotoBase64` no `AtualizarPerfilRequest.java`
- [x] 8.7 Testar upload via API

## 9. Upload de Foto de Perfil - Frontend
- [x] 9.1 Atualizar tipo `Perfil` e `User` em `types/index.ts` com `fotoBase64`
- [x] 9.2 Implementar upload inline em settings/page.tsx (não criou componente separado)
- [x] 9.3 Implementar validação de tamanho (max 500KB) no frontend
- [x] 9.4 Implementar conversão para Base64
- [x] 9.5 Atualizar `settings/page.tsx` com área de upload de foto
- [x] 9.6 Atualizar `Avatar` component para exibir `fotoBase64`
- [x] 9.7 Testar upload e exibição de foto

## 10. Criação e Aplicação de Logo
- [x] 10.1 Criar componente `Logo` em `components/ui/logo.tsx`
- [x] 10.2 Implementar logo text-based "TeAchei" com estilização e ícone
- [x] 10.3 Atualizar `header.tsx` para usar novo componente Logo
- [x] 10.4 Atualizar `auth-layout.tsx` para usar logo nas páginas de auth
- [ ] 10.5 Adicionar favicon com logo (pendente - requer arquivo de imagem)
- [x] 10.6 Testar logo em diferentes páginas e temas

## 11. Investigação - Tipo de Veículo
- [x] 11.1 Pesquisar se API FIPE ou Parallelum retorna categoria do veículo
- [x] 11.2 Documentar possíveis abordagens (parsing de nome, base própria, etc.)
- [x] 11.3 Resultado: API FIPE não fornece esta informação. Documentado em design.md

## 12. Discussão - Melhorias de Fotos de Veículos
- [x] 12.1 Pesquisar APIs de imagens de veículos disponíveis
- [x] 12.2 Avaliar custo/benefício de cada abordagem
- [x] 12.3 Documentar recomendação final em design.md

## 13. Testes e Validação Final
- [ ] 13.1 Testar fluxo completo de busca
- [ ] 13.2 Testar fluxo completo de filtros
- [ ] 13.3 Testar fluxo completo de criação de intenção
- [ ] 13.4 Testar upload de foto de perfil
- [ ] 13.5 Verificar consistência visual em todas as páginas
- [ ] 13.6 Testar em mobile e desktop
