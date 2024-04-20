package com.ginAndTonic.LudogorieHackEnter2024.services;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.UserEventStatusDTO;

import java.util.List;

public interface UserEventStatusService {
    List<UserEventStatusDTO> getAllUserEventStatuses();

    UserEventStatusDTO getUserEventStatusById(Long id);

    UserEventStatusDTO createUserEventStatus(UserEventStatusDTO userEventStatus, PublicUserDTO loggedUser);
    List<UserEventStatusDTO> getUserEventStatusesByUserId(Long userId);

    List<UserEventStatusDTO> getUserEventStatusesByEventId(Long eventId);
}
