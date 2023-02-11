import { BaseError } from './base';

/**
 * Invalid request error with 400 status code
 */
export class InvalidRequest extends BaseError {
  constructor(message: string) {
    super(message, 400, 'InvalidRequest');
  }
}
