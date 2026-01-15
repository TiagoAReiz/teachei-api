# Capability: Mobile Intentions

## ADDED Requirements

### Requirement: Home Feed Display
The mobile app SHALL display a feed of purchase intentions.

#### Scenario: Feed layout
- **WHEN** the home screen is displayed
- **THEN** it MUST show:
  - Welcome header ("Bem-vindo de volta, Olá Vendedor!")
  - Notification bell with badge
  - Search bar ("Busque por modelos específicos...")
  - Filter chips (Todos, Carros, Motos, Caminhões)
  - Scrollable list of IntentionCards

#### Scenario: Intention card content
- **WHEN** an intention card is displayed
- **THEN** it MUST show:
  - Buyer avatar, name, and time posted
  - "Procuro:" headline with vehicle model
  - Spec chips (years, colors, features)
  - Budget highlight box with max price
  - "Responder Oferta" primary action button

### Requirement: Intention Filtering
The mobile app SHALL allow filtering intentions by vehicle type.

#### Scenario: Type filter
- **WHEN** the user taps a filter chip (e.g., "Carros")
- **THEN** only intentions matching that type MUST be displayed
- **AND** the selected chip MUST show active state (primary color)

#### Scenario: Search filter
- **WHEN** the user types in the search bar
- **THEN** intentions MUST be filtered by model name
- **AND** results MUST update as the user types

### Requirement: Intention Details
The mobile app SHALL display full details of an intention.

#### Scenario: Details screen content
- **WHEN** the intention details screen is displayed
- **THEN** it MUST show:
  - Hero image of vehicle (illustrative from FIPE)
  - Vehicle name and version
  - Budget range
  - Specs grid (Year Range, Colors, Transmission, Fuel)
  - Buyer notes in quote box
  - Buyer profile section

#### Scenario: WhatsApp contact
- **WHEN** the user taps "I have this vehicle" button
- **THEN** the app MUST open WhatsApp with the buyer's number
- **AND** pre-fill a message template

### Requirement: Create Intention Flow
The mobile app SHALL guide users through creating an intention.

#### Scenario: Step 1 - Category
- **WHEN** step 1 is displayed
- **THEN** it MUST show vehicle category options:
  - Carro (car icon) - "Sedans, SUVs, Hatchbacks"
  - Moto (motorcycle icon) - "Street, Sport, Scooter"
  - Caminhão (truck icon) - "Heavy duty, Commercial"

#### Scenario: Step 2 - Brand and Model
- **WHEN** step 2 is displayed
- **THEN** it MUST show searchable dropdowns for:
  - Brand (populated from FIPE API)
  - Model (populated based on selected brand)

#### Scenario: Step 3 - Specifications
- **WHEN** step 3 is displayed
- **THEN** it MUST show:
  - Multi-select for years (from FIPE)
  - Multi-select for colors
  - Price input with FIPE reference
  - Optional notes textarea

#### Scenario: Step 4 - Review
- **WHEN** step 4 is displayed
- **THEN** it MUST show a summary of all selections
- **AND** total price for the ad
- **AND** "Pagar e Publicar" button

### Requirement: My Intentions Dashboard
The mobile app SHALL display a dashboard for the buyer's own intentions.

#### Scenario: Dashboard layout
- **WHEN** the my-intentions screen is displayed
- **THEN** it MUST show:
  - "Minhas Intenções" header
  - Filter chips (Todos, Ativos, Pendentes, Finalizados)
  - List of MyIntentionCards
  - FAB for "Nova Intenção"

#### Scenario: Active intention card
- **WHEN** an active intention is displayed
- **THEN** it MUST show:
  - "Ativo" badge (blue)
  - Vehicle name and price range
  - Thumbnail image
  - Metrics (X Lojistas viram, Y Propostas)
  - Edit and "Já comprei" action buttons

#### Scenario: Pending payment card
- **WHEN** a pending payment intention is displayed
- **THEN** it MUST show:
  - "Pendente Pagamento" badge (amber)
  - Grayscale thumbnail
  - Warning message about hidden status
  - "Pagar Agora" primary button

#### Scenario: Finished intention card
- **WHEN** a finished intention is displayed
- **THEN** it MUST show:
  - "Finalizado" badge (green)
  - Strike-through title
  - Purchase date
  - "Ver detalhes da compra" link



