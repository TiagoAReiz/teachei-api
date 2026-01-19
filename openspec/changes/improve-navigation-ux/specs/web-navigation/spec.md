## MODIFIED Requirements

### Requirement: Mobile Navigation Items
The mobile bottom navigation SHALL display exactly 5 items: Feed, Salvos, Criar (central), Intenções, Perfil.

#### Scenario: User views mobile navigation
- **WHEN** user is on any page (except auth pages)
- **THEN** the mobile nav shows: Feed (Home), Salvos (Bookmark), Criar (Plus), Intenções (FileText), Perfil (User)
- **AND** "Mensagens" is NOT displayed

### Requirement: Sidebar Navigation Items
The sidebar navigation SHALL NOT include a Messages link.

#### Scenario: User opens sidebar
- **WHEN** user opens the sidebar navigation
- **THEN** the sidebar shows: Feed, Salvos, Perfil
- **AND** "Mensagens" is NOT displayed

## ADDED Requirements

### Requirement: Save Intention Persistence
The system SHALL persist saved intentions to localStorage so they remain across browser sessions.

#### Scenario: User saves an intention
- **WHEN** user clicks the save button on an intention card
- **THEN** the intention ID is added to localStorage
- **AND** the save button shows a filled bookmark icon
- **AND** the save persists after page refresh

#### Scenario: User unsaves an intention
- **WHEN** user clicks the save button on an already saved intention
- **THEN** the intention ID is removed from localStorage
- **AND** the save button shows an outlined bookmark icon

### Requirement: Saved Intentions Display
The Salvos page SHALL display all intentions the user has saved.

#### Scenario: User has saved intentions
- **WHEN** user navigates to /favorites
- **THEN** a grid of saved intention cards is displayed
- **AND** each card shows the save button as filled

#### Scenario: User has no saved intentions
- **WHEN** user navigates to /favorites with no saves
- **THEN** an empty state with bookmark icon is shown
- **AND** a CTA to explore intentions is displayed

### Requirement: Save Button Icon
The save button on intention cards SHALL use the Bookmark icon instead of Heart.

#### Scenario: Intention card displays save button
- **WHEN** an intention card is rendered
- **THEN** the save button shows a Bookmark icon
- **AND** filled state uses primary color (not error/red)

### Requirement: Notifications Dropdown
Clicking the notifications bell icon SHALL open a dropdown showing recent notifications.

#### Scenario: User clicks notification bell
- **WHEN** user clicks the bell icon in the header
- **THEN** a dropdown appears below the bell
- **AND** the dropdown shows a list of notifications or empty state

#### Scenario: User has no notifications
- **WHEN** user opens notifications dropdown with no notifications
- **THEN** an empty state message is displayed
- **AND** a bell icon illustration is shown

#### Scenario: Clicking outside closes dropdown
- **WHEN** notification dropdown is open
- **AND** user clicks outside the dropdown
- **THEN** the dropdown closes

### Requirement: Notification Item Structure
Each notification item SHALL display: icon, title, description, timestamp, and read status.

#### Scenario: Notification item renders
- **WHEN** a notification is displayed in the dropdown
- **THEN** it shows an icon based on notification type
- **AND** it shows a title and description
- **AND** it shows relative timestamp (e.g., "2h atrás")
- **AND** unread items have a visual indicator

### Requirement: Extensible Notification Types
The notification system SHALL support multiple notification types: offer, payment, expiring, system.

#### Scenario: Adding new notification type
- **WHEN** a developer needs to add a new notification type
- **THEN** they can add a new type to the NotificationType enum
- **AND** add an icon mapping for the type
- **AND** notifications render correctly with the new type

### Requirement: Vehicle Type Icon Display
Intention cards SHALL display a vehicle type icon instead of stock photos.

#### Scenario: Car intention displays car icon
- **WHEN** an intention card is rendered for a CARRO type
- **THEN** a Car icon is displayed in the image area
- **AND** no external image is loaded

#### Scenario: Motorcycle intention displays bike icon
- **WHEN** an intention card is rendered for a MOTO type
- **THEN** a Bike icon is displayed in the image area

#### Scenario: Truck intention displays truck icon
- **WHEN** an intention card is rendered for a CAMINHAO type
- **THEN** a Truck icon is displayed in the image area
