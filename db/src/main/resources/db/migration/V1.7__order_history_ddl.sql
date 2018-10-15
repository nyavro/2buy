CREATE TABLE "Order_History" (
  order_id      	BIGINT      NOT NULL REFERENCES "Order" (id),
  changed_by		BIGINT      NOT NULL REFERENCES "User" (id),
  order_count		INT,
  status		    VARCHAR(20) NOT NULL,
  changed_at    TIMESTAMP NOT NULL DEFAULT current_timestamp,
  comment		    VARCHAR(250)
);