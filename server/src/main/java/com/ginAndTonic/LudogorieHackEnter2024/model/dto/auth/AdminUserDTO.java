package com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth;

import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Skill;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminUserDTO extends PublicUserDTO {
    private String lastname;
    private boolean deleted;
    private String address;
    private List<Skill> skills = new ArrayList<>();
}
