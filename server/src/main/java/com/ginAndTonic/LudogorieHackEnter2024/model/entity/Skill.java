package com.ginAndTonic.LudogorieHackEnter2024.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull(message = "The name of the event should not be null!")
    @Size(min = 3, message = "The name must be at least 3 symbols!")
    private String name;

    @Column(name = "is_deleted", nullable = false)
    private boolean deleted;
}
