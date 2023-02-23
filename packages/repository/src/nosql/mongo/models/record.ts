import { models } from '@ots-share/model';
import { Schema, model } from 'mongoose';

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
  },
  { timestamps: { createdAt: 'created_at' } }
);

export const RecordModel = model<models.IRecord>('record', recordSchema);
