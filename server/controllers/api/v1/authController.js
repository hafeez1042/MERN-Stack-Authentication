const userModel = require('../../../models/users');

export const register = (req, res) => {
  userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(user => {
    const { name, email } = user;
    res.json({ name, email });
  }).catch(error => {
    res.json(error);
  });
};
