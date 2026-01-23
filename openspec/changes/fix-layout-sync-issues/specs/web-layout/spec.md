# Capability: Web Layout - Delta

## MODIFIED Requirements

### Requirement: Sidebar State Synchronization
The sidebar collapsed state SHALL be synchronized between the Sidebar component and the MainLayout component.

#### Scenario: Sidebar collapse updates content layout
- **WHEN** user clicks the sidebar collapse button
- **THEN** the main content area SHALL adjust its margin immediately
- **AND** the content SHALL transition smoothly to the new layout

#### Scenario: Sidebar state persists across page loads
- **WHEN** user collapses the sidebar and refreshes the page
- **THEN** the sidebar SHALL remain collapsed
- **AND** the content layout SHALL match the collapsed state

### Requirement: Content Centering on Sidebar Collapse
When the filter sidebar is collapsed, the main content area SHALL adjust to use the available space.

#### Scenario: Content layout with collapsed sidebar
- **WHEN** the filter sidebar is collapsed (width: 48px)
- **THEN** the main content SHALL have reduced left margin (48px instead of 288px)
- **AND** the content SHALL remain properly aligned

#### Scenario: Content layout with expanded sidebar
- **WHEN** the filter sidebar is expanded (width: 288px)
- **THEN** the main content SHALL have appropriate left margin (288px)
- **AND** the content SHALL not overlap with the sidebar
