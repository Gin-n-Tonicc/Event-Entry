package com.ginAndTonic.LudogorieHackEnter2024.controllers;

import com.ginAndTonic.LudogorieHackEnter2024.model.entity.File;
import com.ginAndTonic.LudogorieHackEnter2024.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

// Controller class for handling file-related operations.
@RestController
@RequestMapping("/api/v1/files")
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload") // Endpoint for uploading a file.
    public ResponseEntity<File> uploadFile(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(fileService.uploadFile(file));
    }

    @GetMapping("/{filename}") // Endpoint for retrieving a file by its filename.
    public ResponseEntity<byte[]> getFile(@PathVariable String filename) throws IOException {
        byte[] fileBytes = fileService.getFileBytes(filename);
        MediaType mediaType = fileService.getMediaTypeForFile(filename);
        return ResponseEntity.ok().contentType(mediaType).body(fileBytes);
    }
}