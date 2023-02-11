import express, { Application } from 'express';

import { addApi } from './app';

const devPort = parseInt(<string>process.env.DEV_PORT, 10);

addApi(express()).then((app: Application) => {
  app.listen(devPort, () => {
    console.log(`Server started at port: ${devPort}`);
  });
});
