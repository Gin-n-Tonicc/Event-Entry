package com.ginAndTonic.LudogorieHackEnter2024.exceptions.event;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.NoSuchElementException;

/**
 * Exception thrown when the event is not found.
 */
public class EventNotFoundException extends NoSuchElementException {
    public EventNotFoundException() {
        super("Event not found");
    }
}