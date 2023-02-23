import { models, dtos } from '@ots-share/model';
import { IRecord, Strategy } from '@ots-share/repository';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import moment from 'moment';
import shortUuid from 'short-uuid';

import { Configs } from '../configs';
import { CreateRecordDto } from '../dtos/create_record';
import { GetRecordDto } from '../dtos/get_record';
import { InvalidRequest } from '../errors/invalid_request';
import { NotFoundError } from '../errors/not_found';

export class RecordService {
  constructor(private readonly repository: IRecord.IRecordRepository) {}

  create(dto: CreateRecordDto): Promise<models.IRecord> {
    const dtoInstance = <dtos.ICreateRecordDto>plainToInstance(CreateRecordDto, dto);

    const errors = validateSync(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });

    if (errors.length) {
      throw new InvalidRequest(errors.map((error) => error.toString()).join());
    }

    const idSlug = shortUuid.generate();

    const record: models.IRecord = {
      id: idSlug,
      slug: idSlug,
      content: dtoInstance.content,
      expiary: moment().add(dtoInstance.expireIn.value, dtoInstance.expireIn.unit).toDate(),
      status: models.RecordStatusEnum.avaiable,
    };

    return this.repository.create(record);
  }

  async find(dto: GetRecordDto) {
    const dtoInstance = <dtos.IGetRecordDto>plainToInstance(GetRecordDto, dto);

    const errors = validateSync(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });

    if (errors.length) {
      throw new InvalidRequest(errors.map((error) => error.toString()).join());
    }

    const foundRecord = await this.repository.findById(dtoInstance.id);

    if (!foundRecord) {
      throw new NotFoundError(`Record for ID: ${dtoInstance.id} not found`);
    }

    if (foundRecord.expiary.getTime() <= new Date().getTime()) {
      throw new NotFoundError(`Record for ID: ${dtoInstance.id} not found`);
    }

    if (foundRecord.status !== models.RecordStatusEnum.avaiable) {
      throw new NotFoundError(`Record for ID: ${dtoInstance.id} not found`);
    }

    await this.repository.delete(dtoInstance.id);

    return foundRecord;
  }
}

let recordService: RecordService;

export function getRecordService() {
  if (!recordService) {
    const repository = Strategy.selectRepository(Configs.DB_URL).getRecordRepository();

    recordService = new RecordService(repository);
  }

  return recordService;
}
