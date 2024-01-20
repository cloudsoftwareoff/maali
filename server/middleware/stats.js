// serverStatsMiddleware
const os = require('os');

let requestCount = 0;

const serverStatsMiddleware = (req, res, next) => {
  // Increment the request count on each incoming request
  requestCount++;

  req.serverStats = {
    startTime: new Date(),
    uptime: process.uptime(),
    hostname: os.hostname(),
    cpus: os.cpus(),
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
    },
    requestCount: requestCount,
  };
  next();
};

module.exports = serverStatsMiddleware;
