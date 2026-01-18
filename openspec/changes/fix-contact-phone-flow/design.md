# Design: Contact Phone Flow Fix

## Context

The frontend uses different field names than the backend, causing data to not be saved correctly:
- Frontend settings page: `telefone`
- Backend API: `whatsapp`

Additionally, React Hook Form's `defaultValues` doesn't update when async data loads after form initialization.

## Goals / Non-Goals

### Goals
- Align frontend field names with backend (`whatsapp` not `telefone`)
- Pre-fill profile edit form with existing user data
- Allow users to provide/modify contact phone during intention creation
- Optionally sync contact phone changes back to profile

### Non-Goals
- Changing backend field names
- Adding multiple phone number support
- Phone number verification/SMS

## Decisions

### Decision 1: Form Re-initialization Strategy

**Chosen**: Use `useEffect` with `reset()` when user data changes

```typescript
useEffect(() => {
  if (user) {
    reset({
      nome: user.nome || "",
      whatsapp: user.whatsapp || "",
      // ... other fields
    });
  }
}, [user, reset]);
```

**Rationale**: This is the recommended React Hook Form pattern for async default values.

### Decision 2: Contact Phone in Intention Flow

**Chosen**: Add optional contact phone input on review page with profile sync prompt

**Flow**:
1. Load review page → fetch user's current WhatsApp
2. Pre-fill "Telefone de contato" field
3. User can edit the phone
4. On submit, if phone differs from profile:
   - Show dialog: "Deseja atualizar seu telefone no perfil?"
   - If yes → call updateProfile then create intention
   - If no → proceed without updating profile
5. Submit intention with the provided phone

**Note**: The backend uses `ContatoInfo.fromPerfil()` which reads from the user's profile. If user updates profile first, the intention will have the correct phone. If not, we need to consider if the backend should accept a phone override in the request. For MVP, requiring profile update is acceptable.

### Decision 3: Field Label

**Chosen**: "WhatsApp" with format hint

**Rationale**: The field is specifically for WhatsApp contact, not just any phone. Using the correct label sets user expectations.

## Implementation Details

### Settings Page Changes

```typescript
const profileSchema = z.object({
  nome: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  whatsapp: z.string()
    .regex(/^$|^\+?[1-9]\d{10,14}$/, "Use formato internacional: +5511999998888")
    .optional(),
  // ... rest unchanged
});

// Add effect to reset form with user data
useEffect(() => {
  if (user) {
    reset({
      nome: user.nome || "",
      whatsapp: user.whatsapp || "",
      cidade: user.cidade || "",
      estado: user.estado || "",
      bio: user.bio || "",
      instagram: user.instagram || "",
      facebook: user.facebook || "",
    });
  }
}, [user, reset]);
```

### Review Page Changes

Add state for contact phone and confirmation dialog:

```typescript
const [telefoneContato, setTelefoneContato] = useState("");
const [showUpdateProfileDialog, setShowUpdateProfileDialog] = useState(false);
const { user, updateProfile } = useAuth();

// Pre-fill on load
useEffect(() => {
  if (user?.whatsapp) {
    setTelefoneContato(user.whatsapp);
  }
}, [user]);

// On submit, check if phone changed
const handleSubmit = () => {
  if (!telefoneContato) {
    error("WhatsApp é obrigatório para contato");
    return;
  }
  
  if (telefoneContato !== user?.whatsapp) {
    setShowUpdateProfileDialog(true);
    return;
  }
  
  proceedWithCreation();
};
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Backend reads phone from profile, not from request | Update profile before creating intention (or backend change in future) |
| User confusion about two phone fields | Clear labeling and explanation text |
