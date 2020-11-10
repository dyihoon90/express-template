import { BaseError, ErrorType } from '.';

/**
 * Throw this when item is not found
 */
export class GenericError extends BaseError {
  public metadata: Record<string, any>[] = [];
  /**
   *
   * @param metadata for adding the list of invalid parameters
   */
  constructor(message?: string, metadata?: Record<string, any>[]) {
    super(message ? message : 'Generic Error', ErrorType.GENERIC_ERROR);
    if (metadata) {
      this.metadata = metadata;
    }
  }
}
