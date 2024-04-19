package com.ginAndTonic.LudogorieHackEnter2024.exceptions;


import org.springframework.http.HttpStatus;

/**
 * Exception thrown to indicate internal server errors.
 * Extends ApiException and sets the appropriate message and HTTP status code.
 * Sets the appropriate message using MessageSource (the messages are in src/main/resources/messages).
 */
public class InternalServerErrorException extends ApiException {
    public InternalServerErrorException() {
        super("Internal server error!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public InternalServerErrorException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
