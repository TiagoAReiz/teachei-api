# Capability: web-intention-detail

## MODIFIED Requirements

### Requirement: Favorites Persistence
The intention detail page SHALL use the useSavedIntentions hook to persist favorites across sessions.

#### Scenario: User saves intention from detail page
Given the user is viewing an intention detail page
When the user clicks the save/bookmark button
Then the intention SHALL be added to localStorage saved intentions
And the button SHALL show the saved state (filled icon)
And the intention SHALL appear in the favorites page

#### Scenario: User unsaves intention from detail page
Given the user has previously saved the intention
When the user clicks the save/bookmark button again
Then the intention SHALL be removed from saved intentions
And the button SHALL show the unsaved state (outline icon)

### Requirement: Bookmark Icon Consistency
The intention detail page SHALL use the Bookmark icon instead of Heart icon for consistency with other pages.

#### Scenario: Icon display
Given the user is viewing an intention detail page
When the page loads
Then the save button SHALL display a Bookmark icon
And the icon style SHALL match the intention cards (filled when saved, outline when not)
