package com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth;

import com.ginAndTonic.LudogorieHackEnter2024.enums.Role;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublicUserDTO {
    private Long id;
    private String firstname;

    private String email;
    private Role role;
    private String education;
    private String currentWorkPlace;
    private String workExperience;
    private String whatCanHelpWith;
    private boolean additionalInfoRequired;
}
