const express = require('express');
const homeController = require('../controllers/web/homeController');

const router = express.Router();

router.get('/*', homeController.index);

module.exports = router;
