const jsonWebToken = require('jsonwebtoken');
const config = require('../config');

const generateJWT = ({ email, name, _id }, maxAge, cb) => {
  jsonWebToken.sign({ email, name, _id }, config.JWT_SECRET, { expiresIn: maxAge || '14 days'}, cb);
};

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jsonWebToken.verify(token, config.JWT_SECRET, (err, res) => {
      if (err || !res) {
        reject(err);
      }
      resolve(res);
    });
  });
};

module.exports = {
  generateJWT,
  verifyJWT,
};
