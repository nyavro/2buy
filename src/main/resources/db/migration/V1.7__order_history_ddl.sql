CREATE TABLE Order_History (
  order_id      	BIGINT      NOT NULL REFERENCES "Order" (id),
  changed_by		BIGINT      NOT NULL REFERENCES "User" (id),
  order_count		INT,
  status		    ORDER_STATUS,
  version          	BIGINT    NOT NULL DEFAULT 0,
  created_at        TIMESTAMP DEFAULT current_timestamp,
  comment		    VARCHAR(250)
);