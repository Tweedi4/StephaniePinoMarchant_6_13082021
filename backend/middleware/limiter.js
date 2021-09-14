const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 4,
  message: "Trop de tentatives de connexion. Veuillez réessayer dans 5 minutes"
});

module.exports = {limiter}