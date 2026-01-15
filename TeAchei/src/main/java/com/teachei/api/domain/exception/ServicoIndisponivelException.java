package com.teachei.api.domain.exception;

/**
 * Exception thrown when an external service is unavailable.
 */
public class ServicoIndisponivelException extends DomainException {

    public ServicoIndisponivelException(String serviceName) {
        super("SERVICE_UNAVAILABLE", "Serviço indisponível: " + serviceName);
    }

    public ServicoIndisponivelException(String serviceName, Throwable cause) {
        super("SERVICE_UNAVAILABLE", "Serviço indisponível: " + serviceName, cause);
    }
}



