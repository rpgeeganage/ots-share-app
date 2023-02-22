import { models } from '@ots-share/model';
import { Knex } from 'knex';

import { DEFAULT_MIME_TYPE } from '../../../common';
import { RECORD_TABLE_NAME } from '../common';

export async function addFileSupport(knex: Knex) {
  const hasTypeColumn = await knex.schema.hasColumn(RECORD_TABLE_NAME, 'type');
  if (!hasTypeColumn) {
    await knex.schema.table(RECORD_TABLE_NAME, function (t) {
      t.string('type', 50).defaultTo(models.RecordTypeEnum.file);
      t.string('mimeType', 50).defaultTo(DEFAULT_MIME_TYPE);

      return t;
    });
  }
}
