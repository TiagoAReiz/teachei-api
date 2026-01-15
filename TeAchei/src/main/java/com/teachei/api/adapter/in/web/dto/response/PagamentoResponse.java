package com.teachei.api.adapter.in.web.dto.response;

import java.math.BigDecimal;

public record PagamentoResponse(
    String preferenceId,
    String initPoint,
    String sandboxInitPoint,
    BigDecimal valor
) {}



