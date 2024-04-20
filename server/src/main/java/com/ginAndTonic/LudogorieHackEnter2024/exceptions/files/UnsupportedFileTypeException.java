package com.ginAndTonic.LudogorieHackEnter2024.exceptions.files;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.UnsupportedMediaTypeException;
import org.springframework.context.MessageSource;

/**
 * Exception thrown to indicate that the requested file type is not supported.
 * Extends UnsupportedMediaTypeException and sets the appropriate message using MessageSource (the messages are in src/main/resources/messages).
 */
public class UnsupportedFileTypeException extends UnsupportedMediaTypeException {
    public UnsupportedFileTypeException(MessageSource messageSource) {
        super("Unsuported file type!");
    }
}
