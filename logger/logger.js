const { createLogger, format, transports } = require('winston');
const { combine, printf } = format;
const moment = require('moment');

const myFormat = printf(({ level, message, timestamp }) => {
  return `${moment(timestamp).format(
    'YYYY-MM-DD HH:mm:ss'
  )} | LEVEL ${level} | Msg: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: {
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  transports: [
    new transports.Console(),
    new transports.File({ filename: './logs/combined.log' }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: './logs/exceptions.log' }),
  ],
});

module.exports = logger;
