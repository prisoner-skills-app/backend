const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log("request in middleware:", req.url);

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      let urlId = parseInt(req.url.split("/")[1]);
      // console.log(urlId);
      // console.log(decodedToken.sub);
      if (error || isNotAuthorized(decodedToken.sub, urlId)) {
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

// make sure ID contained in JWT is the same as the Center that is being requested
let isNotAuthorized = (jwtId, urlId) => jwtId !== urlId;