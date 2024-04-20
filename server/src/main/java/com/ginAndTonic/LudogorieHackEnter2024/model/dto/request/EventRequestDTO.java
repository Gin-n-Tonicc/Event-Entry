package com.ginAndTonic.LudogorieHackEnter2024.model.dto.request;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.EventDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventRequestDTO extends EventDTO {
    private List<Long> skills = new ArrayList<>();
}
