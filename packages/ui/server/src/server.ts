import { existsSync } from 'fs';
import { join } from 'path';

import express, { Application, Request, Response } from 'express';

const uiRoutes = ['/text', '/file', '/r'];

export function addUi(app: Application): Application {
  const uiPath = join(__dirname, '..', 'app');
  const indexFilePath = `${uiPath}/index.html`;

  if (!existsSync(uiPath)) {
    throw new Error('App build does not exists');
  }

  if (!existsSync(indexFilePath)) {
    throw new Error('Index file doesn not exists');
  }

  // eslint-disable-next-line import/no-named-as-default-member
  app.use(express.static(uiPath));

  uiRoutes.forEach((uiRoute: string) => {
    app.use(uiRoute, (_: Request, res: Response) => {
      res.sendFile(indexFilePath);
    });
  });

  return app;
}
