import 'reflect-metadata';

import { dtos } from '@ots-share/model';
import { Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';

import { RecordExpirationSettings } from './record_expiration_settings';

export class CreateRecordDto implements dtos.ICreateRecordDto {
  @IsDefined()
  @IsString()
  declare content: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => RecordExpirationSettings)
  declare expireIn: dtos.IRecordExpirationSettings;
}
