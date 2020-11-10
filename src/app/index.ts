import express from 'express';
import { setup } from 'applicationinsights';
// @ts-ignore
import serverHealth from 'server-health';
import { ErrorStatusCodes, ErrorType } from './error';
import { IResponse } from './domainModel/request.domain';

import {
  enhanceReqWithTransactionAndTime,
  IExpressRequest,
  responseErrorLoggerFactory,
  responseSuccessLoggerFactory
} from '@dyihoon90/glogging';
import { logger } from './logger';
import Router from './api.routes';
require('dotenv').config();

class App {
  private httpServer: express.Express;

  constructor() {
    const successLogger = responseSuccessLoggerFactory(logger, 'DWP', 'HRP');
    const errorLogger = responseErrorLoggerFactory(logger, 'DWP', 'HRP');
    setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY || 'emptykey').start();
    this.httpServer = express();
    this.httpServer.use(enhanceReqWithTransactionAndTime);
    this.httpServer.use(successLogger);

    serverHealth.exposeHealthEndpoint(this.httpServer);

    (() => new Router(this.httpServer))();
    this.httpServer.use(errorHandler);
    this.httpServer.use(errorLogger);
  }

  public Start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.httpServer
        .listen(port, () => {
          resolve(port);
        })
        .on('error', reject);
    });
  };
}

function errorHandler(
  err: express.ErrorRequestHandler,
  req: IExpressRequest,
  res: IResponse,
  next: express.NextFunction
) {
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    res.statusCode = ErrorStatusCodes.AUTHENTICATION_FAILED;
    res.json({
      status: ErrorType.AUTHENTICATION_FAILED,
      message: 'Session Expired. \n Please sign in again.'
    });
  }
  next(err);
}

export default App;
