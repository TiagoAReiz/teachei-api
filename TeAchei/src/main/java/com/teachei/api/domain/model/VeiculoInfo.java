package com.teachei.api.domain.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Value Object for Vehicle Information.
 * Contains brand, model, years, colors, and maximum price.
 */
public class VeiculoInfo {

    private String marcaCodigo;
    private String marcaNome;
    private String modeloCodigo;
    private String modeloNome;
    private List<Integer> anos;
    private List<String> cores;
    private BigDecimal precoMaximo;
    private BigDecimal precoFipeReferencia;
    private boolean dadosManuais;

    public VeiculoInfo() {
        this.anos = new ArrayList<>();
        this.cores = new ArrayList<>();
    }

    public VeiculoInfo(String marcaCodigo, String marcaNome, String modeloCodigo, String modeloNome,
                       List<Integer> anos, List<String> cores, BigDecimal precoMaximo) {
        this.marcaCodigo = marcaCodigo;
        this.marcaNome = marcaNome;
        this.modeloCodigo = modeloCodigo;
        this.modeloNome = modeloNome;
        this.anos = anos != null ? new ArrayList<>(anos) : new ArrayList<>();
        this.cores = cores != null ? new ArrayList<>(cores) : new ArrayList<>();
        this.precoMaximo = precoMaximo;
        this.dadosManuais = false;
    }

    public static VeiculoInfo criarManual(String marcaNome, String modeloNome,
                                           List<Integer> anos, List<String> cores, 
                                           BigDecimal precoMaximo) {
        VeiculoInfo info = new VeiculoInfo();
        info.marcaNome = marcaNome;
        info.modeloNome = modeloNome;
        info.anos = anos != null ? new ArrayList<>(anos) : new ArrayList<>();
        info.cores = cores != null ? new ArrayList<>(cores) : new ArrayList<>();
        info.precoMaximo = precoMaximo;
        info.dadosManuais = true;
        return info;
    }

    public void validar() {
        if (marcaNome == null || marcaNome.isBlank()) {
            throw new IllegalArgumentException("Marca é obrigatória");
        }
        if (modeloNome == null || modeloNome.isBlank()) {
            throw new IllegalArgumentException("Modelo é obrigatório");
        }
        if (anos == null || anos.isEmpty()) {
            throw new IllegalArgumentException("Pelo menos um ano deve ser selecionado");
        }
        if (cores == null || cores.isEmpty()) {
            throw new IllegalArgumentException("Pelo menos uma cor deve ser selecionada");
        }
        if (precoMaximo == null || precoMaximo.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Preço máximo deve ser maior que zero");
        }
    }

    public String getDescricaoCompleta() {
        return String.format("%s %s (%s)", marcaNome, modeloNome, 
            anos.size() == 1 ? anos.get(0).toString() : anos.get(0) + "-" + anos.get(anos.size() - 1));
    }

    // Getters and Setters
    public String getMarcaCodigo() {
        return marcaCodigo;
    }

    public void setMarcaCodigo(String marcaCodigo) {
        this.marcaCodigo = marcaCodigo;
    }

    public String getMarcaNome() {
        return marcaNome;
    }

    public void setMarcaNome(String marcaNome) {
        this.marcaNome = marcaNome;
    }

    public String getModeloCodigo() {
        return modeloCodigo;
    }

    public void setModeloCodigo(String modeloCodigo) {
        this.modeloCodigo = modeloCodigo;
    }

    public String getModeloNome() {
        return modeloNome;
    }

    public void setModeloNome(String modeloNome) {
        this.modeloNome = modeloNome;
    }

    public List<Integer> getAnos() {
        return Collections.unmodifiableList(anos);
    }

    public void setAnos(List<Integer> anos) {
        this.anos = anos != null ? new ArrayList<>(anos) : new ArrayList<>();
    }

    public List<String> getCores() {
        return Collections.unmodifiableList(cores);
    }

    public void setCores(List<String> cores) {
        this.cores = cores != null ? new ArrayList<>(cores) : new ArrayList<>();
    }

    public BigDecimal getPrecoMaximo() {
        return precoMaximo;
    }

    public void setPrecoMaximo(BigDecimal precoMaximo) {
        this.precoMaximo = precoMaximo;
    }

    public BigDecimal getPrecoFipeReferencia() {
        return precoFipeReferencia;
    }

    public void setPrecoFipeReferencia(BigDecimal precoFipeReferencia) {
        this.precoFipeReferencia = precoFipeReferencia;
    }

    public boolean isDadosManuais() {
        return dadosManuais;
    }

    public void setDadosManuais(boolean dadosManuais) {
        this.dadosManuais = dadosManuais;
    }
}



