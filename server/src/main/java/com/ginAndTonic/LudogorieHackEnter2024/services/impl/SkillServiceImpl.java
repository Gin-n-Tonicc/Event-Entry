package com.ginAndTonic.LudogorieHackEnter2024.services.impl;


import com.ginAndTonic.LudogorieHackEnter2024.enums.Role;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.AccessDeniedException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.skill.SkillCreateException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.skill.SkillNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.auth.PublicUserDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.SkillDTO;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.Skill;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.SkillRepository;
import com.ginAndTonic.LudogorieHackEnter2024.services.SkillService;
import org.modelmapper.ModelMapper;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillServiceImpl implements SkillService {
    private final SkillRepository skillRepository;
    private final ModelMapper modelMapper;
    private final MessageSource messageSource;

    public SkillServiceImpl(SkillRepository skillRepository, ModelMapper modelMapper, MessageSource messageSource) {
        this.skillRepository = skillRepository;
        this.modelMapper = modelMapper;
        this.messageSource = messageSource;
    }

    @Override
    public List<SkillDTO> getAllSkills() {
        List<Skill> skills = skillRepository.findByDeletedFalse();
        return skills.stream().map(skill -> modelMapper.map(skill, SkillDTO.class)).toList();
    }

    @Override
    public SkillDTO getSkillById(Long id) {
        Optional<Skill> skill = skillRepository.findByIdAndDeletedFalse(id);
        if (skill.isPresent()) {
            return modelMapper.map(skill.get(), SkillDTO.class);
        }
        throw new SkillNotFoundException();
    }

    @Override
    public SkillDTO createSkill(SkillDTO skillDTO, PublicUserDTO publicUserDTO) {
        if (publicUserDTO.getRole() != Role.ADMIN) {
            throw new AccessDeniedException();
        }

        try {
            skillDTO.setId(null);
            Skill skillEntity = skillRepository.save(modelMapper.map(skillDTO, Skill.class));
            return modelMapper.map(skillEntity, SkillDTO.class);
        } catch (DataIntegrityViolationException exception) {
            // If a skill with the same name already exists
            throw new SkillCreateException(true);
        }
    }

    @Override
    public SkillDTO updateSkill(Long id, SkillDTO skillDTO, PublicUserDTO publicUserDTO) {
        Optional<Skill> existingSkillOptional = skillRepository.findByIdAndDeletedFalse(id);

        if (publicUserDTO.getRole() != Role.ADMIN) {
            throw new AccessDeniedException();
        }

        if (existingSkillOptional.isEmpty()) {
            throw new SkillNotFoundException();
        }

        Skill existingSkill = existingSkillOptional.get();
        modelMapper.map(skillDTO, existingSkill);

        existingSkill.setId(id);
        Skill updatedSkill = skillRepository.save(existingSkill);
        return modelMapper.map(updatedSkill, SkillDTO.class);
    }

    @Override
    public void deleteSkill(Long id, PublicUserDTO publicUserDTO) {
        if (publicUserDTO.getRole() != Role.ADMIN) {
            throw new AccessDeniedException();
        }

        Optional<Skill> skill = skillRepository.findByIdAndDeletedFalse(id);
        if (skill.isPresent()) {
            // Soft delete
            skill.get().setDeleted(true);
            skillRepository.save(skill.get());
        } else {
            throw new SkillNotFoundException();
        }
    }
}
