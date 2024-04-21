package com.ginAndTonic.LudogorieHackEnter2024.controllers;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.user.UserNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.filters.JwtAuthenticationFilter;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.MessageDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Message;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserRepository;
import com.ginAndTonic.LudogorieHackEnter2024.services.MessageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {
    private final MessageService messageService;
    private final UserRepository userRepository;

    public MessageController(MessageService messageService, UserRepository userRepository) {
        this.messageService = messageService;
        this.userRepository = userRepository;
    }

    @GetMapping("/{receiverId}")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(HttpServletRequest httpServletRequest,
                                                                 @PathVariable Long receiverId) {
        PublicUserDTO loggedUser = (PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey);

        User sender = userRepository.findById(loggedUser.getId()).orElseThrow(UserNotFoundException::new);
        User receiver = userRepository.findById(receiverId).orElseThrow(UserNotFoundException::new);

        if (sender == null || receiver == null) {
            return ResponseEntity.notFound().build();
        }

        List<Message> messages = messageService.getMessagesBetweenUsers(sender, receiver);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageDTO message, HttpServletRequest httpServletRequest) {
        PublicUserDTO loggedUser = (PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey);

        Message sentMessage = messageService.sendMessage(message, loggedUser);
        return ResponseEntity.ok(sentMessage);
    }
}

