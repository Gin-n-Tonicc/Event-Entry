package com.ginAndTonic.LudogorieHackEnter2024.exceptions.userFriend;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.NoSuchElementException;

public class UserFriendNotFoundException extends NoSuchElementException {
    public UserFriendNotFoundException() {
        super("Friendship not found!");
    }
}