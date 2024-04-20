package com.ginAndTonic.LudogorieHackEnter2024.exceptions.userEventStatus;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.BadRequestException;

public class UserEventStatusCreateException extends BadRequestException {
    public UserEventStatusCreateException() {
        super("The event is neither ongoing nor has finished!");
    }
}
