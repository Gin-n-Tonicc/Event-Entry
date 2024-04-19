package com.ginAndTonic.LudogorieHackEnter2024.exceptions;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown to indicate access denied errors.
 * Extends ApiException and sets the appropriate message and HTTP status code.
 * Sets the appropriate message using MessageSource (the messages are in src/main/resources/messages).
 */
public class AccessDeniedException extends ApiException {
    public AccessDeniedException() {
        super("Access denied!", HttpStatus.FORBIDDEN);
    }
}
