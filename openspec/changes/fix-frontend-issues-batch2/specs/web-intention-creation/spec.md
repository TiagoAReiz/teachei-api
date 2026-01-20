# Capability: web-intention-creation

## ADDED Requirements

### Requirement: Location Fields
The intention creation flow SHALL include city and state fields for contact information.

#### Scenario: Location input in review step
Given the user is on the review step of intention creation
When the page loads
Then city and state input fields SHALL be displayed
And the fields SHALL be pre-filled with user profile values if available

#### Scenario: Location saved with intention
Given the user fills in city and state fields
When the intention is created
Then the cidade and estado values SHALL be included in the CreateAnuncioRequest
And the intention detail page SHALL display the location

### Requirement: Mileage Range
The intention creation flow SHALL allow specifying desired mileage range.

#### Scenario: Mileage input in specs step
Given the user is on the specs step of intention creation
When the page loads
Then mileage range inputs (minimum and maximum) SHALL be available
And the inputs SHALL accept numeric values in kilometers

#### Scenario: Mileage saved with intention
Given the user specifies mileage range
When the intention is created
Then the quilometragemMinima and quilometragemMaxima SHALL be saved
And the intention detail page SHALL display the mileage range
