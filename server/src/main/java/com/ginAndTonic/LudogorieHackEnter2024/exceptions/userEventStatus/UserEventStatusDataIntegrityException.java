package com.ginAndTonic.LudogorieHackEnter2024.exceptions.userEventStatus;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.BadRequestException;

public class UserEventStatusDataIntegrityException extends BadRequestException {
    public UserEventStatusDataIntegrityException() {
        super("The user is already in the event");
    }
}
