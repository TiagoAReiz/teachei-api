package com.teachei.api.domain.model;

/**
 * Optional vehicle features that buyers can specify in their intentions.
 */
public enum OpcionalVeiculo {
    VIDRO_ELETRICO("Vidro Elétrico"),
    AR_CONDICIONADO("Ar Condicionado"),
    DIRECAO_HIDRAULICA("Direção Hidráulica"),
    DIRECAO_ELETRICA("Direção Elétrica"),
    TETO_SOLAR("Teto Solar"),
    BANCOS_COURO("Bancos de Couro"),
    SENSOR_ESTACIONAMENTO("Sensor de Estacionamento"),
    CAMERA_RE("Câmera de Ré"),
    MULTIMIDIA("Central Multimídia"),
    BLUETOOTH("Bluetooth"),
    AIRBAG("Airbag"),
    ABS("Freios ABS"),
    ALARME("Alarme"),
    RODAS_LIGA("Rodas de Liga"),
    PILOTO_AUTOMATICO("Piloto Automático");

    private final String label;

    OpcionalVeiculo(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
