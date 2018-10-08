CREATE TABLE "Group" (
  id            BIGSERIAL PRIMARY KEY,
  owner_user_id BIGINT      NOT NULL REFERENCES "User" (id),
  name          VARCHAR(250) NOT NULL UNIQUE,
  last_activity TIMESTAMP NOT NULL DEFAULT current_timestamp,
  CONSTRAINT uq_groupname_owner UNIQUE (name, owner_user_id)
);