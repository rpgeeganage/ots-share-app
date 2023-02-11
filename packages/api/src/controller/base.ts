import { Router } from 'express';

/**
 * Base Contoller to support common pattern for Contollers
 */
export interface IBaseControler {
  getRouter: () => Router;
}
