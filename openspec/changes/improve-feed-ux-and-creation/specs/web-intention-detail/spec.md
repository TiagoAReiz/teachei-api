## MODIFIED Requirements

### Requirement: Intention Detail Header
The intention detail page SHALL display a styled vehicle type icon instead of a placeholder image.

#### Scenario: Display vehicle icon
- **WHEN** user navigates to an intention detail page
- **THEN** a large vehicle type icon SHALL be displayed in the header area
- **AND** the icon SHALL correspond to the intention type (Car for CARRO, Bike for MOTO, Truck for CAMINHAO)
- **AND** the icon SHALL have a muted/translucent appearance similar to IntentionCard

#### Scenario: Header visual consistency
- **WHEN** viewing the intention detail page
- **THEN** the header style SHALL be consistent with IntentionCard component
- **AND** the vehicle type badge SHALL be positioned over the icon area
- **AND** the bookmark and share actions SHALL remain functional

## REMOVED Requirements

### Requirement: Placeholder Vehicle Image
**Reason**: Placeholder images from Unsplash do not add value and create false expectations. Users expect to see the actual vehicle or a clear indicator that no photo is available.
**Migration**: Replace with vehicle type icon as specified in the MODIFIED requirements above.
