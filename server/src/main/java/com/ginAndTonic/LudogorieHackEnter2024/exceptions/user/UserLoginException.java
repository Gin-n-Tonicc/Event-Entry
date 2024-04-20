package com.ginAndTonic.LudogorieHackEnter2024.exceptions.user;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.BadRequestException;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

/**
 * Exception thrown when there is an issue with user login, such as invalid email or password.
 */
public class UserLoginException extends BadRequestException {
    public UserLoginException() {
        super("Invalid email or password!");
    }
}
