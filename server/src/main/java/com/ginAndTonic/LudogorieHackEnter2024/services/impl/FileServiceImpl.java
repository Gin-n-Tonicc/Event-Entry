package com.ginAndTonic.LudogorieHackEnter2024.services.impl;

import com.ginAndTonic.LudogorieHackEnter2024.enums.FileType;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.InternalServerErrorException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.files.DirectoryCreationException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.files.FileNotFoundException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.files.UnsupportedFileTypeException;
import com.ginAndTonic.LudogorieHackEnter2024.model.entity.File;
import com.ginAndTonic.LudogorieHackEnter2024.repositories.FileRepository;
import com.ginAndTonic.LudogorieHackEnter2024.services.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

import static org.codehaus.plexus.util.FileUtils.getExtension;

@Service
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;
    private final MessageSource messageSource;
    @Value("${upload.directory}")
    public String uploadDirectory;

    public FileServiceImpl(FileRepository fileRepository, MessageSource messageSource, @Value("${upload.directory}") String uploadDirectory) {
        this.fileRepository = fileRepository;
        this.messageSource = messageSource;
        this.uploadDirectory = uploadDirectory;
    }

    /**
     * Generates a unique filename based on the original filename.
     *
     * @param originalFilename The original filename.
     * @return The unique filename.
     */
    @Override
    public String generateUniqueFilename(String originalFilename) {
        return UUID.randomUUID() + "_" + originalFilename;
    }

    /**
     * Creates a file path for storing the file.
     *
     * @param uniqueFilename The unique filename.
     * @return The file path.
     */
    @Override
    public Path createFilePath(String uniqueFilename) {
        Path directoryPath = Paths.get(uploadDirectory);
        try {
            Files.createDirectories(directoryPath);
            return directoryPath.resolve(uniqueFilename);
        } catch (IOException e) {
            throw new DirectoryCreationException();
        }
    }

    /**
     * Uploads a file to the server.
     *
     * @param file The file to upload.
     * @return The uploaded file entity.
     * @throws UnsupportedFileTypeException If the file type is not supported.
     * @throws IllegalArgumentException     If an invalid argument is encountered.
     */
    @Override
    public File uploadFile(MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename();
            assert originalFilename != null;
            String extension = getExtension(originalFilename);

            if (!FileType.isSupportedExtension(extension)) {
                throw new UnsupportedFileTypeException(messageSource);
            }

            String uniqueFilename = saveFileAndGetUniqueFilename(file);
            File fileEntity = new File();
            fileEntity.setName(originalFilename);
            fileEntity.setUrl(uploadDirectory + uniqueFilename);
            fileEntity.setDeleted(false);
            fileEntity.setType(file.getContentType());

            return fileRepository.save(fileEntity);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid argument.", e);
        }
    }

    /**
     * Retrieves the byte array of a file.
     *
     * @param imageName The name of the image file.
     * @return The byte array of the file.
     * @throws FileNotFoundException        If the file is not found.
     * @throws InternalServerErrorException If an internal server error occurs.
     */
    @Override
    public byte[] getFileBytes(String imageName) {
        try {
            return Files.readAllBytes(Paths.get(uploadDirectory, imageName));
        } catch (NoSuchFileException e) {
            throw new FileNotFoundException();
        } catch (IOException e) {
            throw new InternalServerErrorException();
        }
    }

    /**
     * Saves the file and returns the unique filename.
     *
     * @param file The file to save.
     * @return The unique filename of the saved file.
     * @throws InternalServerErrorException If an internal server error occurs.
     */
    @Override
    public String saveFileAndGetUniqueFilename(MultipartFile file) {
        try {
            String uniqueFilename = generateUniqueFilename(file.getOriginalFilename());
            Files.copy(file.getInputStream(), createFilePath(uniqueFilename), StandardCopyOption.REPLACE_EXISTING);
            return uniqueFilename;
        } catch (IOException e) {
            throw new InternalServerErrorException();
        }
    }

    /**
     * Retrieves the media type of a file based on its filename.
     *
     * @param filename The filename.
     * @return The media type of the file.
     */
    @Override
    public MediaType getMediaTypeForFile(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        return FileType.getMediaTypeForExtension(extension);
    }
}
