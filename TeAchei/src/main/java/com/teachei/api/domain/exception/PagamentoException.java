package com.teachei.api.domain.exception;

/**
 * Exception thrown when payment processing fails.
 */
public class PagamentoException extends DomainException {

    public PagamentoException(String message) {
        super("PAYMENT_ERROR", message);
    }

    public PagamentoException(String message, Throwable cause) {
        super("PAYMENT_ERROR", message, cause);
    }
}



