const  rateLimit = require('express-rate-limit')
const rateLimiter = rateLimit({
  windowMs:  60 * 1000, // 1 min
  max: 20,
  message: 'You have exceeded the 20 requests/min limit!', 
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = {rateLimiter}