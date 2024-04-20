package com.ginAndTonic.LudogorieHackEnter2024.services.impl;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.BadRequestException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.user.UserNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.userFriend.CannotConfirmFriendshipException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.userFriend.FriendshipAlreadyExistsException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.userFriend.UserFriendNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Skill;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.UserFriend;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserFriendRepository;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.UserRepository;
import com.ginAndTonic.LudogorieHackEnter2024.services.UserFriendService;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserFriendServiceImpl implements UserFriendService {

    private final UserFriendRepository userFriendRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserFriendServiceImpl(UserFriendRepository userFriendRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.userFriendRepository = userFriendRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void addFriend(PublicUserDTO loggedUser, Long friendId) {
        User user = userRepository.findById(loggedUser.getId()).orElseThrow(UserNotFoundException::new);
        User friend = userRepository.findById(friendId).orElseThrow(UserNotFoundException::new);

        if (Objects.equals(user.getId(), friend.getId())) {
            throw new BadRequestException("You can't send a friendship to yourself!");
        }

        try {
            UserFriend friendship = new UserFriend();
            friendship.setUser(user);
            friendship.setFriend(friend);
            userFriendRepository.save(friendship);
        } catch (DataIntegrityViolationException e) {
            throw new FriendshipAlreadyExistsException();
        }
    }

    @Override
    public void confirmFriendRequest(Long loggedUserId, Long friendId) {
        User user = userRepository.findById(loggedUserId).orElseThrow(UserNotFoundException::new);
        User friend = userRepository.findById(friendId).orElseThrow(UserNotFoundException::new);

        UserFriend userFriend = userFriendRepository.findByUserIdAndFriendId(user.getId(), friend.getId())
                .orElseThrow(UserFriendNotFoundException::new);

        if (userFriend.getFriend().getId() == friend.getId()) {
            userFriend.setConfirmed(true);
            userFriendRepository.save(userFriend);
        } else {
            throw new CannotConfirmFriendshipException();
        }
    }

    @Override
    public void removeFriend(PublicUserDTO loggedUser, Long friend) {
        userRepository.findById(friend).orElseThrow(UserNotFoundException::new);

        userFriendRepository.findByUserIdAndFriendId(loggedUser.getId(), friend)
                .ifPresent(userFriendRepository::delete);
    }

    @Override
    public List<UserFriend> getFriendRequestsById(Long id) {
       User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
       return userFriendRepository.findByUserIdAndIsConfirmedIsFalse(user.getId());
    }
    @Override
    public List<UserFriend> getFriendsForUser(Long id) {
        userRepository.findById(id).orElseThrow(UserNotFoundException::new);

        return userFriendRepository.findByUserIdAndIsConfirmedIsTrue(id);
    }

    @Override
    public List<User> suggestFriendsBySkills(PublicUserDTO loggedInUser) {
        User user = userRepository.findById(loggedInUser.getId()).orElseThrow(UserNotFoundException::new);

        List<Skill> lookingForSkills = user.getSkills();

        Set<User> potentialFriends = new HashSet<>();
        for (Skill skill : lookingForSkills) {
            List<User> usersWithSimilarSkills = userRepository.findBySkills(skill);
            potentialFriends.addAll(usersWithSimilarSkills);
        }

        potentialFriends.remove(user);

        List<User> existingFriends = user.getFriendships().stream().map(UserFriend::getFriend).toList();
        existingFriends.forEach(potentialFriends::remove);

        return new ArrayList<>(potentialFriends);
    }
}
