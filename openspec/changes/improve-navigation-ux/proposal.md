# Change: Improve Navigation UX

## Why
The current navigation has several UX issues:
1. **Messages tab exists but has no functionality** - Creates confusion as users click on it expecting chat features that don't exist yet
2. **Saving intentions doesn't work** - The heart button only updates local state, it's not persisted anywhere
3. **Heart icon for saves is confusing** - Users associate hearts with "likes", not "bookmarks". Using a consistent bookmark icon improves clarity
4. **Notifications bell doesn't work** - Clicking does nothing; users expect to see their notifications

## What Changes

### 1. Remove Messages Tab
- Remove from mobile bottom navigation
- Remove from sidebar navigation  
- Keep the messages page for future but hide navigation access
- Replace with a 4th item in mobile nav (My Intentions - FileText icon)

### 2. Fix Saving Intentions (Local Storage)
- Implement localStorage-based saving for now (server-side can be added later)
- Create `useSavedIntentions` hook to manage saved state
- Persist saves across sessions
- Show saved intentions in the "Salvos" page

### 3. Change Heart Icon to Bookmark
- Replace Heart with Bookmark in intention cards
- Use consistent iconography across the app (Bookmark everywhere for saves)
- Update fill state for visual feedback

### 4. Notifications Dropdown
- Add dropdown to bell icon in header
- Create flexible notification item component
- Empty state when no notifications
- Structure that's easy to extend with future notification types:
  - New offer on your intention
  - Payment status updates
  - Intention expiring soon
  - System announcements

### 5. Replace Stock Photos with Vehicle Type Icons
- Remove random Unsplash car/motorcycle/truck images from intention cards
- Show simple vehicle type icon (Car, Bike, Truck) matching the selectors
- Cleaner, consistent look across all cards
- Faster loading (no external image requests)

## Impact
- **Affected code**:
  - `components/layout/mobile-nav.tsx` - Remove messages, add my-intentions
  - `components/layout/sidebar.tsx` - Remove messages link
  - `components/layout/header.tsx` - Add notifications dropdown
  - `components/intentions/intention-card.tsx` - Change Heart to Bookmark, replace image with icon
  - `hooks/use-saved-intentions.ts` (new) - Local storage hook for saves
  - `app/(main)/favorites/page.tsx` - Display saved intentions
  - `components/notifications/` (new) - Notification dropdown components
