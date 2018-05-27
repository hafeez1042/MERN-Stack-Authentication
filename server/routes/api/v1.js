const express = require('express');
const verifyJWTmiddleware = require('../../middleware/verifyJWTmiddleware');
const homeController = require('../../controllers/api/v1/homeController');
const authController = require('../../controllers/api/v1/authController');
const userController = require('../../controllers/api/v1/userController');

const router = express.Router();

router.get('/', homeController.index);
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/users', verifyJWTmiddleware, userController.index);

module.exports = router;
