package com.ginAndTonic.LudogorieHackEnter2024.util;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.ApiException;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.response.ExceptionResponse;

import java.time.LocalDateTime;

/**
 * ApiExceptionParser is a utility class responsible for parsing ApiException objects into ExceptionResponse objects.
 * It provides a static method to perform this parsing operation.
 */
public class ApiExceptionParser {
    public static ExceptionResponse parseException(ApiException exception) {
        return ExceptionResponse
                .builder()
                .dateTime(LocalDateTime.now())
                .message(exception.getMessage())
                .status(exception.getStatus())
                .statusCode(exception.getStatusCode())
                .build();
    }
}