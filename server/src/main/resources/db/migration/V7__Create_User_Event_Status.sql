CREATE TABLE user_event_status (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    event_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES _users(id),
    FOREIGN KEY (event_id) REFERENCES events(id),
    UNIQUE(user_id, event_id)
);
