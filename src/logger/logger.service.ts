import { LoggerService as LS } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;

export class LoggerService implements LS {
  private logger: winston.Logger;

  constructor(service) {
    this.logger = winston.createLogger({
      format: combine(
        errors({ stack: true }),
        json(),
        timestamp({ format: 'isoDateTime' }),
        ms(),
        prettyPrint(),
      ),
      defaultMeta: { service },
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: combine(
            nestWinstonModuleUtilities.format.nestLike('Winston'),
          ),
        }),
      ],
    });

    console.log = (message: any, params?: any) => {
      this.logger.debug(message, params);
    };
  }

  public log(message: string) {
    this.logger.info(message);
  }
  public error(message: string) {
    this.logger.error(message);
  }
  public warn(message: string) {
    this.logger.warn(message);
  }
  public debug(message: string) {
    this.logger.debug(message);
  }
  public verbose(message: string) {
    this.logger.verbose(message);
  }
}
