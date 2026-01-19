## ADDED Requirements

### Requirement: Create Flow Exit Navigation
The intention creation flow SHALL provide a clear way for users to exit and return to the main feed.

#### Scenario: User cancels intention creation
- **WHEN** user is on any step of the intention creation flow
- **AND** user clicks the "Cancelar" or close button
- **THEN** the system navigates to the feed page
- **AND** any unsaved intention data is discarded

#### Scenario: Back button navigates to previous step
- **WHEN** user is on step 2, 3, or 4 of intention creation
- **AND** user clicks the back arrow button
- **THEN** the system navigates to the previous step
- **AND** previously entered data is preserved

#### Scenario: Back from first step goes to feed
- **WHEN** user is on step 1 of intention creation (category selection)
- **AND** user clicks the back arrow button
- **THEN** the system navigates to the feed page
- **AND** no browser history issues occur

### Requirement: Post-Payment Navigation
After completing or canceling payment, users SHALL be navigated to appropriate pages.

#### Scenario: Successful payment navigates to feed
- **WHEN** payment is completed successfully
- **AND** success page is displayed
- **THEN** after 3 seconds, user is automatically redirected to feed
- **OR** user can click to go to feed immediately

#### Scenario: Failed payment shows retry option
- **WHEN** payment fails
- **THEN** error page displays with clear messaging
- **AND** user can click "Tentar novamente" to retry payment
- **AND** user can click to return to feed
