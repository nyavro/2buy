CREATE TABLE "Product" (
  id            BIGSERIAL PRIMARY KEY,
  group_id      BIGINT      NOT NULL REFERENCES "Group" (id),
  name 		    VARCHAR(250) NOT NULL,

  CONSTRAINT uq_name_group UNIQUE (group_id, name)
);
