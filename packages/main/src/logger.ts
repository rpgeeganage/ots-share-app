import * as winston from 'winston';

let logger: winston.Logger;

export function getLogger() {
  if (!logger) {
    logger = winston.createLogger({
      defaultMeta: { service: 'ots-share:main' },
      transports: [new winston.transports.Console()],
      format: winston.format.combine(winston.format.json()),
    });
  }

  return logger;
}
