export enum RecordExpirationUnitEnum {
  days = 'days',
  hours = 'hours',
}

export interface IRecordExpirationSettings {
  value: number;
  unit: RecordExpirationUnitEnum;
}

export interface ICreateRecordDto {
  content: string;
  expireIn: IRecordExpirationSettings;
}
