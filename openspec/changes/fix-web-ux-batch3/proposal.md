# Change: Correções de UX e Funcionalidades Web - Batch 3

## Why
Existem vários bugs de usabilidade e funcionalidades pendentes no frontend web que impactam a experiência do usuário: filtros com comportamento incorreto, busca causando loops infinitos, validação de formulários inconsistente, e falta de funcionalidades importantes como upload de foto de perfil.

## What Changes

### Filtros (URGENTE)
- **BUGFIX**: Busca quebra a aplicação com requisições infinitas - corrigir debounce e limitar busca por modelo apenas
- **BUGFIX**: Validação de faixa de ano/preço - mínimo não pode ser maior que máximo
- **BUGFIX**: Filtro de opcionais não funciona (não está passando corretamente para a API)
- **BUGFIX**: Remover filtros via X não funciona para faixa de ano e preço (remove ambos em uma navegação)

### Criação de Intenção
- **CHANGE**: Ano mínimo/máximo e preço máximo devem ser obrigatórios
- **CHANGE**: Adicionar "Qualquer" como opção padrão para cor
- **BUGFIX**: Validação de cidade/estado só deve mostrar erro após clicar em publicar
- **CHANGE**: Validação por etapa com mensagens de erro claras

### UI/UX
- **CHANGE**: Tela de favoritos - usar badge/bandeira igual aos anúncios ao invés de coração
- **FEATURE**: Upload de foto de perfil (salvar como bytecode no banco)
- **FEATURE**: Criar logo e aplicar no site

### Discussão/Investigação
- Verificar se API FIPE fornece tipo de veículo (SUV, Sedan, NAKED, etc.)
- Discutir melhorias para fotos (atualmente usando ícones)

## Impact
- Affected specs: web-feed-filters, web-intention-creation, web-profile, web-ui
- Affected code:
  - `teachei-web/components/layout/search-input.tsx` - debounce fix
  - `teachei-web/components/intentions/intention-filters.tsx` - filter removal fix
  - `teachei-web/components/intentions/filter-sidebar.tsx` - min/max validation
  - `teachei-web/components/layout/filter-panel.tsx` - min/max validation
  - `teachei-web/app/create/` - intention creation validation
  - `teachei-web/app/(main)/favorites/page.tsx` - icon change
  - `teachei-web/app/(main)/profile/page.tsx` - photo upload
  - `teachei-web/stores/create-intention-store.ts` - required fields
  - Backend: `PerfilController.java`, `PerfilEntity.java` - photo storage
