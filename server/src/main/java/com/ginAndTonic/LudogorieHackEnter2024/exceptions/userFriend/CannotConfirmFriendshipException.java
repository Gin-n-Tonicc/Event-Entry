package com.ginAndTonic.LudogorieHackEnter2024.exceptions.userFriend;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.BadRequestException;

public class CannotConfirmFriendshipException extends BadRequestException {
    public CannotConfirmFriendshipException() {
        super("Cannot confirm friendship unless it is send to you!");
    }
}