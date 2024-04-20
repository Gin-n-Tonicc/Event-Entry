package com.ginAndTonic.LudogorieHackEnter2024.repositories;

import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Message;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessagesRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE (m.senderId = :sender AND m.receiverId = :receiver) OR (m.senderId = :receiver AND m.receiverId = :sender) ORDER BY m.sentAt")
    List<Message> findMessagesBetweenUsers(@Param("sender") User sender, @Param("receiver") User receiver);
}
