package com.ginAndTonic.LudogorieHackEnter2024.services;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.EventDTO;

import java.util.List;

public interface EventService {
    List<EventDTO> getAllEvents();

    EventDTO getEventById(Long id);

    EventDTO createEvent(EventDTO categoryDTO, PublicUserDTO loggedUser);

    EventDTO updateEvent(Long id, EventDTO categoryDTO, PublicUserDTO loggedUser);

    void deleteEvent(Long id);
}