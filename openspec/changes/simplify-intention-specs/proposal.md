# Change: Simplify Intention Specs Form

## Why
The current intention creation form has two usability issues:
1. **Price input is confusing** - Users enter a raw number (e.g., 50000) but the placeholder shows "R$ 0,00", creating a disconnect. Users expect to see formatted currency as they type.
2. **Redundant fields** - Transmission and fuel type are manually selected, but these are already specified by the FIPE table when the user selects a model+year combination. This creates unnecessary friction and potential inconsistency.

## What Changes

### 1. Currency-Formatted Price Input
- **Current**: Plain number input showing raw value (e.g., 50000)
- **New**: Currency-formatted input that displays "R$ 50.000,00" as user types
- Use Brazilian currency format (R$ X.XXX,XX)
- Input should still store the raw number value internally

### 2. Remove Transmission and Fuel Fields
- **Current**: Two dropdowns for "Transmissão" and "Combustível" on specs page
- **New**: Remove these fields entirely from the form
- Remove from the review summary
- Remove from the store state
- The FIPE year selection already includes this info (e.g., "2024 Gasolina", "2023 Flex")

### 3. Set Price to R$ 0,01 for Testing
- **Current**: R$ 2,00 per intention
- **New**: R$ 0,01 (1 centavo) for testing payment flow
- Update backend `application.yml` and `BeanConfiguration.java`
- Update frontend display in review page

## Impact
- **Affected specs**: web-intention-creation
- **Affected code**:
  - `teachei-web/app/create/specs/page.tsx` - Remove transmission/fuel, add currency input
  - `teachei-web/app/create/review/page.tsx` - Remove transmission/fuel from summary, update price display
  - `teachei-web/stores/create-intention-store.ts` - Remove transmission/fuel state
  - `teachei-web/components/ui/input.tsx` - May need currency input variant or new component
  - `TeAchei/src/main/resources/application.yml` - Update price to 0.01
  - `TeAchei/src/main/java/.../config/BeanConfiguration.java` - Update default price
