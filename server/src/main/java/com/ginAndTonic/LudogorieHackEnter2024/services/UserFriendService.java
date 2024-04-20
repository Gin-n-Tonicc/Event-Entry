package com.ginAndTonic.LudogorieHackEnter2024.services;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.UserFriend;

import java.util.List;

public interface UserFriendService {
    void addFriend(PublicUserDTO user, Long friendId);

    void removeFriend(PublicUserDTO user, Long friendId);

    List<UserFriend> getFriendsForUser(PublicUserDTO friendId);
}
