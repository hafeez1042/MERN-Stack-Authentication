const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    set: (v) => bcrypt.hashSync(v, 12),
    select: false,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);

const create = ({ fname, lname, username, email, password, country, gender }) => {
  const user = new User({ fname, lname, username, email, password, country, gender });
  return user.save();
};

const findByEmail = (email, select) => {
  return User.findOne({ email }).select(select);
};

const findByUsername = (username, select) => {
  return User.findOne({ username }).select(select);
};

module.exports = {
  create,
  findByEmail,
  findByUsername,
};
