package com.ginAndTonic.LudogorieHackEnter2024.repositories;


import com.ginAndTonic.LudogorieHackEnter2024.model.entity.UserFriend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFriendRepository extends JpaRepository<UserFriend, Long> {

    List<UserFriend> findByUserId(Long userId);

    Optional<UserFriend> findByUserIdAndFriendId(Long userId, Long friendId);

    List<UserFriend> findByUserIdAndIsConfirmedIsTrue(Long userId);
    List<UserFriend> findByUserIdAndIsConfirmedIsFalse(Long userId);

    List<UserFriend> findAllByUser_IdAndIsConfirmedTrueOrFriend_IdAndIsConfirmedTrue(Long userId, Long friendId);
}
