package com.teachei.api.domain.exception;

/**
 * Exception thrown when an intention/announcement is invalid.
 */
public class AnuncioInvalidoException extends DomainException {

    public AnuncioInvalidoException(String message) {
        super("INVALID_INTENTION", message);
    }
}



