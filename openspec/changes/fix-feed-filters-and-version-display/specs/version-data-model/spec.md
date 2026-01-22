## ADDED Requirements

### Requirement: Armazenamento de Múltiplas Versões
O backend SHALL armazenar múltiplas versões selecionadas de forma estruturada em `VeiculoInfo`.

#### Scenario: Criar anúncio com múltiplas versões
- **WHEN** usuário cria anúncio selecionando versões ["1.0 LT 5p", "1.4 Premier"]
- **THEN** o documento armazena:
  - `modeloBaseNome`: "Onix"
  - `versoes`: [{codigo: "123", nome: "1.0 LT 5p"}, {codigo: "456", nome: "1.4 Premier"}]
  - `todasVersoes`: false
  - `modeloCodigo`: "123" (primeira versão - legado)
  - `modeloNome`: "Onix 1.0 LT 5p" (primeira versão - legado)

#### Scenario: Criar anúncio com todas as versões
- **WHEN** usuário cria anúncio marcando "Aceito qualquer versão"
- **THEN** o documento armazena:
  - `modeloBaseNome`: "Onix"
  - `versoes`: [] (lista vazia ou todas as versões)
  - `todasVersoes`: true

#### Scenario: Compatibilidade com anúncios legados
- **WHEN** anúncio antigo não possui `modeloBaseNome`
- **THEN** sistema usa `modeloNome` como fallback para display

### Requirement: Response com Informações de Versões
O endpoint GET `/v1/anuncios/{id}` SHALL retornar informações estruturadas de versões.

#### Scenario: Response com múltiplas versões
- **WHEN** GET `/v1/anuncios/{id}` para anúncio com múltiplas versões
- **THEN** response inclui:
```json
{
  "veiculo": {
    "modeloBaseNome": "Onix",
    "versoes": [
      {"codigo": "123", "nome": "1.0 LT 5p"},
      {"codigo": "456", "nome": "1.4 Premier"}
    ],
    "todasVersoes": false,
    "modeloNome": "Onix 1.0 LT 5p"
  }
}
```

#### Scenario: Response com todas as versões
- **WHEN** GET `/v1/anuncios/{id}` para anúncio com "todas as versões"
- **THEN** response inclui `todasVersoes: true`

### Requirement: Validação de Versões na Criação
O backend SHALL validar os campos de versão na criação de anúncio.

#### Scenario: Ao menos uma versão ou todas
- **WHEN** criação de anúncio sem versões e `todasVersoes=false`
- **THEN** retorna erro 400 "Selecione ao menos uma versão ou marque 'todas as versões'"

#### Scenario: Limite de versões
- **WHEN** criação de anúncio com mais de 20 versões
- **THEN** retorna erro 400 "Máximo de 20 versões permitidas"
