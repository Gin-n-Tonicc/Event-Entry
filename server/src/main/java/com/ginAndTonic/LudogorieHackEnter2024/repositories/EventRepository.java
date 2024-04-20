package com.ginAndTonic.LudogorieHackEnter2024.repositories;

import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Event;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByDeletedFalse();

    Optional<Event> findByIdAndDeletedFalse(Long id);

    @Query("SELECT e FROM Event e LEFT JOIN e.lookingForSkills s WHERE " +
            "(LOWER(e.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
            "(:skillId IS NULL OR :skillId IN (SELECT skill.id FROM Skill skill JOIN e.lookingForSkills))")
    List<Event> searchByNameAndSkill(@Param("searchTerm") String searchTerm, @Param("skillId") Long skillId);

    @Query("SELECT e FROM Event e JOIN e.liked_users u WHERE u = :user")
    List<Event> findEventsLikedByUser(User user);
    List<Event> findByStartTimeAfterAndDeletedIsFalse(LocalDateTime currentTime);
}
