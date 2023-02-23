export enum RecordStatusEnum {
  avaiable = 'avaiable',
  unavaiable = 'unavaiable',
}

export interface IRecord {
  id: string;
  slug: string;
  content: string;
  expiary: Date;
  status: RecordStatusEnum;
}
