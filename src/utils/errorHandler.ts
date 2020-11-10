import { AxiosError } from 'axios';
import { ErrorType, BaseError, NotFoundError, ValidationError } from '../app/error';

interface IClientErrorObject {
  status: ErrorType;
  message: string;
  metadata?: Record<string, any>[];
}

/**
 * Map errors caught in DWP to client error
 * @param res response to mutate
 * @param body json body to add to response
 */
export function mapDomainErrorToClientError(err: AxiosError | BaseError): IClientErrorObject {
  if (err instanceof BaseError) {
    return convertDWPBaseErrorToHttpErrorResponse(err);
  } else if (err.response && 'status' in err.response) {
    if (err.response?.statusText === 'Invalid-JWT-Validate' || err.response?.data.status === 'AUTHENTICATION_FAILED') {
      return authenticationFailedError();
    }
    if (err.response?.status === 408) {
      return requestTimedOut();
    }
    if (err.response?.status >= 400 && err.response?.status < 500) {
      return requestFailed('error');
    } else {
      return internalServerError();
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    return internalServerError();
  }
}

function convertDWPBaseErrorToHttpErrorResponse(err: BaseError): IClientErrorObject {
  if (err instanceof NotFoundError) {
    return {
      status: err.type,
      message: err.message,
      metadata: err.metadata
    };
  }
  if (err instanceof ValidationError) {
    return {
      status: err.type,
      message: err.message,
      metadata: err.metadata
    };
  } else {
    return {
      status: ErrorType.UNKNOWN_ERROR,
      message: 'Unknown error occurred'
    };
  }
}

/**
 *
 * THROW BACK NCS ERRORS
 */
const requestFailed = (message: string): IClientErrorObject => {
  return {
    status: ErrorType.REQUEST_FAILED,
    message
  };
};

const requestTimedOut = (): IClientErrorObject => {
  return {
    status: ErrorType.REQUEST_TIMEDOUT,
    message: 'Request has timed out. Please retry.'
  };
};

function internalServerError(): IClientErrorObject {
  return {
    status: ErrorType.UNKNOWN_ERROR,
    message: 'Err... Error 500 \nSomething went wrong on our end. Sorry about this!'
  };
}

function authenticationFailedError(): IClientErrorObject {
  return {
    status: ErrorType.AUTHENTICATION_FAILED,
    message: 'Session Expired. \n Please sign in again.'
  };
}
