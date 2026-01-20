# Proposal: Fix Frontend Issues Batch 2

## Summary
Address multiple frontend bugs and UX improvements reported for the TeAchei web application, including favorites functionality, intention management, feed filters, and payment confirmation.

## Motivation
Several issues were reported affecting core user flows:
1. Saving to favorites doesn't work on the intention detail page
2. No way to delete user's own intentions from the UI
3. Missing city/state fields when creating intentions
4. Payment confirmation not updating intention status
5. Remove vehicle type filter from sidebar (redundant with feed filters)
6. Add mileage range filter capability
7. Add model filter to feed

## Scope

### In Scope
- Fix favorites on intention detail page (use useSavedIntentions hook)
- Add delete functionality for user's intentions in my-intentions page
- Add city/state fields to intention creation flow
- Investigate and fix payment webhook processing
- Remove redundant vehicle type filter from sidebar
- Add mileage range to vehicle specs (backend + frontend)
- Add model filter to feed filters

### Out of Scope
- New notification types
- Mobile app changes

## Affected Capabilities
- web-intention-detail: Fix favorites persistence
- web-intention-management: Add delete UI
- web-feed-filters: Remove type filter, add model/mileage filters
- web-intention-creation: Add city/state fields
- payment-webhook: Fix status confirmation

## Risks
- **Low**: Adding mileage requires backend model changes
- **Medium**: Payment webhook issues may be infrastructure-related (webhook URL, firewall)
