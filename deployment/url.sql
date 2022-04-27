SET TIME ZONE 'UTC';

BEGIN;

CREATE TABLE shortened_urls (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_url TEXT NOT NULL,
    short_url TEXT NOT NULL,
    total_click INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expire TIMESTAMP NOT NULL
);

COMMIT;