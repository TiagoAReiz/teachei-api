package com.teachei.api.adapter.in.web.controller;

import com.teachei.api.application.ports.in.BuscarVeiculosUseCase;
import com.teachei.api.application.ports.in.BuscarVeiculosUseCase.MarcaDTO;
import com.teachei.api.config.StringToTipoVeiculoConverter;
import com.teachei.api.config.WebMvcConfig;
import com.teachei.api.domain.model.TipoVeiculo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(VeiculoController.class)
@Import({WebMvcConfig.class, StringToTipoVeiculoConverter.class})
@DisplayName("VeiculoController - Case Insensitive Enum")
class VeiculoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BuscarVeiculosUseCase buscarVeiculosUseCase;

    @Test
    @WithMockUser
    @DisplayName("should accept lowercase tipo in path variable")
    void shouldAcceptLowercaseTipo() throws Exception {
        when(buscarVeiculosUseCase.buscarMarcas(TipoVeiculo.MOTO))
            .thenReturn(List.of(new MarcaDTO("1", "Honda")));

        mockMvc.perform(get("/v1/veiculos/moto/marcas"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.items[0].nome").value("Honda"));
    }

    @Test
    @WithMockUser
    @DisplayName("should accept uppercase tipo in path variable")
    void shouldAcceptUppercaseTipo() throws Exception {
        when(buscarVeiculosUseCase.buscarMarcas(TipoVeiculo.CARRO))
            .thenReturn(List.of(new MarcaDTO("1", "Volkswagen")));

        mockMvc.perform(get("/v1/veiculos/CARRO/marcas"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.items[0].nome").value("Volkswagen"));
    }

    @Test
    @WithMockUser
    @DisplayName("should accept mixed case tipo in path variable")
    void shouldAcceptMixedCaseTipo() throws Exception {
        when(buscarVeiculosUseCase.buscarMarcas(TipoVeiculo.CAMINHAO))
            .thenReturn(List.of(new MarcaDTO("1", "Scania")));

        mockMvc.perform(get("/v1/veiculos/Caminhao/marcas"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.items[0].nome").value("Scania"));
    }

    @Test
    @WithMockUser
    @DisplayName("should return 400 for invalid tipo value")
    void shouldReturn400ForInvalidTipo() throws Exception {
        mockMvc.perform(get("/v1/veiculos/bicicleta/marcas"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errorCode").value("INVALID_PARAMETER"));
    }
}
