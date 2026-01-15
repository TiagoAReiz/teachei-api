package com.teachei.api.domain.exception;

/**
 * Exception thrown when attempting to register with an existing email.
 */
public class EmailJaCadastradoException extends DomainException {

    public EmailJaCadastradoException(String email) {
        super("EMAIL_ALREADY_EXISTS", "Email já cadastrado: " + email);
    }
}



