import { BaseError, ErrorType } from '.';

/**
 * Throw this when item is not found
 */
export class NotFoundError extends BaseError {
  public metadata: Record<string, any>[] = [];
  /**
   *
   * @param metadata for adding the list of invalid parameters
   */
  constructor(metadata?: Record<string, any>[]) {
    super('Item Not Found', ErrorType.NOT_FOUND);
    if (metadata) {
      this.metadata = metadata;
    }
  }
}
