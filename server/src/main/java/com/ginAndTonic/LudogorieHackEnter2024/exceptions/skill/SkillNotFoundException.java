package com.ginAndTonic.LudogorieHackEnter2024.exceptions.skill;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.NoSuchElementException;

/**
 * Exception thrown when the category is not found.
 * Sets the appropriate message using MessageSource (the messages are in src/main/resources/messages).
 */
public class SkillNotFoundException extends NoSuchElementException {
    public SkillNotFoundException() {
        super("Skill not found!");
    }
}