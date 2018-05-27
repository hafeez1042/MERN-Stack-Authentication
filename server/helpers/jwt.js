const jsonWebToken = require('jsonwebtoken');
const config = require('../config');

const generateJWT = ({ email, name, _id }, maxAge, cb) => {
  jsonWebToken.sign({ email, name, _id }, config.JWT_SECRET, { expiresIn: maxAge || '14 days'}, cb);
};

module.exports = {
  generateJWT,
};
