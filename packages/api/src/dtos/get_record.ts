import 'reflect-metadata';

import { dtos } from '@ots-share/common';
import { IsDefined, IsString } from 'class-validator';

export class GetRecordDto implements dtos.IGetRecordDto {
  @IsDefined()
  @IsString()
  declare id: string;
}
