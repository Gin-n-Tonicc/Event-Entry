package com.ginAndTonic.LudogorieHackEnter2024.services;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.SkillDTO;

import java.util.List;

public interface SkillService {
    List<SkillDTO> getAllSkills();

    SkillDTO getSkillById(Long id);

    SkillDTO createSkill(SkillDTO skillDTO);

    SkillDTO updateSkill(Long id, SkillDTO skillDTO);

    void deleteSkill(Long id);
}
