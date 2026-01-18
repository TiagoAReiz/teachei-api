# Tasks

## 1. Fix Profile Edit Form (Settings Page)

- [x] 1.1 Rename `telefone` field to `whatsapp` in settings/page.tsx schema
- [x] 1.2 Add `useEffect` with `reset()` to re-initialize form when user data loads
- [x] 1.3 Update field label to "WhatsApp" with format hint (+55...)
- [x] 1.4 Add WhatsApp validation pattern (international format)

## 2. Add Contact Phone to Intention Review

- [x] 2.1 Add `telefoneContato` state to review page (using local state instead of store)
- [x] 2.2 Fetch user's WhatsApp on review page load and pre-fill
- [x] 2.3 Add editable WhatsApp input field on review page
- [x] 2.4 Validate WhatsApp is not empty before submission
- [x] 2.5 If WhatsApp changed, show confirmation dialog to update profile
- [x] 2.6 Call updateProfile API if user confirms profile update

## 3. Testing

- [ ] 3.1 Test profile edit with existing user data - fields should be pre-filled
- [ ] 3.2 Test profile edit with empty fields - should save correctly
- [ ] 3.3 Test intention creation with WhatsApp in profile - should work
- [ ] 3.4 Test intention creation without WhatsApp - should show error on review page
- [ ] 3.5 Test changing WhatsApp on review - should prompt to update profile
