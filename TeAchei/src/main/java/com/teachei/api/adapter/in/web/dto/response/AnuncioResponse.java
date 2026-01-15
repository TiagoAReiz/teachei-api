package com.teachei.api.adapter.in.web.dto.response;

import com.teachei.api.domain.model.Anuncio;
import com.teachei.api.domain.model.StatusAnuncio;
import com.teachei.api.domain.model.TipoVeiculo;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record AnuncioResponse(
    String id,
    String usuarioId,
    TipoVeiculo tipo,
    StatusAnuncio status,
    VeiculoResponse veiculo,
    ContatoResponse contato,
    String observacoes,
    LocalDateTime criadoEm,
    LocalDateTime expiraEm
) {
    public static AnuncioResponse fromDomain(Anuncio anuncio) {
        return new AnuncioResponse(
            anuncio.getId(),
            anuncio.getUsuarioId().toString(),
            anuncio.getTipo(),
            anuncio.getStatus(),
            VeiculoResponse.from(anuncio.getVeiculoInfo()),
            ContatoResponse.from(anuncio.getContatoInfo()),
            anuncio.getObservacoes(),
            anuncio.getCriadoEm(),
            anuncio.getExpiraEm()
        );
    }

    public record VeiculoResponse(
        String marcaCodigo,
        String marcaNome,
        String modeloCodigo,
        String modeloNome,
        List<Integer> anos,
        List<String> cores,
        BigDecimal precoMaximo,
        BigDecimal precoFipeReferencia,
        boolean dadosManuais
    ) {
        public static VeiculoResponse from(com.teachei.api.domain.model.VeiculoInfo info) {
            if (info == null) return null;
            return new VeiculoResponse(
                info.getMarcaCodigo(),
                info.getMarcaNome(),
                info.getModeloCodigo(),
                info.getModeloNome(),
                info.getAnos(),
                info.getCores(),
                info.getPrecoMaximo(),
                info.getPrecoFipeReferencia(),
                info.isDadosManuais()
            );
        }
    }

    public record ContatoResponse(
        String whatsapp,
        String whatsappLink,
        String instagram,
        String cidade,
        String estado,
        String localizacao
    ) {
        public static ContatoResponse from(com.teachei.api.domain.model.ContatoInfo info) {
            if (info == null) return null;
            return new ContatoResponse(
                info.getWhatsapp(),
                info.getWhatsappLink(),
                info.getInstagram(),
                info.getCidade(),
                info.getEstado(),
                info.getLocalizacao()
            );
        }
    }
}



