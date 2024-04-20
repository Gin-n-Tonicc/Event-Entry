package com.ginAndTonic.LudogorieHackEnter2024.services.impl;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.event.EventNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.user.UserNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.userEventStatus.UserEventStatusCreateException;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.EventDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.UserEventStatusDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Event;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.UserEventStatus;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.EventRepository;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserEventStatusRepository;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserRepository;
import com.ginAndTonic.LudogorieHackEnter2024.services.UserEventStatusService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserEventStatusServiceImpl implements UserEventStatusService {

    private final UserEventStatusRepository userEventStatusRepository;
    private final ModelMapper modelMapper;
    private final EventRepository eventRepository;

    private final UserRepository userRepository;

    public UserEventStatusServiceImpl(UserEventStatusRepository userEventStatusRepository, ModelMapper modelMapper, EventRepository eventRepository, UserRepository userRepository) {
        this.userEventStatusRepository = userEventStatusRepository;
        this.modelMapper = modelMapper;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<UserEventStatusDTO> getAllUserEventStatuses(){
        List<UserEventStatus> userEventStatus = userEventStatusRepository.findAll();
        return userEventStatus.stream().map(event -> modelMapper.map(event, UserEventStatusDTO.class)).toList();
    }

    @Override
    public UserEventStatusDTO getUserEventStatusById(Long id) {
        Optional<UserEventStatus> userEventStatus = userEventStatusRepository.findById(id);
        if (userEventStatus.isPresent()) {
            return modelMapper.map(userEventStatus.get(), UserEventStatusDTO.class);
        }
        throw new EventNotFoundException();
    }

    @Override
    public UserEventStatusDTO createUserEventStatus(UserEventStatusDTO userEventStatus, PublicUserDTO loggedUser) {
        Event event = eventRepository.findById(userEventStatus.getEventId())
                .orElseThrow(EventNotFoundException::new);

        LocalDateTime now = LocalDateTime.now();

        if (event.getStartTime().isBefore(now) && event.getEndTime().isAfter(now)) {
            UserEventStatus newUserEventStatus = new UserEventStatus();
            User user = userRepository.findById(userEventStatus.getUserId()).orElseThrow(UserNotFoundException::new);

            newUserEventStatus.setUserId(user);
            newUserEventStatus.setEventId(event);

            newUserEventStatus = userEventStatusRepository.save(newUserEventStatus);

            return modelMapper.map(newUserEventStatus, UserEventStatusDTO.class);
        } else {
            throw new UserEventStatusCreateException();
        }
    }
}