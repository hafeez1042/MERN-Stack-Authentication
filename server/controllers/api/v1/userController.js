const index = (req, res) => {
  res.json({users: [1, 2, 3], authUser: req.user});
};

module.exports = {
  index,
};
