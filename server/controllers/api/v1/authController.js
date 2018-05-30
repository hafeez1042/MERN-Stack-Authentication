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
  }).then(({  fname, lname, username, email, country, gender }) => {
    res.json({ fname, lname, username, email, country, gender });
  }).catch(error => {
    if (error.code === errorCodes.mongo.DUPLICATE) {
      res.status(errorCodes.http.CONFLICT).json({ message: messages.error.USER_ALREADY_EXISTS });
    } else {
      res.status(errorCodes.http.BAD_REQUEST).json(error);
    }
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  userModel.findByEmail(username, 'password username fname lname email country gender').then(user => {
    bcrypt.compare(password, user.password).then(() => {
      const { password, ...userWithoutPassword } = user;
      jwt.generateJWT(userWithoutPassword)
        .then(response => {
          res.json({ user: userWithoutPassword, accessToken: response });
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
