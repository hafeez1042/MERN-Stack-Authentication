const errorCodes = require('../const/errorCodes');
const messages = require('../const/messages');
const jwtHelpers = require('../helpers/jwt');

module.exports = (req, res, next) => {
  if (req.header('Authorization')) {
    const jwt = req.header('Authorization').split(' ')[1];
    jwtHelpers.verifyJWT(jwt)
      .then(response => {
        req.user = response;
        next();
      }).catch(error => {
        res.status(errorCodes.http.UNAUTHORIZED).json({ message: messages.error.INVALID_ACCESS_TOKEN, error });
      });
  } else {
    res.status(errorCodes.http.UNAUTHORIZED).json({ message: messages.error.UNAUTHORIZED });
  }
};
