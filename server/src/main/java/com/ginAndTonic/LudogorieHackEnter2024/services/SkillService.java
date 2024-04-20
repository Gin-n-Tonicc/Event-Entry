package com.ginAndTonic.LudogorieHackEnter2024.services;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.SkillDTO;

import java.util.List;

public interface SkillService {
    List<SkillDTO> getAllSkills();

    SkillDTO getSkillById(Long id);

    SkillDTO createSkill(SkillDTO skillDTO, PublicUserDTO publicUserDTO);

    SkillDTO updateSkill(Long id, SkillDTO skillDTO, PublicUserDTO publicUserDTO);

    void deleteSkill(Long id, PublicUserDTO publicUserDTO);
}
