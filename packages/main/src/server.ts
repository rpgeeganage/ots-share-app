import 'source-map-support/register';

import * as http from 'http';

import { api } from '@ots-share/api';
import { purge } from '@ots-share/purge';
import { ui } from '@ots-share/ui';
import express, { Application } from 'express';

const uiApp = ui.addUi(express());

const HTTP_PORT = 80;

// Trigger every one minute
setInterval(() => {
  purge.run().catch(console.error);
}, 600_00);

api.addApi(uiApp).then((app: Application) => {
  http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`Server started at port: ${HTTP_PORT}`);
  });
});
