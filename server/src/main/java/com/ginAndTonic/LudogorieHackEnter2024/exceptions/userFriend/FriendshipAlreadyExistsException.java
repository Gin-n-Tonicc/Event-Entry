package com.ginAndTonic.LudogorieHackEnter2024.exceptions.userFriend;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.BadRequestException;

public class FriendshipAlreadyExistsException extends BadRequestException {
    public FriendshipAlreadyExistsException() {
        super("Friendship already exists exception!");
    }
}
