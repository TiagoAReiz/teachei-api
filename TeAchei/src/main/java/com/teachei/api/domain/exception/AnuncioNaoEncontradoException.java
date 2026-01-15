package com.teachei.api.domain.exception;

/**
 * Exception thrown when an intention/announcement is not found.
 */
public class AnuncioNaoEncontradoException extends DomainException {

    public AnuncioNaoEncontradoException(String id) {
        super("INTENTION_NOT_FOUND", "Anúncio não encontrado: " + id);
    }
}



