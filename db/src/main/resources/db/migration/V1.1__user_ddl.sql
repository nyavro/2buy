CREATE TABLE "User" (
  id            BIGSERIAL PRIMARY KEY,
  login         VARCHAR(50) NOT NULL UNIQUE,
  name          VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(250) NOT NULL,
  salt          BYTEA NOT NULL
);