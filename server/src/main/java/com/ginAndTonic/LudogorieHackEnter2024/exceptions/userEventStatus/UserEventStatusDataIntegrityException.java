package com.ginAndTonic.LudogorieHackEnter2024.exceptions.userEventStatus;

import org.springframework.dao.DataIntegrityViolationException;

public class UserEventStatusDataIntegrityException extends DataIntegrityViolationException {
    public UserEventStatusDataIntegrityException() {
        super("The user is already in the event");
    }
}
