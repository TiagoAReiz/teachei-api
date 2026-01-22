## ADDED Requirements

### Requirement: Header com Navegação por Ícones
O header SHALL exibir navegação principal usando apenas ícones no desktop.

#### Scenario: Navegação com ícones no header
- **WHEN** usuário visualiza página no desktop
- **THEN** header exibe ícones para: Home, Favoritos, Meus Anúncios, Criar Anúncio
- **AND** ícone de configurações/perfil no canto direito
- **AND** ícones possuem tooltip com nome da seção ao hover

#### Scenario: Ícone ativo destacado
- **WHEN** usuário está em uma seção específica
- **THEN** ícone correspondente é destacado visualmente (cor diferente ou underline)

### Requirement: Sidebar Fixa com Filtros
O layout principal SHALL incluir sidebar lateral esquerda com filtros sempre visíveis no desktop.

#### Scenario: Sidebar visível por padrão
- **WHEN** usuário acessa feed no desktop
- **THEN** sidebar esquerda é exibida com todos os filtros
- **AND** sidebar ocupa largura fixa (~280px)
- **AND** área de conteúdo ocupa espaço restante

#### Scenario: Filtros na sidebar
- **WHEN** sidebar está visível
- **THEN** exibe todos os filtros: tipo de veículo, marca, modelo, opcionais, faixa de preço, faixa de ano
- **AND** filtros são aplicados em tempo real ou com botão "Aplicar"

### Requirement: Sidebar Colapsável
A sidebar SHALL poder ser colapsada e expandida pelo usuário.

#### Scenario: Colapsar sidebar
- **WHEN** usuário clica no botão de colapsar
- **THEN** sidebar é minimizada (apenas ícones ou oculta)
- **AND** área de conteúdo expande para ocupar espaço liberado
- **AND** estado de colapsado é persistido (localStorage)

#### Scenario: Expandir sidebar
- **WHEN** usuário clica no botão de expandir (sidebar colapsada)
- **THEN** sidebar retorna ao tamanho normal com filtros visíveis
- **AND** área de conteúdo reduz para acomodar sidebar

#### Scenario: Persistência do estado
- **WHEN** usuário recarrega página
- **THEN** sidebar mantém estado anterior (colapsada ou expandida)

### Requirement: Responsividade Mobile
O layout SHALL adaptar-se para telas menores ocultando a sidebar.

#### Scenario: Layout mobile sem sidebar fixa
- **WHEN** usuário acessa em dispositivo móvel (< 768px)
- **THEN** sidebar não é exibida por padrão
- **AND** botão de filtros aparece para abrir sidebar como drawer

#### Scenario: Sidebar como drawer no mobile
- **WHEN** usuário clica no botão de filtros no mobile
- **THEN** sidebar abre como drawer sobreposto
- **AND** fundo escurecido permite fechar ao clicar fora

## REMOVED Requirements

### Requirement: Botão Filtrar com Modal
O botão "Filtrar" que abre modal/drawer de filtros SHALL ser removido no desktop.

#### Scenario: Sem botão filtrar no desktop
- **WHEN** usuário visualiza feed no desktop
- **THEN** não há botão "Filtrar" na área de conteúdo
- **AND** filtros estão diretamente na sidebar
