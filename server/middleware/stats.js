const os = require('os');

let requestCount = 0;
let visitCount = 0;
let lastResetDate = new Date().toLocaleDateString(); // Initialize with the current date

const resetDailyStats = () => {
  const currentDate = new Date().toLocaleDateString();
  if (currentDate !== lastResetDate) {
    // Reset the counters at the start of a new day
    requestCount = 0;
    visitCount = 0;
    lastResetDate = currentDate;
  }
};

const serverStatsMiddleware = (req, res, next) => {
  resetDailyStats(); // Reset daily stats

  // Increment the request count and visit count on each incoming request
  requestCount++;
  if (req.method === 'GET') {
    visitCount++;
  }

  req.serverStats = {
    startTime: new Date(),
    uptime: process.uptime(),
    hostname: os.hostname(),
    cpus: os.cpus(),
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
    },
    daily: {
      requests: requestCount,
      visits: visitCount,
    },
  };
  next();
};

module.exports = serverStatsMiddleware;