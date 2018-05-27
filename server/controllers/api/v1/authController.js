const userModel = require('../../../models/user');
const errorCodes = require('../../../const/errorCodes');

export const register = (req, res) => {
  userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(({ name, email }) => {
    res.json({ name, email });
  }).catch(error => {
    if (error.code === errorCodes.mongo.DUPLICATE) {
      res.status(errorCodes.http.CONFLICT).json({ message: 'User already exist!...' });
    } else {
      res.status(errorCodes.http.BAD_REQUEST).json(error);
    }
  });
};
