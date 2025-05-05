import { createLogger, format, transports } from 'winston';
import fluent from 'fluent-logger';

const { combine, timestamp, json } = format;

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log' })
  ],
});

// Transporte Fluentd
const FluentTransport = (fluent as any).support.winstonTransport();
logger.add(new FluentTransport({
  host: 'localhost',
  port: 24224,
  requireAckResponse: true,
  tag: 'app.logs'
}));

export default logger;