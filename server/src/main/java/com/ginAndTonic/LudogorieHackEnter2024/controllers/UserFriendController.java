package com.ginAndTonic.LudogorieHackEnter2024.controllers;

import com.ginAndTonic.LudogorieHackEnter2024.filters.JwtAuthenticationFilter;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.UserFriend;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserRepository;
import com.ginAndTonic.LudogorieHackEnter2024.services.UserFriendService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/userFriend")
public class UserFriendController {

    private final UserFriendService userFriendService;
    private final UserRepository userRepository;

    public UserFriendController(UserFriendService userFriendService, UserRepository userRepository) {
        this.userFriendService = userFriendService;
        this.userRepository = userRepository;
    }

    @PostMapping("/add/{friendId}")
    public ResponseEntity<Void> addFriend(@PathVariable Long friendId, HttpServletRequest httpServletRequest) {
        userFriendService.addFriend((PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey), friendId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/{friendId}")
    public ResponseEntity<Void> removeFriend(@PathVariable Long friendId, HttpServletRequest httpServletRequest) {
        userFriendService.removeFriend((PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey), friendId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserFriend>> getFriends(HttpServletRequest httpServletRequest) {
        List<UserFriend> friends = userFriendService.getFriendsForUser((PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey));
        return ResponseEntity.ok(friends);
    }

    @PutMapping("/confirm/{friendId}")
    public ResponseEntity<Void> confirmFriendRequest(@PathVariable Long friendId, HttpServletRequest httpServletRequest) {
        PublicUserDTO loggedUser = (PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey);
        userFriendService.confirmFriendRequest(loggedUser.getId(), friendId);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/suggest")
    public ResponseEntity<List<User>> suggestFriendsBySkills(HttpServletRequest httpServletRequest) {
        List<User> friends = userFriendService.suggestFriendsBySkills((PublicUserDTO) httpServletRequest.getAttribute(JwtAuthenticationFilter.userKey));
        return ResponseEntity.ok(friends);
    }
}
