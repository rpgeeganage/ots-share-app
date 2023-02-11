import { Router } from 'express';

import { IBaseControler } from './base';
import { getrecordController } from './record';

/**
 * This controller handles entire /api endpoint.
 * Collection of all the routes
 */
export class ApiController implements IBaseControler {
  constructor(private readonly router: Router, controllers: Record<string, IBaseControler>) {
    Object.keys(controllers).forEach((url: string) => {
      const controller = <IBaseControler>controllers[url];

      this.router.use(url, controller.getRouter().bind(this));
    });
  }

  getRouter() {
    return this.router;
  }
}

/**
 * We create a singleton controller
 */
let apiController: ApiController;

export function getApiController(): IBaseControler {
  if (!apiController) {
    const router = Router();

    apiController = new ApiController(router, {
      '/record': getrecordController(),
    });
  }

  return apiController;
}
