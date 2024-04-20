package com.ginAndTonic.LudogorieHackEnter2024.services.impl.security;


import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import com.ginAndTonic.LudogorieHackEnter2024.services.UserService;
import com.ginAndTonic.LudogorieHackEnter2024.services.impl.event.OnRegistrationCompleteEvent;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Component responsible for handling registration confirmation emails.
 */
@Component
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {

    @Autowired
    private UserService service;

    @Autowired
    private MessageSource messages;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void onApplicationEvent(@NotNull OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }

    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        service.createVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String subject = "Event Entry Registration Confirmation";
        String confirmationUrl = event.getAppUrl() + "auth/registrationConfirm?token=" + token;

        // Construct the email message
        String message = "Dear, " + user.getFirstname() + "\n\n"
                + "Thank you for registering!\n\n"
                + "To complete your registration, please click the following link to verify your email:\n"
                + confirmationUrl + "\n"
                + "If you did not create an account with us, please ignore this email.\n"
                + "Best regards,\n"
                + "Gin & Tonic Team!";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message);

        mailSender.send(email);
    }
}
