package com.ginAndTonic.LudogorieHackEnter2024.model.dto.response;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.EventDTO;

import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Event;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Skill;

import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventResponseDTO extends EventDTO {
    private List<PublicUserDTO> liked_users = new ArrayList<>();
    private List<Skill> skills = new ArrayList<>();
}
