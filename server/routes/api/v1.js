const express = require('express');
const homeController = require('../../controllers/api/v1/homeController');
const authController = require('../../controllers/api/v1/authController');

const router = express.Router();

router.get('/', homeController.index);
router.post('/register', authController.register);

module.exports = router;
