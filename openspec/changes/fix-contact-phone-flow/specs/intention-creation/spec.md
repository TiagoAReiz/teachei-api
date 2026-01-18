## ADDED Requirements

### Requirement: Contact Phone in Intention Review

The intention review page SHALL display an editable "Telefone de contato" (WhatsApp) field that is pre-filled with the user's profile WhatsApp number.

The field SHALL be required for intention creation.

#### Scenario: Contact phone pre-filled from profile

- **GIVEN** a user with WhatsApp "+5511999998888" saved in their profile
- **WHEN** the user reaches the intention review page
- **THEN** the "Telefone de contato" field SHALL display "+5511999998888"
- **AND** the field SHALL be editable

#### Scenario: Contact phone required for submission

- **GIVEN** a user on the intention review page
- **WHEN** the "Telefone de contato" field is empty
- **AND** the user clicks "Publicar e Pagar"
- **THEN** the system SHALL display an error message "WhatsApp é obrigatório para contato"
- **AND** the intention SHALL NOT be created

#### Scenario: Contact phone empty in profile

- **GIVEN** a user with no WhatsApp saved in their profile
- **WHEN** the user reaches the intention review page
- **THEN** the "Telefone de contato" field SHALL be empty
- **AND** the user MUST fill it before submission

### Requirement: Profile Sync Prompt for Changed Contact

When the user modifies the contact phone on the review page to a different value than their profile, the system SHALL prompt whether to update their profile.

#### Scenario: User changes contact phone and confirms profile update

- **GIVEN** a user with WhatsApp "+5511999998888" in profile
- **WHEN** the user changes the contact phone to "+5511888887777" on review page
- **AND** clicks "Publicar e Pagar"
- **THEN** the system SHALL display a confirmation dialog
- **AND** if user confirms "Sim, atualizar perfil"
- **THEN** the profile SHALL be updated with the new number
- **AND** the intention creation SHALL proceed

#### Scenario: User changes contact phone but declines profile update

- **GIVEN** a user with WhatsApp "+5511999998888" in profile
- **WHEN** the user changes the contact phone to "+5511888887777" on review page
- **AND** clicks "Publicar e Pagar"
- **AND** the confirmation dialog appears
- **AND** user clicks "Não, usar apenas nesta intenção"
- **THEN** the profile SHALL NOT be updated
- **AND** the system SHALL update the profile temporarily for this intention only
- **AND** the intention creation SHALL proceed with the new phone
