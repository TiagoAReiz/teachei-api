## Context

O frontend web TeAchei tem vários problemas de usabilidade acumulados que precisam ser resolvidos. Esta mudança agrupa correções relacionadas para manter a consistência.

## Goals / Non-Goals

### Goals
- Corrigir bug crítico de busca que causa requisições infinitas
- Implementar validação consistente em filtros e formulários
- Adicionar upload de foto de perfil
- Melhorar UX com feedback visual adequado

### Non-Goals
- Alterar arquitetura do sistema
- Implementar cache de imagens
- Implementar CDN para imagens
- Alterar modelo de dados de intenções

## Decisions

### 1. Busca com Debounce
- **Decisão**: Aumentar debounce para 500ms e remover `searchParams` das dependências do useEffect
- **Alternativas**: Usar callback ref, usar React Query com debounce
- **Rationale**: Solução mais simples que resolve o problema sem adicionar complexidade

### 2. Upload de Foto de Perfil
- **Decisão**: Armazenar como Base64 (bytecode) no campo `fotoBase64` do perfil no PostgreSQL
- **Alternativas**: 
  - Azure Blob Storage (mais escalável, mas adiciona complexidade)
  - File system local (não escalável, difícil gerenciar)
- **Rationale**: Simplifica arquitetura para MVP, pode migrar para Blob Storage depois
- **Limite**: Aceitar imagens até 500KB para evitar problemas de performance

### 3. Validação de Filtros Min/Max
- **Decisão**: Adicionar validação no frontend que impede selecionar min > max
- **Implementação**: 
  - Para ano: filtrar opções do dropdown de max para mostrar apenas >= min
  - Para preço: mostrar erro inline se min > max e não aplicar filtro

### 4. Remoção de Filtros Range
- **Decisão**: Criar função `removeRangeFilter` que remove min e max em uma única navegação
- **Rationale**: Evita duas navegações consecutivas que podem causar problemas de race condition

### 5. Logo
- **Decisão**: Criar logo simples usando CSS/SVG (text-based logo "TeAchei" com estilização)
- **Rationale**: Rápido de implementar, pode ser substituído por arte profissional depois

## Risks / Trade-offs

### Foto como Base64
- **Risco**: Pode aumentar tamanho do response de perfil
- **Mitigação**: Limitar tamanho a 500KB, usar lazy loading

### Busca Simplificada
- **Risco**: Usuários podem querer buscar por versão
- **Mitigação**: Documentar que busca é apenas por modelo, versão deve ser selecionada via filtros

## Migration Plan

1. Adicionar coluna `foto_base64 TEXT` na tabela `perfis`
2. Deploy backend com novo endpoint de upload
3. Deploy frontend com todas as correções

## Investigação Concluída

### Tipo de Veículo (SUV, Sedan, NAKED, etc.)

**Investigação**: Analisamos a API FIPE (via Parallelum) e a implementação atual no backend.

**Resultado**: A API FIPE **NÃO fornece** informação sobre categoria/tipo de veículo (SUV, Sedan, Hatch, NAKED, etc.). Os campos retornados são:
- Marcas (codigo, nome)
- Modelos (codigo, nome) - onde o nome pode conter hints como "Onix Hatch", mas não é estruturado
- Anos (codigo, nome)
- Preço de referência

**Opções para implementar futuramente**:
1. **Parse do nome do modelo**: Extrair keywords como "Hatch", "Sedan", "SUV", "NAKED" do nome. Problema: não é confiável, nem todos os nomes contêm esta informação.
2. **Base de dados própria**: Manter um mapeamento manual de modelos para categorias. Problema: trabalhoso para manter atualizado.
3. **API terceira**: Buscar API que forneça esta informação. Requer pesquisa adicional.

**Recomendação**: Deixar para fase futura. A implementação atual é suficiente para o MVP.

### Melhorias de Fotos de Veículos

**Situação atual**: O sistema usa ícones genéricos (Car, Bike, Truck) para representar veículos.

**Opções pesquisadas**:
1. **APIs de imagens de veículos**: 
   - Carsxe API - paga, ~$50/mês
   - CarMD API - focada em diagnóstico, não imagens
   - Não encontramos API gratuita confiável com imagens de alta qualidade
   
2. **Upload pelo comprador**: O comprador está declarando intenção de compra, não possui o veículo. Faz mais sentido para vendedores.

3. **Imagens de fabricantes**: Questões de direitos autorais e dificuldade de obter de forma estruturada.

**Recomendação**: Para MVP, manter ícones genéricos. Considerar para o futuro:
- Integrar com API paga quando houver budget
- Permitir que compradores adicionem imagens de referência (opcional)
