# Capability: Web Intention Creation - Delta

## ADDED Requirements

### Requirement: Save Location to Profile on Publish
When publishing an intention, the system SHALL save the user's location (cidade/estado) to their profile.

#### Scenario: Location saved to profile on publish
- **WHEN** user publishes an intention with cidade and estado
- **THEN** the system SHALL update the user's profile with the new location
- **AND** future intentions SHALL pre-fill with this location

#### Scenario: Location update is silent
- **WHEN** user's location differs from their profile
- **THEN** the system SHALL update the profile without showing a confirmation dialog
- **AND** the update SHALL happen alongside the intention creation

#### Scenario: Location persists for future intentions
- **WHEN** user creates a new intention after publishing one with location
- **THEN** the location fields SHALL be pre-filled from the user's profile

## MODIFIED Requirements

### Requirement: Proper Model and Versions Data
When creating an intention with multiple versions, the system SHALL properly set the model base name and versions.

#### Scenario: Base model name is set correctly
- **WHEN** user selects a model and versions
- **THEN** the intention SHALL include `modeloBaseNome` (e.g., "Onix")
- **AND** the intention SHALL include `versoes` array with selected versions

#### Scenario: Intention displays versions as chips
- **WHEN** viewing an intention in the feed or detail page
- **THEN** versions SHALL be displayed as chips (similar to colors)
- **AND** the title SHALL show `modeloBaseNome` not a random version
