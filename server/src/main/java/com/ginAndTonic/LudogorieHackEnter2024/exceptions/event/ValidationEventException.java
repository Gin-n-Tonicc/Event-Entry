package com.ginAndTonic.LudogorieHackEnter2024.exceptions.event;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.ApiException;
import jakarta.validation.ConstraintViolation;
import org.springframework.http.HttpStatus;

import java.util.Set;
import java.util.stream.Collectors;

public class ValidationEventException extends ApiException {
    public ValidationEventException(Set<ConstraintViolation<?>> validationErrors) {
        super(
                validationErrors
                        .stream()
                        .map(ConstraintViolation::getMessage)
                        .collect(Collectors.joining("\n")),
                HttpStatus.BAD_REQUEST
        );
    }
}