package com.ginAndTonic.LudogorieHackEnter2024.repositories;

import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByDeletedFalse();
}
