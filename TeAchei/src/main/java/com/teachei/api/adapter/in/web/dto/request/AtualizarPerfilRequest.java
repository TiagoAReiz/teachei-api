package com.teachei.api.adapter.in.web.dto.request;

import jakarta.validation.constraints.Size;

public record AtualizarPerfilRequest(
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    String nome,

    @Size(max = 500, message = "Bio deve ter no máximo 500 caracteres")
    String bio,

    String whatsapp,
    String instagram,
    String facebook,
    String cidade,
    String estado
) {}



