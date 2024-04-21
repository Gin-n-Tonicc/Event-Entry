package com.ginAndTonic.LudogorieHackEnter2024.services.impl.security;

import com.ginAndTonic.LudogorieHackEnter2024.enums.Provider;
import com.ginAndTonic.LudogorieHackEnter2024.enums.Role;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.AccessDeniedException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.user.UserCreateException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.user.UserNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.AdminUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.RegisterRequest;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.request.CompleteOAuthRequest;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.VerificationToken;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserRepository;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.VerificationTokenRepository;
import com.ginAndTonic.LudogorieHackEnter2024.security.CustomOAuth2User;
import com.ginAndTonic.LudogorieHackEnter2024.services.UserService;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final MessageSource messageSource;
    private final VerificationTokenRepository verificationTokenRepository;

    /**
     * Creates a new user based on the provided registration request.
     *
     * @param request The registration request containing user details.
     * @return The created user.
     * @throws UserCreateException             If there is an issue creating the user.
     * @throws DataIntegrityViolationException If there is a data integrity violation while creating the user.
     * @throws ConstraintViolationException    If there is a constraint violation while creating the user.
     */
    @Override
    public User createUser(RegisterRequest request) {
        Role roleFromReq = request.getRole();

        if (roleFromReq == null || roleFromReq.equals(Role.ADMIN)) {
            request.setRole(Role.USER);
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserCreateException(messageSource, true);
        }

        try {
            User user = buildUser(request);
            user.setCreatedAt(LocalDateTime.now());
            return userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new UserCreateException(messageSource, true);
        } catch (ConstraintViolationException exception) {
            throw new UserCreateException(exception.getConstraintViolations());
        }
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("email"));
    }

    @Override
    public List<AdminUserDTO> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(x -> modelMapper.map(x, AdminUserDTO.class))
                .toList();
    }

    @Override
    public AdminUserDTO updateUser(Long id, AdminUserDTO userDTO, PublicUserDTO currentUser) {
        User userToUpdate = findById(id);

        if (userToUpdate.getId().equals(currentUser.getId())) {
            throw new AccessDeniedException();
        }

        modelMapper.map(userDTO, userToUpdate);
        userToUpdate.setId(id);

        User updatedUser = userRepository.save(userToUpdate);
        return modelMapper.map(updatedUser, AdminUserDTO.class);
    }


    @Override
    public void deleteUserById(Long id, PublicUserDTO currentUser) {
        User user = findById(id);

        if (user.getId().equals(currentUser.getId())) {
            throw new AccessDeniedException();
        }

        user.setDeleted(true);
        userRepository.save(user);
    }

    /**
     * Processes the OAuth user obtained from the OAuth2 provider.
     * If the user does not exist in the database, a new user is created based on the OAuth user details.
     *
     * @param oAuth2User The OAuth2 user obtained from the OAuth provider.
     * @return The processed user.
     */
    @Override
    public User processOAuthUser(CustomOAuth2User oAuth2User) {
        User user = userRepository.findByEmail(oAuth2User.getEmail()).orElse(null);

        if (user == null) {
            // Default names after the user registers with OAUth2 and before they fill some other necessary information
            final String ADDRESS_PLACEHOLDER = "CHANGE_ADDRESS";
            final String EDUCATION_PLACEHOLDER = "CHANGE_EDUCATION";
            final String WORK_EXPERIENCE_PLACEHOLDER = "CHANGE_EXPERIENCE_CHANGE";
            final String WCHW_PLACEHOLDER = "CHANGE_WHAT_CAN_HELP_WITH";

            RegisterRequest registerRequest = new RegisterRequest();

            // TODO: Add missing setters!!
            registerRequest.setEmail(oAuth2User.getEmail());
            registerRequest.setProvider(oAuth2User.getProvider());
            registerRequest.setFirstname(oAuth2User.getName());
            registerRequest.setLastname("");
            registerRequest.setRole(Role.USER);
            registerRequest.setAddress(ADDRESS_PLACEHOLDER);
            registerRequest.setEducation(EDUCATION_PLACEHOLDER);
            registerRequest.setWorkExperience(WORK_EXPERIENCE_PLACEHOLDER);
            registerRequest.setWhatCanHelpWith(WCHW_PLACEHOLDER);

            user = userRepository.save(buildUser(registerRequest));
        }

        return user;
    }

    @Override
    public User updateOAuth2UserWithFullData(CompleteOAuthRequest request, Long userId) {
        User user = findById(userId);
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setAddress(request.getAddress());
        user.setEducation(request.getEducation());
        user.setCurrentWorkPlace(request.getCurrentWorkPlace());
        user.setWorkExperience(request.getWorkExperience());
        user.setWhatCanHelpWith(request.getWhatCanHelpWith());
        user.setRole(request.getRole());
        user.setSkills(request.getSkills());
        user.setLookingForSkills(request.getLookingForSkills());
        user.setAdditionalInfoRequired(false);

        return userRepository.save(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("id"));
    }

    private User buildUser(RegisterRequest request) {
        boolean additionalInfoRequired = !request.getProvider().equals(Provider.LOCAL);

        User.UserBuilder userBuilder = User
                .builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .role(request.getRole())
                .provider(request.getProvider())
                .address(request.getAddress())
                .education(request.getEducation())
                .currentWorkPlace(request.getCurrentWorkPlace())
                .workExperience(request.getWorkExperience())
                .whatCanHelpWith(request.getWhatCanHelpWith())
                .skills(request.getSkills())
                .lookingForSkills(request.getLookingForSkills())
                .additionalInfoRequired(additionalInfoRequired)
                .deleted(false);

        if (request.getPassword() != null) {
            userBuilder.password(passwordEncoder.encode(request.getPassword()));
        }

        return userBuilder.build();
    }

    @Override
    public VerificationToken getVerificationToken(String VerificationToken) {
        return verificationTokenRepository.findByToken(VerificationToken);
    }

    @Override
    public AdminUserDTO getById(Long userId) {
        User user = findById(userId);

        if (user.isDeleted()) {
            throw new UserNotFoundException("id");
        }

        return modelMapper.map(user, AdminUserDTO.class);
    }

    @Override
    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(token, user);
        verificationTokenRepository.save(myToken);
    }
}
