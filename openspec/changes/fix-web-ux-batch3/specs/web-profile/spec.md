## ADDED Requirements

### Requirement: Profile Photo Upload
The system SHALL allow users to upload a profile photo that is stored as Base64 in the database.

#### Scenario: Upload profile photo
- **WHEN** user navigates to profile settings
- **AND** clicks on the avatar/photo area
- **THEN** a file picker SHALL open allowing image selection
- **AND** only JPEG, PNG, and WebP formats SHALL be accepted
- **AND** maximum file size SHALL be 500KB

#### Scenario: Photo validation
- **WHEN** user selects an image larger than 500KB
- **THEN** the system SHALL display an error message "Imagem deve ter no máximo 500KB"
- **AND** the upload SHALL be rejected

#### Scenario: Photo storage
- **WHEN** user successfully uploads a valid image
- **THEN** the image SHALL be converted to Base64
- **AND** stored in the `foto_base64` field of the profile entity
- **AND** the avatar component SHALL display the uploaded image immediately

#### Scenario: Photo display
- **WHEN** user profile has a `foto_base64` value
- **THEN** the avatar component SHALL display the Base64 image
- **WHEN** user profile has no photo
- **THEN** the avatar component SHALL display the default initials avatar

### Requirement: Backend Photo Endpoint
The backend SHALL provide an endpoint to upload and retrieve profile photos.

#### Scenario: Upload photo API
- **WHEN** authenticated user sends POST to `/api/perfil/foto` with Base64 image data
- **THEN** the system SHALL validate the image format and size
- **AND** store the Base64 string in the profile entity
- **AND** return 200 OK on success

#### Scenario: Retrieve photo with profile
- **WHEN** fetching a profile via `/api/perfil/{id}` or `/api/perfil/me`
- **THEN** the response SHALL include the `fotoBase64` field if a photo exists
