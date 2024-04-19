package com.ginAndTonic.LudogorieHackEnter2024.exceptions.handlers;

import com.ginAndTonic.LudogorieHackEnter2024.exceptions.AccessDeniedException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.ApiException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.InternalServerErrorException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.ValidationException;
import com.ginAndTonic.LudogorieHackEnter2024.exceptions.user.UserLoginException;
import com.ginAndTonic.LudogorieHackEnter2024.model.dto.response.ExceptionResponse;
import com.ginAndTonic.LudogorieHackEnter2024.util.ApiExceptionParser;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.transaction.TransactionException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Global exception handler for handling various types of exceptions and converting them into standardized API responses.
 */
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ExceptionResponse> handleRuntimeExceptions(RuntimeException exception) {
        // Log data
        exception.printStackTrace();
        return handleApiExceptions(new InternalServerErrorException());
    }

    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<ExceptionResponse> handleInternalAuthServiceExceptions(InternalAuthenticationServiceException exception) {
        Throwable cause = exception.getCause();

        if (cause instanceof ApiException) {
            return handleApiExceptions((ApiException) cause);
        }

        return handleRuntimeExceptions(exception);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleBadCredentialsExceptions() {
        return handleApiExceptions(new UserLoginException(getMessageSource()));
    }

    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    public ResponseEntity<ExceptionResponse> handleAccessDeniedExceptions() {
        return handleApiExceptions(new AccessDeniedException());
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ExceptionResponse> handleApiExceptions(ApiException exception) {
        ExceptionResponse apiException = ApiExceptionParser.parseException(exception);

        return ResponseEntity
                .status(apiException.getStatus())
                .body(apiException);
    }

    @ExceptionHandler(TransactionException.class)
    public ResponseEntity<ExceptionResponse> handleTransactionExceptions(TransactionException exception) {
        if (exception.getRootCause() instanceof ConstraintViolationException) {
            return handleConstraintValidationExceptions((ConstraintViolationException) exception.getRootCause());
        }

        return handleRuntimeExceptions(exception);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ExceptionResponse> handleConstraintValidationExceptions(ConstraintViolationException exception) {
        return handleApiExceptions(new ValidationException(exception.getConstraintViolations()));
    }
}
