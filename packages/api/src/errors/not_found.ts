import { BaseError } from './base';

/**
 * Resource not found error with 404 status code
 */
export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404, 'NotFoundError');
  }
}
