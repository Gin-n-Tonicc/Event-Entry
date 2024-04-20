package com.ginAndTonic.LudogorieHackEnter2024.exceptions.files;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.NoSuchElementException;

/**
 * Exception thrown when a file is not found.
 * Sets the appropriate message using MessageSource (the messages are in src/main/resources/messages).
 */
public class FileNotFoundException extends NoSuchElementException {
    public FileNotFoundException() {
        super("File not found!");
    }
}
