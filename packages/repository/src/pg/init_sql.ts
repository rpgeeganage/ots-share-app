export const sql = `
CREATE TABLE IF NOT EXISTS "record" (
  "_id" SERIAL,
  "id" VARCHAR(100) NOT NULL, 
  "slug" VARCHAR(100) NOT NULL,
  "content" text NOT NULL,
  "expiary" DATE NOT NULL,
  "status" VARCHAR(50) NOT NULL,
  "created_at" DATE NOT NULL DEFAULT CURRENT_DATE 
  PRIMARY KEY ("_id")
);`;
