import { models } from '@ots-share/model';
import { Request, Response, NextFunction } from 'express';

import { NotFoundError } from '../errors/not_found';

/**
 * Default router handler.
 * This will handle any request which does not match router patterns
 */
export function defaultRouter(_req: Request, res: Response, next: NextFunction) {
  if (!res.headersSent) {
    next(new NotFoundError('missing or invalid route'));
  } else {
    next();
  }
}

/**
 * Default error handler
 */
export function defaultErrorHandler(
  error: Error & models.IError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(error.status ?? 500).json({
    message: error.message,
  });

  next();
}
