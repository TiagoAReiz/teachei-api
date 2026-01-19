## 1. Currency Input Component

- [x] 1.1 Create `CurrencyInput` component or add currency variant to Input
- [x] 1.2 Format value as "R$ X.XXX,XX" on display
- [x] 1.3 Parse input to extract numeric value
- [x] 1.4 Handle backspace and editing correctly

## 2. Update Specs Page

- [x] 2.1 Replace number Input with CurrencyInput for price
- [x] 2.2 Remove transmission dropdown and options
- [x] 2.3 Remove fuel dropdown and options
- [x] 2.4 Remove unused imports (transmissaoOptions, combustivelOptions)

## 3. Update Review Page

- [x] 3.1 Remove transmission from summaryItems
- [x] 3.2 Remove combustivel from summaryItems
- [x] 3.3 Remove Settings and FileText icons if unused
- [x] 3.4 Remove transmission/combustivel from store destructuring

## 4. Update Store

- [x] 4.1 Remove `transmissao` from state interface
- [x] 4.2 Remove `combustivel` from state interface
- [x] 4.3 Remove `setTransmissao` action
- [x] 4.4 Remove `setCombustivel` action
- [x] 4.5 Remove from initialState

## 5. Update Payment Price to R$ 0,01

- [x] 5.1 Update `application.yml` price-per-ad to 0.01
- [x] 5.2 Update `BeanConfiguration.java` default value to 0.01
- [x] 5.3 Update review page price display to R$ 0,01

## 6. Validation

- [ ] 6.1 Test currency input formats correctly
- [ ] 6.2 Verify intention creation works without transmission/fuel
- [ ] 6.3 Test payment flow with R$ 0,01
