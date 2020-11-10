import { AxiosError } from 'axios';
import express, { NextFunction } from 'express';
import { IDwpAuthedRequest } from '../app/domainModel/request.domain';
import { BaseError, ErrorType, ErrorStatusCodes } from '../app/error';
import { mapDomainErrorToClientError } from './errorHandler';

type ExpressFunction = (req: express.Request, res: express.Response, next: NextFunction) => Promise<void>;
/**
 * This function catches rejected promises from route handlers and passes the error to the 'next' function in express
 * This way, future middleware, such as error logging middlewares, can handle these errors correctly
 * This same functionality will be available only in Express 5 :-(
 * decoratedFunction will be called with: (req: IDwpAuthedRequest, token: string, ...argsForDecoratedFunction)
 * See {@link https://expressjs.com/en/guide/error-handling.html}
 * @param decoratedFunction function to be called with (req,token,...argsForDecoratedFunction)
 * @param argsForDecoratedFunction rest of arguments after req and token
 */
export const responseDecorator = <U extends any[], V>(
  decoratedFunction: (req: IDwpAuthedRequest, token: string, ...args: U) => Promise<V>,
  ...argsForDecoratedFunction: U
): ExpressFunction => {
  return async (req: express.Request, res: express.Response, next: NextFunction): Promise<void> => {
    try {
      const token = (req.headers.dwp_auth_token as string) || '';
      const data = await decoratedFunction(req as IDwpAuthedRequest, token, ...argsForDecoratedFunction);
      success(res, { data });
    } catch (err) {
      processErrorCaught(res, err);
      next(err);
    }
  };
};

/**
 * Mutates the passed in response object to add status 200 and json body
 * @param res response to mutate
 * @param body json body to add to response
 */
export function success(res: express.Response, body?: Record<string, unknown>): void {
  res.status(200);
  res.json({
    status: 'OK',
    ...body
  });
}

/**
 * Mutates the passed in response object to add error HTTP status code
 * @param res response to mutate
 * @param body json body to add to response
 */
export function processErrorCaught(res: express.Response, err: AxiosError | BaseError): void {
  const errorResponseBody = mapDomainErrorToClientError(err);
  switch (errorResponseBody.status) {
    case ErrorType.GENERIC_ERROR:
      res.status(ErrorStatusCodes.GENERIC_ERROR);
      break;
    case ErrorType.NOT_FOUND:
      res.status(ErrorStatusCodes.NOT_FOUND);
      break;
    case ErrorType.VALIDATION_FAILED:
      res.status(ErrorStatusCodes.VALIDATION_FAILED);
      break;
    case ErrorType.REQUEST_FAILED:
      res.status(ErrorStatusCodes.REQUEST_FAILED);
      break;
    case ErrorType.AUTHENTICATION_FAILED:
      res.status(ErrorStatusCodes.AUTHENTICATION_FAILED);
      break;
    case ErrorType.IMAGE_UPLOAD_FAILED:
      res.status(ErrorStatusCodes.IMAGE_UPLOAD_FAILED);
      break;
    case ErrorType.ACTION_NOT_AUTHORIZED:
      res.status(ErrorStatusCodes.ACTION_NOT_AUTHORIZED);
      break;
    case ErrorType.REQUEST_TIMEDOUT:
      res.status(ErrorStatusCodes.REQUEST_TIMEDOUT);
      break;
    case ErrorType.UNKNOWN_ERROR:
    default:
      res.status(ErrorStatusCodes.UNKNOWN_ERROR);
      break;
  }
  res.json(errorResponseBody);
  return;
}
