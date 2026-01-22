## Context

O sistema atual tem três problemas principais:

1. **Filtros quebrados**: O frontend envia parâmetros (`anoMin`, `anoMax`, `precoMin`, `precoMax`) que o backend não processa. O backend só aceita `ano` (single) e `precoMinimo`.

2. **Modelo de dados limitado**: O backend armazena apenas um `modeloCodigo`/`modeloNome` (a primeira versão selecionada). Múltiplas versões são armazenadas em texto no campo `observacoes`, impossibilitando filtros e display estruturado.

3. **Display inconsistente**: O card mostra o nome completo da primeira versão no título (ex: "Onix 1.0 LT 5p") ao invés de separar modelo base e versões.

## Goals / Non-Goals

### Goals
- Implementar filtros funcionais para ano (range), preço (range), busca textual e opcionais
- Armazenar versões de forma estruturada para permitir filtros e display adequado
- Exibir versões como chips (igual cores) com suporte a overflow

### Non-Goals
- Filtro por versão específica no feed (será apenas visualização)
- Alteração do fluxo de busca para seguir padrão modelo→versão (escopo futuro)
- Migração de dados existentes (anúncios antigos continuarão com formato legado)

## Decisions

### 1. Parâmetros de Filtro Backend
Unificar nomenclatura entre frontend e backend:

| Frontend atual | Backend atual | Backend novo |
|---------------|---------------|--------------|
| `anoMin` | `ano` (single) | `anoMin` |
| `anoMax` | - | `anoMax` |
| `precoMin` | `precoMinimo` | `precoMin` |
| `precoMax` | - | `precoMax` |
| `search` | - | `search` |
| `opcionais` | - | `opcionais` |

**Decisão**: Manter compatibilidade com parâmetros antigos (`ano`, `precoMinimo`) mas preferir os novos.

### 2. Estrutura de Versões no VeiculoInfo

```java
public class VeiculoInfo {
    // Campos existentes...
    private String modeloBaseNome;     // "Onix"
    private List<VersaoInfo> versoes;  // [{codigo: "123", nome: "1.0 LT 5p"}, ...]
    private boolean todasVersoes;      // true se "aceito qualquer versão"
}

public class VersaoInfo {
    private String codigo;
    private String nome;
}
```

**Decisão**: Manter campos legados (`modeloCodigo`, `modeloNome`) para compatibilidade. Usar `modeloBaseNome` para display e `versoes` para lista estruturada.

### 3. Lógica de Filtros

#### Ano (Range)
```java
// Anúncio é compatível se pelo menos um ano está no range
filter(a -> {
    if (anoMin == null && anoMax == null) return true;
    return a.getAnos().stream().anyMatch(ano -> 
        (anoMin == null || ano >= anoMin) && 
        (anoMax == null || ano <= anoMax)
    );
})
```

#### Preço
```java
// Filtro busca anúncios cujo precoMaximo está dentro do range
filter(a -> {
    var preco = a.getPrecoMaximo();
    if (precoMin != null && preco.compareTo(precoMin) < 0) return false;
    if (precoMax != null && preco.compareTo(precoMax) > 0) return false;
    return true;
})
```

#### Busca Textual
```java
// Busca case-insensitive em múltiplos campos
filter(a -> {
    if (search == null || search.isBlank()) return true;
    String searchLower = search.toLowerCase();
    return 
        containsIgnoreCase(a.getMarcaNome(), searchLower) ||
        containsIgnoreCase(a.getModeloNome(), searchLower) ||
        containsIgnoreCase(a.getModeloBaseNome(), searchLower) ||
        containsIgnoreCase(a.getObservacoes(), searchLower);
})
```

### 4. Display de Versões e Opcionais no Card

