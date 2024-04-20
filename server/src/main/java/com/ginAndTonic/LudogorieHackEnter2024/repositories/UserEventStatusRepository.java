package com.ginAndTonic.LudogorieHackEnter2024.repositories;

import com.ginAndTonic.LudogorieHackEnter2024.model.entity.UserEventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserEventStatusRepository extends JpaRepository<UserEventStatus, Long> {
    List<UserEventStatus> findByUserIdId(Long userId);
    List<UserEventStatus> findByEventIdId(Long eventId);
}
