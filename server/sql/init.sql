CREATE DATABASE qr;

CREATE TABLE IF NOT EXISTS users (
    id          INT                     AUTO_INCREMENT      PRIMARY KEY,
    user_id     VARCHAR(50)             NOT NULL            UNIQUE,
    password    VARCHAR(255)            NOT NULL,
    role        ENUM('user','admin')    NOT NULL            DEFAULT 'user',
    created_at  TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP               DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS qr_codes (
    id          INT         AUTO_INCREMENT PRIMARY KEY,
    code        VARCHAR(20) NOT NULL        UNIQUE,
    content     TEXT        NULL,
    created_at  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS qr_codes_owners (
    id          INT         AUTO_INCREMENT PRIMARY KEY,
    qr_code_id  INT         NOT NULL,
    user_id     INT         NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_qr_code FOREIGN KEY (qr_code_id) REFERENCES qr_codes(id) ON DELETE CASCADE,
    CONSTRAINT fk_qr_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    UNIQUE KEY unique_qr_owner (qr_code_id)
);