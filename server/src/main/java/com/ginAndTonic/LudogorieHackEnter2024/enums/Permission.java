package com.ginAndTonic.LudogorieHackEnter2024.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Enumeration representing permissions available in the application.
 * Each permission has a corresponding string representation.
 * This class is used to define and access different permissions required for authorization purposes.
 */
@Getter
@RequiredArgsConstructor
public enum Permission {
    USER_READ("user:read"),
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    ORGANISATION_READ("organisation:read"),
    ORGANISATION_UPDATE("organisation:update"),
    ORGANISATION_CREATE("organisation:create"),
    ORGANISATION_DELETE("organisation:delete");

    private final String permission;
}