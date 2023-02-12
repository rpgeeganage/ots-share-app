import bodyParser from 'body-parser';
import cors from 'cors';
import { Application } from 'express';

import { Configs } from './configs';
import { getApiController } from './controller/api_controller';
import { connectDb } from './init';
import { defaultErrorHandler, defaultRouter } from './middleware/defaults';
import { getLogger } from './middleware/logger';

const payloadLimit = '50mb';
const apiUrlPath = '/api';

export async function addApi(app: Application): Promise<Application> {
  await connectDb(Configs);

  app.use(apiUrlPath, cors());
  app.use(apiUrlPath, bodyParser.json({ limit: payloadLimit }));
  app.use(apiUrlPath, bodyParser.urlencoded({ extended: true, limit: payloadLimit }));
  app.use(apiUrlPath, getLogger());
  app.use(apiUrlPath, getApiController().getRouter());
  app.use(apiUrlPath, defaultRouter);
  app.use(apiUrlPath, defaultErrorHandler);

  return app;
}
