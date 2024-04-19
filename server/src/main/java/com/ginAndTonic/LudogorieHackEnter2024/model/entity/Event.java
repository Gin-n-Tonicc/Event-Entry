package com.ginAndTonic.LudogorieHackEnter2024.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull(message = "The name of the event should not be null!")
    @Size(min = 10, message = "The name must be at least 10 symbols!")
    private String name;

    @NotNull(message = "The description of the course should not be null!")
    @Size(min = 150, message = "The description must be at least 150 symbols!")
    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    @NotNull
    private String address;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User ownerId;

    @Column(name = "is_deleted", nullable = false)
    private boolean deleted;
}