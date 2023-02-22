import { models } from '@ots-share/model';

/**
 * Base error.
 * This is used through out the service.
 */
export class BaseError extends Error implements models.IError {
  constructor(message: string, readonly status: number, override readonly name: string) {
    super(message);
  }
}
