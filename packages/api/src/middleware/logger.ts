import { logger as WinnstonLogger } from 'express-winston';
import * as winston from 'winston';

export function getLogger() {
  return WinnstonLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json()),
  });
}
