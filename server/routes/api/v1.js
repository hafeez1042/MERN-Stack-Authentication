const express = require('express');
const verifyJWTmiddleware = require('../../middleware/verifyJWTmiddleware');
const homeController = require('../../controllers/api/v1/homeController');
const authController = require('../../controllers/api/v1/authController');

const router = express.Router();

router.get('/', homeController.index);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verifyauth', authController.verifyAuth);

router.get('/private', verifyJWTmiddleware, (req, res) => {
  res.json({ message: 'This is a private route, only authorized person can access this route', authUser: req.user});
});

module.exports = router;
