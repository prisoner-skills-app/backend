const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: 'Please provide valid credentials.' });
      } else {
        req.id = decodedToken.sub;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'Please provide credentials.'});
  }
};