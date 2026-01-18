# Change: Fix Contact Phone Flow in Profile and Intention Creation

## Why

Two issues are affecting the user experience:

1. **WhatsApp error when creating intention**: Users get "WhatsApp é obrigatório para contato" error even with phone filled in profile. The frontend settings page uses `telefone` field but backend expects `whatsapp`.

2. **Profile edit doesn't pre-fill values**: When users navigate to edit profile (Settings), the form fields don't always show current values due to React Hook Form timing issues (form created before user data loads).

## What Changes

### Frontend (teachei-web)

1. **Settings page**: 
   - Rename `telefone` field to `whatsapp` to match backend
   - Add `reset()` to re-initialize form when user data loads
   - Add WhatsApp format validation hint

2. **Create intention review page**:
   - Add "Telefone de contato" field pre-filled with user's WhatsApp
   - If user changes it, show dialog asking if they want to update their profile
   - Block submission if WhatsApp is empty

### Backend (no changes needed)

The backend already correctly:
- Requires `whatsapp` in `ContatoInfo` for intention creation
- Accepts `whatsapp` in `AtualizarPerfilRequest`

## Impact

- Affected specs: profile-management, intention-creation
- Affected code:
  - `teachei-web/app/(main)/settings/page.tsx` - Profile edit form
  - `teachei-web/app/create/review/page.tsx` - Intention review page
  - `teachei-web/stores/create-intention-store.ts` - May need to store contact phone
