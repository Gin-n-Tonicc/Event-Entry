package com.ginAndTonic.LudogorieHackEnter2024.services;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.MessageDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;

import java.util.List;

public interface MessageService {
    List<MessageDTO> getMessagesBetweenUsers(User sender, User receiver);

    MessageDTO sendMessage(MessageDTO message, PublicUserDTO loggedUser);
}
