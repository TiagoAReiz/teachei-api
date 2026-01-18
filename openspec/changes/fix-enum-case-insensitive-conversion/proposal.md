# Change: Fix Case-Insensitive Enum Conversion for TipoVeiculo

## Why

API requests using lowercase enum values (e.g., `moto`, `carro`) fail with `MethodArgumentTypeMismatchException` because Spring's default enum converter is case-sensitive. The frontend/clients send lowercase values in URLs (`/v1/veiculos/moto/marcas`) but the `TipoVeiculo` enum uses uppercase constants (`MOTO`, `CARRO`, `CAMINHAO`).

## What Changes

- Add a custom Spring `Converter<String, TipoVeiculo>` that performs case-insensitive conversion
- Register the converter in a `WebMvcConfigurer` configuration class
- Improve error handling with a meaningful error message when an invalid enum value is provided

## Impact

- Affected specs: api-parameter-handling (new), vehicle-data
- Affected code:
  - `VeiculoController.java` - Uses `@PathVariable TipoVeiculo tipo`
  - `AnuncioController.java` - Uses `@RequestParam TipoVeiculo tipo`
  - New files: `StringToTipoVeiculoConverter.java`, `WebMvcConfig.java` (or add to existing config)
