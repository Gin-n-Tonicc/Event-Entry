package com.ginAndTonic.LudogorieHackEnter2024.repositories;


import com.ginAndTonic.LudogorieHackEnter2024.model.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileRepository extends JpaRepository<File, Long> {
    Optional<File> findByIdAndDeletedFalse(Long id);
}
