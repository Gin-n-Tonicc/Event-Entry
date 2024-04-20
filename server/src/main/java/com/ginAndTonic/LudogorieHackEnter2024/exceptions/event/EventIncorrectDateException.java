package com.ginAndTonic.LudogorieHackEnter2024.exceptions.event;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.BadRequestException;

public class EventIncorrectDateException extends BadRequestException {

    public EventIncorrectDateException() {
        super("Invalid start or end datetime");
    }
}