# Capability: Web Intentions

## ADDED Requirements

### Requirement: Home Feed Page
The web app SHALL display a feed of purchase intentions.

#### Scenario: Desktop feed layout
- **WHEN** the home page is displayed on desktop
- **THEN** it MUST show:
  - Sidebar with navigation (left)
  - Intention grid in center (2-3 columns)
  - Filters panel (right or top)

#### Scenario: Intention card content
- **WHEN** an intention card is displayed
- **THEN** it MUST show:
  - Buyer avatar and name
  - "Procuro:" headline with vehicle model
  - Spec chips (years, colors)
  - Budget highlight
  - "Respond" or "View Details" button
  - Hover state with shadow elevation

### Requirement: Intention Filtering
The web app SHALL provide comprehensive filtering.

#### Scenario: Filter sidebar
- **WHEN** the desktop feed is displayed
- **THEN** a filters section MUST include:
  - Vehicle type (Carros, Motos, Caminhões)
  - Brand dropdown
  - Model dropdown (dependent on brand)
  - Year range slider
  - Price range slider
  - Location (state/city)

#### Scenario: URL state
- **WHEN** filters are applied
- **THEN** the URL MUST update with filter parameters
- **AND** the page MUST be shareable with filters

#### Scenario: Search
- **WHEN** the user types in the search bar
- **THEN** intentions MUST be filtered by model name
- **AND** search term MUST appear in URL

### Requirement: Intention Details Page
The web app SHALL display detailed intention information.

#### Scenario: Details layout
- **WHEN** an intention details page is displayed
- **THEN** it MUST show:
  - Hero image of vehicle (from FIPE)
  - Vehicle name and version as H1
  - Budget range prominently
  - Specs grid (Year, Colors, Transmission, Fuel)
  - Buyer notes section
  - Buyer profile card
  - "I have this vehicle" WhatsApp CTA
  - Share buttons

#### Scenario: Related intentions
- **WHEN** viewing intention details
- **THEN** a "Similar Intentions" section MUST appear
- **AND** show other intentions for the same model/brand

### Requirement: Create Intention Flow
The web app SHALL provide a multi-step creation wizard.

#### Scenario: Step navigation
- **WHEN** creating an intention
- **THEN** a progress indicator MUST show steps 1-4
- **AND** user MUST be able to navigate between steps
- **AND** data MUST persist across steps

#### Scenario: Step 1 - Category
- **WHEN** step 1 is displayed
- **THEN** large cards MUST show vehicle types
- **AND** clicking advances to step 2

#### Scenario: Step 2 - Brand and Model
- **WHEN** step 2 is displayed
- **THEN** searchable dropdowns MUST appear for:
  - Brand (from FIPE API)
  - Model (dependent on brand)
- **AND** FIPE price reference MUST be shown

#### Scenario: Step 3 - Specifications
- **WHEN** step 3 is displayed
- **THEN** form MUST include:
  - Multi-select checkboxes for years
  - Multi-select for colors
  - Price range input
  - Notes textarea

#### Scenario: Step 4 - Review and Pay
- **WHEN** step 4 is displayed
- **THEN** summary card MUST show all selections
- **AND** pricing for the ad MUST be displayed
- **AND** "Pay and Publish" button MUST redirect to Mercado Pago

### Requirement: My Intentions Dashboard
The web app SHALL display user's intentions with management.

#### Scenario: Dashboard layout
- **WHEN** My Intentions page is displayed
- **THEN** it MUST show:
  - Filter tabs (All, Active, Pending, Completed)
  - Grid or list of intention cards
  - "New Intention" CTA button

#### Scenario: Intention management
- **WHEN** viewing own intention
- **THEN** actions MUST include:
  - Edit (for active/pending)
  - Pay Now (for pending payment)
  - Mark as Purchased
  - View metrics (views, responses)



