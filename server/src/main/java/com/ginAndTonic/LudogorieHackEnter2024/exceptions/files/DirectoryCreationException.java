package com.ginAndTonic.LudogorieHackEnter2024.exceptions.files;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.InternalServerErrorException;

/**
 * Exception thrown to indicate an error during directory creation.
 * Extends InternalServerErrorException and sets the appropriate message using MessageSource (the messages are in src/main/resources/messages).
 */
public class DirectoryCreationException extends InternalServerErrorException {
    public DirectoryCreationException() {
        super("Directory creation exception!");
    }
}

