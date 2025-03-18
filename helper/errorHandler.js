const logger = require('../logger/index');

function errorHandler(err, req, res, next) {
  logger.error(err);
  res.status(err.status || 500);
  //res.json({ success: false, message: err.message, data: null });
  res.json({ success: false, message: "server error", data: null });
}

module.exports = errorHandler;
