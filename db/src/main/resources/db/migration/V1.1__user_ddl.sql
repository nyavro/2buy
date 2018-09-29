CREATE TABLE "User" (
  id            BIGSERIAL PRIMARY KEY,
  name          VARCHAR(250) NOT NULL UNIQUE,
  password_hash VARCHAR(250) NOT NULL,
  salt          BYTEA NOT NULL
);