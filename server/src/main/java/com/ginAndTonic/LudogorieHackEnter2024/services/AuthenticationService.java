package com.ginAndTonic.LudogorieHackEnter2024.services;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.AuthenticationRequest;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.AuthenticationResponse;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.RegisterRequest;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.request.CompleteOAuthRequest;
import jakarta.servlet.http.Cookie;

import java.io.IOException;
import java.util.function.Consumer;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse completeOAuth2(CompleteOAuthRequest request, PublicUserDTO currentUser);

    AuthenticationResponse authenticate(AuthenticationRequest request);

    AuthenticationResponse refreshToken(String refreshToken) throws IOException;

    AuthenticationResponse me(
            String jwtToken
    );

    void attachAuthCookies(AuthenticationResponse authenticationResponse, Consumer<Cookie> cookieConsumer);

    void resetPassword(String token, String newPassword);
}
