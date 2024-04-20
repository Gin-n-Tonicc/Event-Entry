package com.ginAndTonic.LudogorieHackEnter2024.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

    @ManyToOne
    @JoinColumn(name = "file_id")
    private File picture;

    @ManyToMany
    @JoinTable(
            name = "event_skills",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> lookingForSkills = new ArrayList<>();

    @ManyToMany
    private Set<User> liked_users;

    @Column(name = "is_deleted", nullable = false)
    private boolean deleted;
}
