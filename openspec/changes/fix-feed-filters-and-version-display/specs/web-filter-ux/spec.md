## ADDED Requirements

### Requirement: Aviso de Seleção de Tipo de Veículo
O sidebar de filtros SHALL exibir aviso orientando o usuário a selecionar tipo de veículo antes de selecionar marca.

#### Scenario: Campo de marca sem tipo selecionado
- **WHEN** usuário abre sidebar de filtros sem ter selecionado tipo de veículo
- **THEN** exibe aviso "Selecione um tipo de veículo primeiro" acima do campo de marca
- **AND** campo de marca permanece desabilitado

#### Scenario: Aviso desaparece após seleção
- **WHEN** usuário seleciona um tipo de veículo
- **THEN** aviso desaparece
- **AND** campo de marca é habilitado

### Requirement: Aviso de Seleção de Marca
O sidebar de filtros SHALL exibir aviso orientando o usuário a selecionar marca antes de selecionar modelo.

#### Scenario: Campo de modelo sem marca selecionada
- **WHEN** usuário abre sidebar de filtros sem ter selecionado marca
- **THEN** exibe aviso "Selecione uma marca primeiro" acima do campo de modelo
- **AND** campo de modelo permanece desabilitado

#### Scenario: Aviso desaparece após seleção de marca
- **WHEN** usuário seleciona uma marca
- **THEN** aviso desaparece
- **AND** campo de modelo é habilitado

### Requirement: Estilização dos Avisos
Os avisos de seleção hierárquica SHALL ter estilização destacada para chamar atenção do usuário.

#### Scenario: Estilo visual do aviso
- **WHEN** aviso é exibido
- **THEN** usa cor de destaque (amarelo/warning)
- **AND** inclui ícone de informação
- **AND** texto é legível e conciso
