package com.ginAndTonic.LudogorieHackEnter2024.services.impl;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.user.UserNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.MessageDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Message;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.MessagesRepository;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserRepository;
import com.ginAndTonic.LudogorieHackEnter2024.services.MessageService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.modelmapper.ModelMapper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    private final MessagesRepository messagesRepository;
    private final UserRepository userRepository;

    private final ModelMapper modelMapper;
    private final JavaMailSender emailSender;

    public MessageServiceImpl(MessagesRepository messagesRepository, UserRepository userRepository, ModelMapper modelMapper, JavaMailSender emailSender) {
        this.messagesRepository = messagesRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.emailSender = emailSender;
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

        sendMessageEmail(savedMessage);
        return messagesRepository.save(savedMessage);
    }
    @Async
    private void sendMessageEmail(Message savedMessage) {
        User userReceiver = userRepository.findById(savedMessage.getReceiverId().getId()).get();

        String subject = "You have a message from user in EventEntry";

        String message = "Dear, " + userReceiver.getFirstname() + "\n\n"
                + "You have a message from " + userReceiver.getFirstname()+ "\n"
                + "You can go and check it at our out site.\n"
                + "Best regards,\n"
                + "Gin & Tonic Team!";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(userReceiver.getEmail());
        email.setSubject(subject);
        email.setText(message);

        sendEmail(userReceiver.getEmail(), subject, message);
    }

    public void sendEmail(String to, String subject, String text) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

