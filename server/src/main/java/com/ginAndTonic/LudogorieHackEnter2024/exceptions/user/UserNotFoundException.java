package com.ginAndTonic.LudogorieHackEnter2024.exceptions.user;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.NoSuchElementException;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

/**
 * Exception indicating that the user is not found.
 * Sets the appropriate message using MessageSource (the messages are in src/main/resources/messages).
 */
public class UserNotFoundException extends NoSuchElementException {
    public UserNotFoundException() {
        super("User is not found!");
    }

    public UserNotFoundException(String field) {
        super("User not fouund " + field);
    }
}
