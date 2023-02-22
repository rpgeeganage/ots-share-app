import { models } from '@ots-share/model';
import { Schema, model } from 'mongoose';

import { DEFAULT_MIME_TYPE } from '../../../common';

const recordSchema = new Schema<models.IRecord>(
  {
    id: { type: String, required: true, index: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    expiary: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: Object.values(models.RecordStatusEnum),
      default: models.RecordStatusEnum.avaiable,
    },
    type: {
      type: String,
      enum: Object.values(models.RecordTypeEnum),
      default: models.RecordTypeEnum.text,
    },
    mimeType: {
      type: String,
      default: DEFAULT_MIME_TYPE,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

export const RecordModel = model<models.IRecord>('record', recordSchema);
