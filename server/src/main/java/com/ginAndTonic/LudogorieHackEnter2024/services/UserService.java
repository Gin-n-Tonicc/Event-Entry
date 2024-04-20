package com.ginAndTonic.LudogorieHackEnter2024.services;


import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.AdminUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.RegisterRequest;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.request.CompleteOAuthRequest;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.VerificationToken;
import com.ginAndTonic.LudogorieHackEnter2024.security.CustomOAuth2User;

import java.util.List;

public interface UserService {
    User createUser(RegisterRequest request);

    User findByEmail(String email);

    List<AdminUserDTO> getAllUsers();

    AdminUserDTO updateUser(Long id, AdminUserDTO userDTO, PublicUserDTO currentUser);

    void deleteUserById(Long id, PublicUserDTO currentUser);

    User processOAuthUser(CustomOAuth2User oAuth2User);

    User updateOAuth2UserWithFullData(CompleteOAuthRequest request, Long userId);

    User findById(Long id);

    void createVerificationToken(User user, String token);

    VerificationToken getVerificationToken(String VerificationToken);

    AdminUserDTO getById(Long userId);
}
