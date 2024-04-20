package com.ginAndTonic.LudogorieHackEnter2024.controllers;

import com.ginAndTonic.LudogorieHackEnter2024.filters.JwtAuthenticationFilter;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.EventDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.request.EventRequestDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.response.EventResponseDTO;
import com.ginAndTonic.LudogorieHackEnter2024.services.EventService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.testng.collections.Lists;

import java.util.List;

/**
 * A controller class for handling event-related operations.
 * CRUD
 */
@RestController
@RequestMapping("/api/v1/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<EventResponseDTO>> getAllCategories() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<EventResponseDTO> createEvent(@Valid @RequestBody EventRequestDTO eventDTO, HttpServletRequest httpServletRequest) {
        EventResponseDTO cratedEvent = eventService.createEvent(eventDTO, (PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey));
        return new ResponseEntity<>(cratedEvent, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventResponseDTO> updateEvent(@PathVariable("id") Long id, @Valid @RequestBody EventDTO eventDTO, HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(eventService.updateEvent(id, eventDTO, (PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEventById(@PathVariable("id") Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok("Event with id: " + id + " has been deleted successfully!");
    }

    @GetMapping("/search")
    public List<EventResponseDTO> searchEvents(
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "skillId", required = false) Long skillId) {
        return eventService.searchEvents(name, skillId);
    }
    @GetMapping("/filter")
    public ResponseEntity<List<EventResponseDTO>> searchEventsByCriteria(
            @RequestParam(name = "hasGoneTo", required = false, defaultValue = "false") boolean hasGoneTo,
            @RequestParam(name = "numberEvents", required = false, defaultValue = "5") int n,
            @RequestParam(name = "filterType", required = false, defaultValue = "All") String filterType,
            HttpServletRequest httpServletRequest) {
        try {
            List<EventResponseDTO> events = eventService.filterEventsByCriteria(hasGoneTo, filterType, (PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey), n);
            return ResponseEntity.ok(Lists.newReversedArrayList(events));
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping("/like/{eventId}")
    public ResponseEntity<EventResponseDTO> likeEvent(@PathVariable Long eventId, HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(eventService.addLike(eventId, (PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey)));
    }
}
