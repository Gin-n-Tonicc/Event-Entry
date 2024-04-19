package com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth;

import com.ginAndTonic.LudogorieHackEnter2024.enums.Provider;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.request.CompleteOAuthRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest extends CompleteOAuthRequest {
    private String email;
    private String password;
    private String username;
    private Provider provider = Provider.LOCAL;
}
