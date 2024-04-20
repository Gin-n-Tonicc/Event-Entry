package com.ginAndTonic.LudogorieHackEnter2024.exceptions.skill;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.ApiException;
import org.springframework.http.HttpStatus;

/**
 * Exception thrown when a category with the same name already exists.
 * Sets the appropriate message using MessageSource (the messages are in src/main/resources/messages).
 */

public class SkillCreateException extends ApiException {
    public SkillCreateException(boolean isUnique) {
        super(
                isUnique
                        ? "Skill with the same name already exists"
                        : "Invalid user data",
                HttpStatus.BAD_REQUEST
        );
    }
}
