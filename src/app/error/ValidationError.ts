import { ErrorType, BaseError } from '.';
import { ErrorObject as AJVErrorOject } from 'ajv';

/**
 * ValidationError, metadata follows the shape of the error thrown from the AJV lib
 */
export class ValidationError extends BaseError {
  public metadata: AJVErrorOject[];
  constructor(metadata: AJVErrorOject[]) {
    super('Validation Error', ErrorType.VALIDATION_FAILED);
    this.metadata = metadata;
  }
}
