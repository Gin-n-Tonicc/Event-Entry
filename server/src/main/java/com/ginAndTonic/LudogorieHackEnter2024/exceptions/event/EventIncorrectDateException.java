package com.ginAndTonic.LudogorieHackEnter2024.exceptions.event;

public class EventIncorrectDateException extends IllegalArgumentException {

    public EventIncorrectDateException() {
        super("Invalid start or end datetime");
    }
}