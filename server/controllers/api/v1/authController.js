const bcrypt = require('bcrypt');
const userModel = require('../../../models/user');
const errorCodes = require('../../../const/errorCodes');
const messages = require('../../../const/messages');
const jwt = require('../../../helpers/jwt');

const register = (req, res) => {
  userModel.create({
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    country: req.body.country,
    gender: req.body.gender,
  }).then(({ fname, lname, username, email, country, gender }) => {
    const user = { fname, lname, username, email, country, gender };
    jwt.generateJWT(user)
      .then(response => {
        res.json({ user, accessToken: response });
      }).catch(error => {
        res.status(errorCodes.http.BAD_REQUEST).json({ message: messages.error.UNKNOWN_ERROR, error });
      });
  }).catch(error => {
    if (error.code === errorCodes.mongo.DUPLICATE) {
      res.status(errorCodes.http.CONFLICT).json({ message: messages.error.USER_ALREADY_EXISTS });
    } else {
      res.status(errorCodes.http.BAD_REQUEST).json(error);
    }
  });
};

const login = (req, res) => {
  const { username } = req.body;
  const reqPassword = req.body.password;
  userModel.findByUsername(username, 'password username fname lname email country gender')
    .then(({ fname, lname, email, country, gender, password }) => {
      bcrypt.compare(reqPassword, password).then(() => {
        const simpleUser =  { fname, lname, username, email, country, gender }
        jwt.generateJWT(simpleUser)
          .then(response => {
            res.json({ user: simpleUser, accessToken: response });
          }).catch(error => {
            res.status(errorCodes.http.BAD_REQUEST).json({ message: messages.error.UNKNOWN_ERROR, error });
          });
      }).catch(() => {
        res.status(errorCodes.http.UNAUTHORIZED).json({ message: messages.error.INVALID_PASSWORD });
      });
    }).catch(() => {
      res.status(errorCodes.http.UNAUTHORIZED).json({ message: messages.error.INVALID_EMAIL });
    });
};

module.exports = {
  register,
  login,
};
