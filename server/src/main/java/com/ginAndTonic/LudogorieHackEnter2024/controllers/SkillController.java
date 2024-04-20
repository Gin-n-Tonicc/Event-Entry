package com.ginAndTonic.LudogorieHackEnter2024.controllers;

import com.ginAndTonic.LudogorieHackEnter2024.model.dto.common.SkillDTO;
import com.ginAndTonic.LudogorieHackEnter2024.services.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * A controller class for handling skill-related operations.
 * CRUD
 */
@RestController
@RequestMapping("/api/v1/skills")
public class SkillController {
    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<SkillDTO>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillDTO> getSkillById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(skillService.getSkillById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<SkillDTO> createSkill(@Valid @RequestBody SkillDTO skillDTO) {
        SkillDTO cratedSkill = skillService.createSkill(skillDTO);
        return new ResponseEntity<>(cratedSkill, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillDTO> updateSkill(@PathVariable("id") Long id, @Valid @RequestBody SkillDTO skillDTO) {
        return ResponseEntity.ok(skillService.updateSkill(id, skillDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkillById(@PathVariable("id") Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok("Skill with id: " + id + " has been deleted successfully!");
    }
}
