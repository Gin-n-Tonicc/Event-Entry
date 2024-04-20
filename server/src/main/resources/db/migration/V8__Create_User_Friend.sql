CREATE TABLE user_friend (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    friend_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES _users(id),
    FOREIGN KEY (friend_id) REFERENCES _users(id),
    UNIQUE (user_id, friend_id)
);
