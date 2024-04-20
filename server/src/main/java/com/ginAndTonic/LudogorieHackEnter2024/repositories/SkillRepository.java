package com.ginAndTonic.LudogorieHackEnter2024.repositories;

import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByDeletedFalse();

    Optional<Skill> findByIdAndDeletedFalse(Long id);
}
