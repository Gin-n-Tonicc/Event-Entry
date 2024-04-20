package com.ginAndTonic.LudogorieHackEnter2024.model.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEventStatusDTO {
    private Long id;
    private Long userId;
    private Long eventId;
}
