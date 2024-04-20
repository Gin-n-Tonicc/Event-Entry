package com.ginAndTonic.LudogorieHackEnter2024.services.impl;

import com.ginAndTonic.LudogorieHackEnter2024.enums.Role;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.AccessDeniedException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.NoSuchElementException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.event.EventIncorrectDateException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.event.EventNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.user.UserNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.EventDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.request.EventRequestDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.response.EventResponseDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Event;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.UserEventStatus;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.EventRepository;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserEventStatusRepository;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserRepository;
import com.ginAndTonic.LudogorieHackEnter2024.services.EventService;
import org.modelmapper.ModelMapper;
import org.springframework.context.MessageSource;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    private final UserEventStatusRepository userEventStatusRepository;
    private final MessageSource messageSource;

    public EventServiceImpl(EventRepository eventRepository, UserRepository userRepository, ModelMapper modelMapper, UserEventStatusRepository userEventStatusRepository, MessageSource messageSource) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.userEventStatusRepository = userEventStatusRepository;
        this.messageSource = messageSource;
    }

    @Override
    public List<EventResponseDTO> getAllEvents() {
        List<Event> events = eventRepository.findByDeletedFalseOrderByIdDesc();
        return events.stream().map(event -> modelMapper.map(event, EventResponseDTO.class)).toList();
    }

    @Override
    public EventResponseDTO getEventById(Long id) {
        Optional<Event> event = eventRepository.findByIdAndDeletedFalse(id);
        if (event.isPresent()) {
            return modelMapper.map(event.get(), EventResponseDTO.class);
        }
        throw new EventNotFoundException();
    }

    @Override
    public EventResponseDTO createEvent(EventRequestDTO eventRequestDTO, PublicUserDTO loggedUser) {
        if (loggedUser == null || loggedUser.getRole() == Role.USER) {
            throw new AccessDeniedException();
        }

        LocalDateTime startDatetime = eventRequestDTO.getStartTime();
        LocalDateTime endDatetime = eventRequestDTO.getEndTime();

        if (startDatetime == null || endDatetime == null || startDatetime.isAfter(endDatetime)) {
            throw new EventIncorrectDateException();
        }

        eventRequestDTO.setId(null);
        Event eventEntity = eventRepository.save(modelMapper.map(eventRequestDTO, Event.class));

        Optional<User> user = userRepository.findById(loggedUser.getId());
        eventEntity.setOwnerId(user.orElseThrow(UserNotFoundException::new));

        return modelMapper.map(eventEntity, EventResponseDTO.class);
    }


    @Override
    public EventResponseDTO updateEvent(Long id, EventDTO eventDTO, PublicUserDTO loggedUser) {
        if (loggedUser == null) {
            throw new AccessDeniedException();
        }

        Optional<Event> existingEventOptional = eventRepository.findByIdAndDeletedFalse(id);

        if (existingEventOptional.isEmpty()) {
            throw new EventNotFoundException();
        }

        if (!Objects.equals(loggedUser.getId(), existingEventOptional.get().getOwnerId().getId())) {
            throw new AccessDeniedException();
        }

        Event existingEvent = existingEventOptional.get();
        modelMapper.map(eventDTO, existingEvent);

        existingEvent.setId(id);
        Event updatedEvent = eventRepository.save(existingEvent);
        return modelMapper.map(updatedEvent, EventResponseDTO.class);
    }

    @Override
    public void deleteEvent(Long id) {
        Optional<Event> event = eventRepository.findByIdAndDeletedFalse(id);
        if (event.isPresent()) {
            // Soft delete
            event.get().setDeleted(true);
            eventRepository.save(event.get());
        } else {
            throw new EventNotFoundException();
        }
    }

    @Override
    public List<EventResponseDTO> searchEvents(String searchTerm, Long skillId) {
        // If searchTerm is empty or null, set it to null to search only by skill
        searchTerm = (searchTerm != null && !searchTerm.isEmpty()) ? searchTerm : null;

        List<Event> events = eventRepository.searchByNameAndSkill(searchTerm, skillId);

        if (events.isEmpty()) {
            events = eventRepository.findByDeletedFalseOrderByIdDesc();
        }
        return events.stream().map(event -> modelMapper.map(event, EventResponseDTO.class)).toList();
    }

    @Override
    public EventResponseDTO addLike(Long eventId, PublicUserDTO loggedUser) {
        // Method to add a like to an event post
        if (loggedUser == null) {
            throw new AccessDeniedException();
        }

        Event event = eventRepository.findById(eventId).orElseThrow(EventNotFoundException::new);
        User user = userRepository.findByIdAndDeletedFalse(loggedUser.getId()).orElseThrow(UserNotFoundException::new);

        if (!event.getLiked_users().contains(user)) {
            event.getLiked_users().add(user);
        } else {
            event.getLiked_users().remove(user);
        }

        event = eventRepository.save(event);
        return modelMapper.map(event, EventResponseDTO.class);
    }

    @Override
    public List<EventResponseDTO> filterEventsByCriteria(boolean hasGoneTo, String filterType, PublicUserDTO publicUserDTO, int n) throws ChangeSetPersister.NotFoundException {
        User user = userRepository.findById(publicUserDTO.getId()).orElseThrow(UserNotFoundException::new);
        List<Event> resultEvents = new ArrayList<>();
        if (!hasGoneTo) {
            if (filterType.equalsIgnoreCase("All")) {
                resultEvents = eventRepository.findByDeletedFalseOrderByIdDesc();
            } else if (filterType.equalsIgnoreCase("Will happen")) {
                resultEvents = eventRepository.findByStartTimeAfterAndDeletedIsFalseOrderByIdDesc(LocalDateTime.now());
            } else if (filterType.equalsIgnoreCase("Favourited")) {
                resultEvents = eventRepository.findEventsLikedByUser(user);
            }
        } else {
            List<UserEventStatus> userEventStatusList = userEventStatusRepository.findByUserIdId(user.getId());

            if (filterType.equalsIgnoreCase("All")) {
                for (UserEventStatus userEvent : userEventStatusList) {
                    Event event = eventRepository.findById(userEvent.getEventId().getId()).orElseThrow(NoSuchElementException::new);
                    resultEvents.add(event);
                }
            } else if (filterType.equalsIgnoreCase("Favourited")) {
                List<Event> likedEvents = eventRepository.findEventsLikedByUser(user);
                for (UserEventStatus userEventStatus : userEventStatusList) {
                    for (Event likedEvent : likedEvents) {
                        if (Objects.equals(userEventStatus.getEventId().getId(), likedEvent.getId())) {
                            resultEvents.add(likedEvent);
                        }
                    }
                }
            }

            resultEvents = resultEvents.stream().sorted((a, b) -> b.getId().compareTo(a.getId())).toList();
        }

        return resultEvents.stream()
                .limit(n) // Limit the stream to first N elements
                .map(event -> modelMapper.map(event, EventResponseDTO.class))
                .collect(Collectors.toList());
    }
}
