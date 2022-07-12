import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class WinstonMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const loggerService = new LoggerService(req.url.slice(1).split('/')[0]);
      const tempUrl = req.method + ' ' + req.url.split('?')[0];
      const _url = JSON.stringify(tempUrl ? tempUrl : {});
      // const _headers = JSON.stringify(req.headers ? req.headers : {});
      // const _query = JSON.stringify(req.query ? req.query : {});
      // const _body = JSON.stringify(req.body ? req.body : {});
      const { statusCode, statusMessage } = res;

      const logMessage = `${_url} ${statusCode} ${statusMessage}`.replace(
        /\\/,
        '',
      );

      if (statusCode >= 500) {
        return loggerService.error(logMessage);
      }

      if (statusCode >= 400) {
        return loggerService.warn(logMessage);
      }
      return loggerService.log(logMessage);
    });
    next();
  }
}
