CREATE TABLE "Order" (
  id            	    BIGSERIAL PRIMARY KEY,
  product_id    	    BIGINT      NOT NULL REFERENCES "Product" (id),
  created_by_user_id	BIGINT      NOT NULL REFERENCES "User" (id),
  group_id            BIGINT      NOT NULL REFERENCES "Group" (id),
  count			          INT NOT NULL DEFAULT 1,
  created_at          TIMESTAMP NOT NULL DEFAULT current_timestamp,
  modified_by_user_id BIGINT      NOT NULL REFERENCES "User" (id),
  modified_at         TIMESTAMP NOT NULL DEFAULT current_timestamp,
  status		          VARCHAR(20) NOT NULL,
  comment		          VARCHAR(250),
  version          	  INT    NOT NULL DEFAULT 0
);
