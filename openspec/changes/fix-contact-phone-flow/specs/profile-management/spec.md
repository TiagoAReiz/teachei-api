## MODIFIED Requirements

### Requirement: Profile Edit Form Pre-population

The system SHALL pre-populate the profile edit form with the user's current profile data when the Settings page loads.

When user data loads asynchronously after initial render, the form SHALL update to display the current values.

#### Scenario: Profile edit form shows current user data

- **GIVEN** a logged-in user with existing profile data (nome, whatsapp, cidade, etc.)
- **WHEN** the user navigates to the Settings page
- **THEN** all form fields SHALL be pre-filled with the user's current profile data
- **AND** the user can modify and save changes

#### Scenario: Profile edit form handles async data loading

- **GIVEN** user data is fetched asynchronously after page load
- **WHEN** the user data becomes available
- **THEN** the form SHALL reset and display the loaded values
- **AND** the user SHALL see their current profile information

### Requirement: WhatsApp Field Alignment

The profile edit form SHALL use the field name `whatsapp` (not `telefone`) to match the backend API contract.

The field SHALL display the label "WhatsApp" with a format hint for international numbers.

#### Scenario: WhatsApp field saves correctly

- **GIVEN** a user on the Settings page
- **WHEN** the user enters their WhatsApp number in international format (+5511999998888)
- **AND** clicks "Salvar alterações"
- **THEN** the WhatsApp number SHALL be saved to the user's profile
- **AND** the number SHALL be available for use in intention creation
