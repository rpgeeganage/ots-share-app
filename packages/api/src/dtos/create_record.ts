import 'reflect-metadata';

import { dtos, models } from '@ots-share/model';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsString,
  ValidateNested,
  IsOptional,
  IsEnum,
  IsMimeType,
} from 'class-validator';

import { RecordExpirationSettings } from './record_expiration_settings';

export class CreateRecordDto implements dtos.ICreateRecordDto {
  @IsDefined()
  @IsString()
  declare content: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => RecordExpirationSettings)
  declare expireIn: dtos.IRecordExpirationSettings;

  @IsOptional()
  @IsEnum(models.RecordTypeEnum)
  declare type: models.RecordTypeEnum;

  @IsOptional()
  @IsMimeType()
  declare mimeType: string;
}
