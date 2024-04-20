package com.ginAndTonic.LudogorieHackEnter2024.services;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.EventDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.request.EventRequestDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.response.EventResponseDTO;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface EventService {
    List<EventResponseDTO> getAllEvents();

    EventResponseDTO getEventById(Long id);

    EventResponseDTO createEvent(EventRequestDTO categoryDTO, PublicUserDTO loggedUser);

    EventResponseDTO updateEvent(Long id, EventDTO categoryDTO, PublicUserDTO loggedUser);

    void deleteEvent(Long id);

    List<EventResponseDTO> searchEvents(String searchTerm, Long skillId);
    EventResponseDTO addLike(Long eventId, PublicUserDTO loggedUser);
    List<EventResponseDTO> filterEventsByCriteria(boolean hasGoneTo, String filterType, PublicUserDTO publicUserDTO, int n)  throws ChangeSetPersister.NotFoundException;
}