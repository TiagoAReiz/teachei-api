package com.teachei.api.application.usecase;

import com.teachei.api.application.ports.in.BuscarPlanosUseCase;
import com.teachei.api.config.SubscriptionConfig;
import com.teachei.api.domain.model.PlanoAssinatura;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of BuscarPlanosUseCase.
 */
public class BuscarPlanosUseCaseImpl implements BuscarPlanosUseCase {

    private final SubscriptionConfig subscriptionConfig;

    public BuscarPlanosUseCaseImpl(SubscriptionConfig subscriptionConfig) {
        this.subscriptionConfig = subscriptionConfig;
    }

    @Override
    public List<PlanoInfo> executar() {
        return Arrays.stream(PlanoAssinatura.values())
            .map(plano -> new PlanoInfo(
                plano,
                plano.getNome(),
                subscriptionConfig.getPriceForPlan(plano),
                plano.getDuracaoDias(),
                plano.isRecorrente()
            ))
            .collect(Collectors.toList());
    }
}
