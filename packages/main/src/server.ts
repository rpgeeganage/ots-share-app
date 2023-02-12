import 'source-map-support/register';

import * as http from 'http';

import { api } from '@ots-share/api';
import { purge } from '@ots-share/purge';
import { ui } from '@ots-share/ui';
import express, { Application } from 'express';

import { Configs } from './configs';
import { getLogger } from './logger';

const HTTP_PORT = 80;

const logger = getLogger();
const uiApp = ui.addUi(express());

// Trigger every one minute if no value is provided
logger.info(`Purger interval: ${Configs.PURGE_TRIGGER_INTERVAL}ms`);

setInterval(() => {
  purge.run().catch(logger.error);
}, Configs.PURGE_TRIGGER_INTERVAL);

api.addApi(uiApp).then((app: Application) => {
  http.createServer(app).listen(HTTP_PORT, () => {
    logger.info(`Server started at port: ${HTTP_PORT}`);
  });
});
