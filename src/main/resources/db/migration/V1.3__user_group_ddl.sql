CREATE TABLE User_Group (
  user_id  BIGINT      NOT NULL REFERENCES "User" (id),
  group_id BIGINT      NOT NULL REFERENCES "Group" (id),

  CONSTRAINT fk_usr_grp_unique UNIQUE (user_id, group_id)
);