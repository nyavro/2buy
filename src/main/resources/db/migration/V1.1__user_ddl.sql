CREATE TABLE "User" (
  id            BIGSERIAL PRIMARY KEY,
  name          VARCHAR(250) NOT NULL,
  password_hash VARCHAR(250) NOT NULL,
  salt          BYTEA NOT NULL
);