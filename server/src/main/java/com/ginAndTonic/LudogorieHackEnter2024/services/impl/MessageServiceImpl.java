package com.ginAndTonic.LudogorieHackEnter2024.services.impl;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.user.UserNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.MessageDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.response.EventResponseDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Message;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.MessagesRepository;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserRepository;
import com.ginAndTonic.LudogorieHackEnter2024.services.MessageService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    private final MessagesRepository messagesRepository;
    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public MessageServiceImpl(MessagesRepository messagesRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.messagesRepository = messagesRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<Message> getMessagesBetweenUsers(User sender, User receiver) {
        return messagesRepository.findMessagesBetweenUsers(sender, receiver);
    }

    @Override
    public Message sendMessage(MessageDTO message, PublicUserDTO loggedUser) {
        User logged = userRepository.findById(loggedUser.getId()).orElseThrow(UserNotFoundException::new);

        message.setSenderId(logged.getId());
        message.setSentAt(LocalDateTime.now());

        Message savedMessage = modelMapper.map(message, Message.class);
        return messagesRepository.save(savedMessage);
    }
}

