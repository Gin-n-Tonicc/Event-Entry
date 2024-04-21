package com.ginAndTonic.LudogorieHackEnter2024.controllers;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.AccessDeniedException;
import com.ginAndTonic.LudogorieHackEnter2024.filters.JwtAuthenticationFilter;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.UserEventStatusDTO;
import com.ginAndTonic.LudogorieHackEnter2024.services.UserEventStatusService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/userEventStatuses")
public class UserEventStatusController {
    private final UserEventStatusService userEventStatusService;

    public UserEventStatusController(UserEventStatusService userEventStatusService) {
        this.userEventStatusService = userEventStatusService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<UserEventStatusDTO>> getAllUserEventStatus() {
        return ResponseEntity.ok(userEventStatusService.getAllUserEventStatuses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEventStatusDTO> getUserEventStatusById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(userEventStatusService.getUserEventStatusById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<UserEventStatusDTO> createUserEventStatus(@Valid @RequestBody UserEventStatusDTO userEventStatusDTO, HttpServletRequest httpServletRequest) {
        PublicUserDTO currentUser = (PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey);

        if (currentUser == null) {
            throw new AccessDeniedException();
        }

        UserEventStatusDTO cratedUserEventStatus = userEventStatusService.createUserEventStatus(userEventStatusDTO, currentUser);
        return new ResponseEntity<>(cratedUserEventStatus, HttpStatus.CREATED);
    }

    @GetMapping("/by-user")
    public List<UserEventStatusDTO> getUserEventStatusesByUserId(@RequestParam Long userId) {
        return userEventStatusService.getUserEventStatusesByUserId(userId);
    }

    @GetMapping("/by-event")
    public List<PublicUserDTO> getUsersByEventId(@RequestParam Long eventId) {
        return userEventStatusService.getUsersByEventId(eventId);
    }
}
