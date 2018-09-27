CREATE TABLE "Order" (
  id            	    BIGSERIAL PRIMARY KEY,
  product_id    	    BIGINT      NOT NULL REFERENCES "Product" (id),
  created_by_user_id	BIGINT      NOT NULL REFERENCES "User" (id),
  group_id              BIGINT      NOT NULL REFERENCES "Group" (id),
  count			        INT NOT NULL DEFAULT 1,
  created_at            TIMESTAMP NOT NULL DEFAULT current_timestamp,
  comment		        VARCHAR(250),
  version          	    INT    NOT NULL DEFAULT 0
);
