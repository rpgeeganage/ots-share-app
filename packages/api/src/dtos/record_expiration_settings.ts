import { dtos } from '@ots-share/model';
import { IsDefined, IsEnum, IsPositive, Max, Min } from 'class-validator';

export class RecordExpirationSettings implements dtos.IRecordExpirationSettings {
  @Max(30)
  @Min(1)
  @IsPositive()
  @IsDefined()
  declare value: number;

  @IsDefined()
  @IsEnum(dtos.RecordExpirationUnitEnum)
  declare unit: dtos.RecordExpirationUnitEnum;
}
