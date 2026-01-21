## Context

O TeAchei é um marketplace invertido onde compradores anunciam o que querem comprar. O feed de intenções precisa de uma experiência de busca e filtragem mais fluida, e o fluxo de criação precisa ser mais flexível para permitir que compradores aceitem múltiplas versões do mesmo modelo.

## Goals / Non-Goals

**Goals:**
- Melhorar a experiência de busca com feedback em tempo real (debounce)
- Consolidar filtros avançados em uma sidebar organizada
- Permitir seleção de múltiplas versões de um modelo na criação
- Simplificar visual da página de detalhes removendo imagem placeholder

**Non-Goals:**
- Alterar a estrutura de dados do backend para armazenar versões
- Implementar busca full-text no backend (usamos o existente)
- Adicionar upload de imagens reais dos veículos

## Decisions

### 1. Agrupamento de Modelos no Frontend

**Decisão**: Agrupar modelos FIPE por nome base no frontend usando heurística de primeiro termo.

**Exemplo de agrupamento:**
```
Entrada FIPE:
- "Onix 1.0 LT 5p"
- "Onix 1.0 LTZ 5p"  
- "Onix Plus Premier"
- "HB20 1.0 Comfort"
- "HB20 1.6 Premium"

Agrupado:
- Onix (3 versões)
  - 1.0 LT 5p
  - 1.0 LTZ 5p
  - Plus Premier
- HB20 (2 versões)
  - 1.0 Comfort
  - 1.6 Premium
```

**Algoritmo:**
```typescript
function groupModelsByBase(modelos: Modelo[]): ModeloAgrupado[] {
  const groups = new Map<string, Modelo[]>();
  
  for (const modelo of modelos) {
    // Primeiro termo é o nome base
    const baseName = modelo.nome.split(' ')[0];
    if (!groups.has(baseName)) {
      groups.set(baseName, []);
    }
    groups.get(baseName)!.push(modelo);
  }
  
  return Array.from(groups.entries()).map(([baseName, versoes]) => ({
    baseName,
    versoes,
  }));
}
```

**Alternativas consideradas:**
- Buscar agrupamento do backend: Requer alteração de API, mais complexo
- Usar regex para detectar nome base: Muito frágil, modelos têm formatos variados

### 2. Armazenamento de Múltiplas Versões

**Decisão**: Armazenar array de versões selecionadas no store, enviar primeira versão como principal e demais em observações.

**Justificativa**: O backend atual aceita apenas um `modeloCodigo`. Para manter compatibilidade, enviamos a primeira versão como principal e incluímos as demais nas observações do anúncio.

**Alternativa futura**: Quando backend suportar array de modelos, atualizar para enviar todas as versões.

### 3. Busca com Debounce

**Decisão**: 200ms de debounce, sem requisição se termo < 2 caracteres.

**Justificativa**: 200ms é rápido o suficiente para parecer instantâneo, mas evita requisições a cada tecla. Mínimo de 2 caracteres evita buscas muito genéricas.

### 4. Sidebar de Filtros

**Decisão**: Sidebar deslizante da direita, fullscreen em mobile, 400px em desktop.

**Layout da Sidebar:**
```
┌─────────────────────────────┐
│ Filtros              [X]    │
├─────────────────────────────┤
│ Tipo de Veículo             │
│ [Todos] [Carros] [Motos]... │
│                             │
│ Marca                       │
│ [Select: Todas as marcas ▼] │
│                             │
│ Modelo                      │
│ [Select: Todos os modelos▼] │
│                             │
│ Opcionais                   │
│ ☐ Ar Condicionado           │
│ ☐ Direção Elétrica          │
│ ☐ Vidro Elétrico            │
│ ...                         │
│                             │
│ Faixa de Preço              │
│ [R$ Min] - [R$ Max]         │
│                             │
│ Faixa de Ano                │
│ [2020 ▼] - [2024 ▼]         │
├─────────────────────────────┤
│ [Limpar]    [Aplicar Filtros]│
└─────────────────────────────┘
```

## Risks / Trade-offs

### Agrupamento de Modelos
- **Risco**: Heurística de primeiro termo pode falhar em alguns modelos
- **Mitigação**: Testar com marcas populares (Chevrolet, VW, Fiat, Toyota, Honda)
- **Trade-off**: Simplicidade vs precisão - aceitamos pequenos erros em favor de implementação simples

### Performance de Busca
- **Risco**: Muitas requisições se usuário digitar rápido
- **Mitigação**: Debounce de 200ms + mínimo 2 caracteres

### Múltiplas Versões no Backend
- **Risco**: Backend não suporta array de modelos
- **Mitigação**: Enviar nas observações como texto, criar issue para suporte futuro

## Migration Plan

Não há migração necessária. Mudanças são puramente frontend e retrocompatíveis.

## Open Questions

1. ~~Como agrupar modelos por nome base?~~ Resolvido: usar primeiro termo
2. Backend tem endpoint para listar opcionais disponíveis? Se não, usar lista fixa baseada no enum `OpcionalVeiculo`
3. Filtro por opcionais é suportado no backend? Se não, filtrar apenas no frontend (menos ideal)
