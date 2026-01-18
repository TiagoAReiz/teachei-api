package com.teachei.api.domain.exception;

/**
 * Exception thrown when authentication credentials are invalid.
 */
public class CredenciaisInvalidasException extends DomainException {

    public CredenciaisInvalidasException() {
        super("INVALID_CREDENTIALS", "Credenciais inválidas");
    }

    public CredenciaisInvalidasException(String message) {
        super("INVALID_CREDENTIALS", message);
    }
}



