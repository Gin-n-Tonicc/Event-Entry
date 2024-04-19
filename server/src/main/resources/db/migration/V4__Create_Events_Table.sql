CREATE TABLE events (
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    start_time TIMESTAMP,
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES _users(id)
);