```
┌─────────────────────────────────────────┐
│  🚗                                     │
│  Chevrolet Onix                         │  ← modeloBaseNome
│  2020 - 2023                            │
│                                         │
│  [Branco] [Prata] [+2]                  │  ← cores (máx 3)
│  [1.0 LT] [1.4 Premier] [+3]            │  ← versões (máx 2)
│  [Ar Cond.] [Dir. Hidr.] [+4]           │  ← opcionais (máx 2)
│  ─────────────────────────────────────  │
│  São Paulo, SP • há 2 dias              │
└─────────────────────────────────────────┘
```

Ou, se `todasVersoes=true`:
```
│  [Todas as versões]                     │
```

**Limite de chips**:
- Cores: 3 visíveis + badge "+N"
- Versões: 2 visíveis + badge "+N"
- Opcionais: 2 visíveis + badge "+N"

### 5. UX de Seleção Hierárquica nos Filtros

```
┌─────────────────────────────────────────┐
│  Tipo de Veículo                        │
│  [CARRO] [MOTO] [CAMINHÃO]              │
│                                         │
│  ⚠️ Selecione um tipo de veículo primeiro│  ← aviso amarelo
│  Marca                                  │
│  [        Selecione...        ] (cinza) │
│                                         │
│  ⚠️ Selecione uma marca primeiro        │  ← aviso amarelo
│  Modelo                                 │
│  [        Selecione...        ] (cinza) │
└─────────────────────────────────────────┘
```

**Decisão**: Avisos aparecem inline, acima do campo desabilitado, com estilo warning (amarelo) e ícone de informação.

### 6. Novo Layout de Navegação (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🏠  ⭐  📋  ➕                             🔍 [busca...]         👤 ⚙️  │  ← Header com ícones
├──────────────────────┬───────────────────────────────────────────────────┤
│ ◀ Filtros           │                                                   │
│                      │   ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│ Tipo de Veículo      │   │  Card   │ │  Card   │ │  Card   │            │
│ [CARRO][MOTO][CAM.]  │   └─────────┘ └─────────┘ └─────────┘            │
│                      │                                                   │
│ Marca                │   ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│ [Selecione v]        │   │  Card   │ │  Card   │ │  Card   │            │
│                      │   └─────────┘ └─────────┘ └─────────┘            │
│ Modelo               │                                                   │
│ [Selecione v]        │   ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│                      │   │  Card   │ │  Card   │ │  Card   │            │
│ Opcionais            │   └─────────┘ └─────────┘ └─────────┘            │
│ [  ] Ar Cond.        │                                                   │
│ [  ] Dir. Hidr.      │              [Carregar mais...]                   │
│                      │                                                   │
│ Preço                │                                                   │
│ R$ [____] - [____]   │                                                   │
│                      │                                                   │
│ Ano                  │                                                   │
│ [____] - [____]      │                                                   │
│                      │                                                   │
│ [Limpar] [Aplicar]   │                                                   │
├──────────────────────┴───────────────────────────────────────────────────┤
│  © TeAchei 2026                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Decisões**:
- Header: navegação com ícones + busca + perfil/config
- Sidebar: ~280px fixa à esquerda, colapsável com botão "◀"
- Sidebar colapsada: ~60px com apenas ícones ou totalmente oculta
- Mobile (<768px): sidebar oculta, abre como drawer
- Estado persistido em localStorage

**Ícones de navegação**:
- 🏠 Home (Feed)
- ⭐ Favoritos
- 📋 Meus Anúncios
- ➕ Criar Anúncio
- 👤 Perfil
- ⚙️ Configurações

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| Anúncios antigos não terão `modeloBaseNome` | Usar fallback para `modeloNome` no display |
| Filtros in-memory podem ser lentos com muitos dados | Manter nota para futura otimização com queries Cosmos DB |
| Múltiplas versões aumentam tamanho do documento | Limitar a 20 versões máximas por anúncio |

## Migration Plan

1. Deploy backend com novos campos (opcionais, sem quebrar API)
2. Deploy frontend com display atualizado (fallback para formato antigo)
3. Novos anúncios usam formato novo automaticamente
4. Anúncios antigos continuam funcionando com campos legados

## Open Questions

- Nenhuma no momento
