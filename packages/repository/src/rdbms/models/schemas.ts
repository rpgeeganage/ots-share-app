import { Knex } from 'knex';

export async function createSchemas(knex: Knex) {
  await createRecordSchema(knex);
}

async function createRecordSchema(knex: Knex) {
  const tableName = 'record';
  const hasTable = await knex.schema.hasTable(tableName);

  if (!hasTable) {
    await knex.schema.createTable(tableName, function (t) {
      t.increments('_id').primary();
      t.string('id', 100);
      t.string('slug', 100);
      t.text('content');
      t.dateTime('expiary');
      t.string('status', 50);
      t.dateTime('created_at').defaultTo(knex.fn.now());

      return t;
    });
  }
}
