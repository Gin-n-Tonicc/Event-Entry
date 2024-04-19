package com.ginAndTonic.LudogorieHackEnter2024.model.dto.request;

import com.ginAndTonic.LudogorieHackEnter2024.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompleteOAuthRequest {
    private String firstname;
    private String lastname;
    private String address;
    private String description;
    private Role role;
}