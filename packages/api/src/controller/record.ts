import { dtos } from '@ots-share/model';
import { Router, Request, Response, NextFunction } from 'express';

import { RecordService, getRecordService } from '../services/record';

import { IBaseControler } from './base';

export class RecordController implements IBaseControler {
  constructor(private readonly router: Router, private readonly recordService: RecordService) {
    this.router.post('/', this.post.bind(this));
    this.router.get('/:id', this.get.bind(this));
  }

  getRouter() {
    return this.router;
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const record = await this.recordService.find(<dtos.IGetRecordDto>{
        id: req.params.id,
      });
      res.status(200).json(record);
      next();
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const record = await this.recordService.create(req.body ?? {});
      res.status(201).json(record);
      next();
    } catch (error) {
      next(error);
    }
  }
}

/**
 * We create a singleton controller
 */
let recordController: RecordController;

export function getRecordController(): IBaseControler {
  if (!recordController) {
    const router = Router();
    const scheduleService = getRecordService();

    recordController = new RecordController(router, scheduleService);
  }

  return recordController;
}
