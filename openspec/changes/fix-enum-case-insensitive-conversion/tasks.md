# Tasks

## 1. Implementation

- [x] 1.1 Create `StringToTipoVeiculoConverter` class implementing `Converter<String, TipoVeiculo>`
- [x] 1.2 Create or update `WebMvcConfig` to register the converter with `FormatterRegistry`
- [x] 1.3 Add proper error handling for invalid enum values with descriptive error message
- [x] 1.4 Update `GlobalExceptionHandler` to handle conversion failures gracefully (if not already covered)

## 2. Testing

- [x] 2.1 Add unit tests for `StringToTipoVeiculoConverter` (lowercase, uppercase, mixed case, invalid values)
- [x] 2.2 Add integration tests for VeiculoController with lowercase enum values in path
- [ ] 2.3 Verify existing tests still pass (to be validated in CI/CD)

## 3. Validation

- [ ] 3.1 Test endpoint `/v1/veiculos/moto/marcas` returns 200 OK
- [ ] 3.2 Test endpoint `/v1/veiculos/MOTO/marcas` returns 200 OK
- [ ] 3.3 Test endpoint `/v1/veiculos/Moto/marcas` returns 200 OK
- [ ] 3.4 Test endpoint `/v1/veiculos/invalid/marcas` returns 400 Bad Request with clear error
