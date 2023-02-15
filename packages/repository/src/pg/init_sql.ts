export const sql = `
CREATE TABLE IF NOT EXISTS "record" (
  "_id" SERIAL PRIMARY KEY,
  "id" VARCHAR(100) NOT NULL, 
  "slug" VARCHAR(100) NOT NULL,
  "content" text NOT NULL,
  "expiary" timestamp NOT NULL,
  "status" VARCHAR(50) NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;
