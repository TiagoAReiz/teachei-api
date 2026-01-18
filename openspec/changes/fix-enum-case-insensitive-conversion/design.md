# Design: Case-Insensitive Enum Conversion

## Context

The TeAchei API uses enums (e.g., `TipoVeiculo`) as path variables and request parameters. By default, Spring Boot's `StringToEnumConverterFactory` uses `Enum.valueOf()` which is case-sensitive. This causes runtime exceptions when clients send lowercase values like `moto` instead of `MOTO`.

**Stakeholders**: Frontend team (web/mobile), API consumers

## Goals / Non-Goals

### Goals
- Accept enum values in any case (lowercase, uppercase, mixed) in path variables and request parameters
- Provide clear error messages when invalid enum values are provided
- Apply the solution consistently across all endpoints using `TipoVeiculo`

### Non-Goals
- Creating a generic converter for all enums (scope limited to `TipoVeiculo` for now)
- Changing the enum constant names
- Modifying the existing enum structure

## Decisions

### Decision 1: Custom Converter vs. @JsonValue

**Chosen**: Custom Spring `Converter<String, TipoVeiculo>`

**Rationale**: 
- Path variables and request parameters use Spring's `ConversionService`, not Jackson
- `@JsonValue` only works for JSON deserialization in request bodies
- Custom converter gives us full control over conversion logic and error handling

**Alternatives considered**:
1. **`@JsonValue` on enum** - Only works for JSON body deserialization, not path/query params
2. **Accept String and convert in controller** - Duplicates logic, clutters controllers
3. **Global case-insensitive enum converter** - Could affect other enums unexpectedly

### Decision 2: Converter Location

**Chosen**: `com.teachei.api.config.web.StringToTipoVeiculoConverter`

**Rationale**: Follows project structure with config classes in `config` package

## Implementation Details

```java
@Component
public class StringToTipoVeiculoConverter implements Converter<String, TipoVeiculo> {
    @Override
    public TipoVeiculo convert(String source) {
        if (source == null || source.isBlank()) {
            return null;
        }
        try {
            return TipoVeiculo.valueOf(source.toUpperCase().trim());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(
                "Invalid vehicle type: '" + source + "'. Valid values: " + 
                Arrays.toString(TipoVeiculo.values()));
        }
    }
}
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Future enums might need same treatment | Document pattern; can extract generic converter if needed |
| Error message might expose internal enum names | Acceptable for API usability; enum values are part of API contract |

## Open Questions

- None; straightforward implementation
