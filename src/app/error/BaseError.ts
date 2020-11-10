import { ErrorType } from '.';

/**
 * BaseError is the domain object for errors in this app
 */
export class BaseError extends Error {
  public type: ErrorType;
  constructor(message: string, type: ErrorType) {
    super(message);
    this.type = type;
  }
}
