# Capability: web-intention-management

## ADDED Requirements

### Requirement: Delete Intention UI
The my-intentions page SHALL provide a way for users to delete their pending intentions.

#### Scenario: Delete button visibility
Given the user is viewing their intentions on my-intentions page
When an intention has status PENDENTE_PAGAMENTO
Then a delete button (trash icon) SHALL be visible on the card

#### Scenario: Delete button hidden for active
Given the user is viewing their intentions
When an intention has status ATIVO or FINALIZADO or EXPIRADO
Then the delete button SHALL NOT be visible

#### Scenario: Delete confirmation
Given the user clicks the delete button on a pending intention
When the confirmation dialog appears
Then the dialog SHALL show a warning message
And the dialog SHALL have Cancel and Confirm buttons

#### Scenario: Delete execution
Given the user confirms the deletion
When the API call succeeds
Then the intention SHALL be removed from the list
And a success toast SHALL be displayed
And the intentions query SHALL be invalidated
