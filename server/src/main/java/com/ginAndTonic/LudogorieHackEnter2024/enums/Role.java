package com.ginAndTonic.LudogorieHackEnter2024.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import static com.ginAndTonic.LudogorieHackEnter2024.enums.Permission.*;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


/**
 * Enumeration representing different roles in the application.
 * Each role has a set of associated permissions.
 * Roles in out application: ADMIN, TEACHER AND STUDENT
 */
@Getter
@RequiredArgsConstructor
public enum Role {

    USER(Collections.emptySet()),
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_UPDATE,
                    ADMIN_DELETE,
                    ADMIN_CREATE,
                    ORGANISATION_READ,
                    ORGANISATION_UPDATE,
                    ORGANISATION_DELETE,
                    ORGANISATION_CREATE
            )
    ),
    ORGANISATION(
            Set.of(
                    ORGANISATION_READ,
                    ORGANISATION_UPDATE,
                    ORGANISATION_DELETE,
                    ORGANISATION_CREATE
            )
    );

    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());

        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}