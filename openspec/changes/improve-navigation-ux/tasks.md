## 1. Remove Messages from Navigation

- [x] 1.1 Remove messages item from mobile-nav.tsx navItems
- [x] 1.2 Remove messages item from sidebar.tsx navItems
- [x] 1.3 Add "Minhas Intenções" to mobile nav (FileText icon, /my-intentions)
- [x] 1.4 Update protected routes list in mobile-nav

## 2. Implement Saved Intentions (localStorage)

- [x] 2.1 Create `hooks/use-saved-intentions.ts` with localStorage persistence
- [x] 2.2 Implement `toggleSave`, `isSaved`, `getSavedIds` functions
- [x] 2.3 Sync with localStorage on mount and changes
- [x] 2.4 Export savedIds array for favorites page

## 3. Update Intention Card Icon

- [x] 3.1 Replace Heart import with Bookmark in intention-card.tsx
- [x] 3.2 Update save button icon from Heart to Bookmark
- [x] 3.3 Integrate with useSavedIntentions hook
- [x] 3.4 Update color scheme (use primary instead of error)

## 4. Update Favorites Page

- [x] 4.1 Import useSavedIntentions hook
- [x] 4.2 Fetch intentions by saved IDs
- [x] 4.3 Display saved intentions in grid
- [x] 4.4 Handle empty state

## 5. Notifications Dropdown

- [x] 5.1 Create `components/notifications/notification-item.tsx`
- [x] 5.2 Create `components/notifications/notifications-dropdown.tsx`
- [x] 5.3 Create `components/notifications/index.ts` exports
- [x] 5.4 Define notification types (offer, payment, expiring, system)
- [x] 5.5 Integrate dropdown in header.tsx
- [x] 5.6 Add empty state for no notifications
- [x] 5.7 Add "mark all as read" functionality (placeholder)

## 6. Replace Stock Photos with Vehicle Icons

- [x] 6.1 Import Car, Bike, Truck icons in intention-card.tsx
- [x] 6.2 Create vehicleTypeIcons map (CARRO -> Car, MOTO -> Bike, CAMINHAO -> Truck)
- [x] 6.3 Replace image div with icon container
- [x] 6.4 Style icon container with gradient background

## 7. Validation

- [ ] 7.1 Test saving/unsaving intentions persists
- [ ] 7.2 Test favorites page shows saved items
- [ ] 7.3 Test notifications dropdown opens/closes
- [ ] 7.4 Test mobile nav works without messages
- [ ] 7.5 Test vehicle icons display correctly per type
