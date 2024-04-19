CREATE TABLE _users (
    id BIGINT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    education VARCHAR(120) NOT NULL,
    current_work_place VARCHAR(255),
    work_experience VARCHAR(120) NOT NULL,
    what_can_help_with VARCHAR(120) NOT NULL,
    role VARCHAR(50) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    is_additional_info_required TINYINT(1) NOT NULL DEFAULT FALSE,
    is_deleted TINYINT(1) NOT NULL DEFAULT FALSE,
    enabled TINYINT(1) NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
