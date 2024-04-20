package com.ginAndTonic.LudogorieHackEnter2024.model.dto.request;

import com.ginAndTonic.LudogorieHackEnter2024.enums.Role;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Skill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompleteOAuthRequest {
    private String firstname;
    private String lastname;
    private String address;
    private String education;
    private String currentWorkPlace;
    private String workExperience;
    private String description;
    private Role role;
    private List<Skill> skills = new ArrayList<>();
    private List<Skill> lookingForSkills = new ArrayList<>();
}