# Capability: web-feed-filters

## REMOVED Requirements

### Requirement: Sidebar Vehicle Type Filter
The sidebar component SHALL NOT display the vehicle type filter section, as it duplicates the IntentionFilters component.

#### Scenario: Sidebar content
Given the user is viewing any page with the sidebar
When the sidebar is displayed
Then the sidebar SHALL NOT contain the "FILTRAR POR TIPO" section
And the sidebar SHALL only contain navigation items

## MODIFIED Requirements

### Requirement: Enhanced Feed Filters
The IntentionFilters component SHALL support additional filter options beyond vehicle type.

#### Scenario: Model filter
Given the user is on the feed page
When the user selects a brand
Then model options for that brand SHALL be loaded from FIPE API
And the user SHALL be able to filter by specific model

#### Scenario: Filter URL params
Given the user applies brand and model filters
When the filters are applied
Then the URL SHALL include marca and modelo query parameters
And the page SHALL reload with filtered results
