import { GLogger, LoggingMode } from '@dyihoon90/glogging';

let loggingMode: LoggingMode;

switch (process.env.NODE_ENV) {
  case 'local':
    loggingMode = LoggingMode.LOCAL;
    break;
  case 'development':
    loggingMode = LoggingMode.DEV;
    break;
  case 'production':
  default:
    loggingMode = LoggingMode.PRODUCTION;
}

export const logger = new GLogger({ loggingMode });
