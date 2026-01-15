package com.teachei.api.domain.exception;

/**
 * Exception thrown when access is denied to a resource.
 */
public class AcessoNegadoException extends DomainException {

    public AcessoNegadoException() {
        super("ACCESS_DENIED", "Acesso negado");
    }

    public AcessoNegadoException(String message) {
        super("ACCESS_DENIED", message);
    }
}



