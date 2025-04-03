const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
/** init rate limiter */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // time window, 1 minute
  max: 100, // Limit each IP to max 100 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (request, response, next, options) =>
    response.status(options.statusCode).json({
      success: false,
      message: 'Too many requests.',
    }),
});

require('dotenv').config();

// routers
const indexRouter = require('../routes/index');
const errorHandler = require('../helper/errorHandler');

const app = express();
app.use(cors());
app.use(limiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, '404 not found'));
});
app.use(errorHandler);

module.exports = app;
